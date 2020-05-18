let everyone = [];
window.onload = async (event) => {
  const peeps = await fetch('https://ex-rdc-server.herokuapp.com/profiles')
    .then(resp => resp.json())
    .then(d => d);
  let allPeeps = shuffle(peeps.map(x => x.fields));
  everyone = allPeeps;

  const locationList = ['All Locations', ...new Set(allPeeps.map(x => x['Current City']))];
  const deptList = ['All Roles', ...new Set(allPeeps.map(x => x['Department']))];

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('role');
  if (myParam) { 
    if (deptList.includes(capitalize(myParam))) {
      filter['Department'] = capitalize(myParam)
    } else {
      window.history.replaceState(null, null, '/');
    }
    const people = filtering(allPeeps);
    displayPeeps(people);
  } else {
    displayPeeps(allPeeps);
  }

  const locationDropdown = document.querySelector('#location');

  locationDropdown.innerHTML = `<select id="locationDropdown" onchange='selectLocation()'>` +
    locationList.map(x => {
        return `<option value='${x}'>${x}</option>`
      }).join('') + 
  '</select>';

  const roleDropdown = document.querySelector('#role');
  roleDropdown.innerHTML = `<select id="roleDropdown" onchange='selectRole()'>` +
    deptList.map(x => {
        return `<option value='${x}' ${x === filter.Department ? 'selected' : ''}>${x}</option>` // '${x === filter.Department}'
      }).join('') +  
  '</select>';
};

const filter = {};

const selectLocation = (e) => {
  const val = document.getElementById('locationDropdown').value;
  val === 'All Locations' ? delete filter['Current City'] : filter['Current City'] = val;
  const people = filtering(everyone);
  displayPeeps(people);
};

const selectRole = () => {
  const val = document.getElementById('roleDropdown').value;
  val === 'All Roles' ? delete filter['Department'] : filter['Department'] = val;
  window.history.replaceState(null, null, `/?role=${val}`);
  const people = filtering(everyone);
  displayPeeps(people);
};

const trimUrl = url => {
  const newUrl = url.split('//').pop();
  const haswww = newUrl.indexOf("www.") > -1;
  const trimwww = newUrl.split('www.').pop();
  const str = haswww ? trimwww : newUrl;
  return str[str.length - 1] === '/' ? str.substr(0, str.length - 1) : str;
}

const toggleRelocate = () => { 
  filter['Open to Relocate'] === true ? delete filter['Open to Relocate'] : filter['Open to Relocate'] = true;
  const people = filtering(everyone);
  displayPeeps(people);
}

const filtering = (peeps) => {
  peeps = peeps.filter(peep => {
    for (let key in filter) {
      if (peep[key] != filter[key]) {
        return false
      }
    }
    return true;
  });
  return peeps;
}

const displayPeeps = (peeps) => {
  if (window.innerWidth <= 440) {
    window.scrollTo(0, 0);
  }
  const app = document.querySelector('#app');
  if (peeps.length > 0) {
    app.innerHTML = peeps.map((p) => {
      // Formatting column title
      const name = p['Name'];
      const title = p['Former Title'];
      const department = p['Department'];
      const description = p['A Tweet Length Blurb About You'] || [];
      const superpower = p['Your Top 3 Professional Super Power'] || null;
      const photo = p['Your Profile Photo'] && p['Your Profile Photo'][0]['thumbnails'].large || [];
      const linkedIn = p['LinkedIn Profile'] || null;
      const website = p['Your Website URL'] || null;
      const github = p['Github URL'] || null;
      const dribbble = p['Dribbble URL'] || null;
      const twitter = p['Twitter URL'] || null;
      const city = p['Current City'] || null;
      const remote = p['Open to Remote'] || false;
      const relocate = p['Open to Relocate'] || false;

      const avatar = photo && photo.url || 'images/avatar.png';
      const displayDepartment = department ? `${department}` : '';
      const displaySuperpower = superpower ? `<strong>Superpower</strong>: ${superpower}` : '';
      const displayLinkedIn = linkedIn ? `<li><a href=${linkedIn} target="_blank"><img src="images/linkedin-in.svg" alt="Linkedin" />Linkedin</a></li>` : '';
      const displayWebsite = website ? `<li><a href=${website} target="_blank"><img src="images/globe.svg" alt="Website" />${trimUrl(website)}</a></li>` : '';
      const displayGithub = github ? `<li><a href=${github} target="_blank"><img src="images/github.svg" alt="Github" />Github</a></li>` : '';
      const displayTwitter = twitter ? `<li><a href=${twitter} target="_blank"><img src="images/twitter.svg" alt="Twitter" />Twitter</a></li>` : '';
      const displayDribbble = dribbble ? `<li><a href=${dribbble} target="_blank"><img src="images/dribble.svg" alt="Dribble" />Dribbble</a></li>` : '';
      const displayCity = city ? `${city}` : '';
      const displayRemote = remote ? `<span class="relocate">Open to Remote</span>` : '';
      const displayRelocate = relocate ? `<span class="relocate">Can relocate</span>` : '';
      const displayLocationOptions = displayRelocate || displayRemote;

      return (
        '<article class="card">' +
          '<div class="card-header">' +
            '<div class="card-title">' +
              '<h3 class="name">' + `${name}` + '</h3>' +
              '<p class="title">' + `${title}` + '</p>' +
              '<div class="city">' + `<span>${displayCity}</span>` + `${displayLocationOptions}` + '</div>' +
            '</div>' +
            `<figure><img src=${avatar} alt="${name}" loading="lazy" /></figure>` +
          '</div>' + 
          '<div class="card-body">' +
            '<p class="superpower">' + `${displaySuperpower}` + '</p>'+
            '<p class="desc">' + `${description}` + '</p>' +
          '</div>' +
          '<div class="card-footer">' +
            '<ul class="links">' +
              `${displayLinkedIn}` +
              `${displayWebsite}` + 
              `${displayGithub}` + 
              `${displayTwitter}` + 
            '</ul>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  } else {
    app.innerHTML = `<h3> Yay, no one was laid off for this selection</h3>`;
  }
}

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}