window.onload = async (event) => {
  let data = await fetch('https://api.airtable.com/v0/appxC7V0yEcK1fZ7i/Profiles?api_key=keyanhJEYpK5VlhXz')
    .then(resp => resp.json())
    .then(d => d);

  // const departmentList = await fetch('https://api.airtable.com/v0/appxC7V0yEcK1fZ7i/Profiles?api_key=keyanhJEYpK5VlhXz&fields%5B%5D=Department')
  //   .then(resp => resp.json())
  //   .then(d => d.records.map(x => x.fields).map(x => x.Department));

  // const deptDropdown = [...new Set(departmentList)]; 
  // console.log([deptDropdown])

  const peeps = data.records;
  const peepData = peeps.map(x => x.fields);
  
  const app = document.querySelector('#app');
  // const dropdown = document.querySelector('#dropdown');

  // dropdown.innerHTML = '<select id="color-select" name="color">' + deptDropdown.map(x => {
  //   return `<option value=${x}>${x}</option>`;
  // }).join('') + '</select>';

  // const linkedInLogo  = '<span class="visuallyhidden">Linked In</span>';
  // const websiteLogo   = '<span class="visuallyhidden">Website/Folio</span>';
  // const githubLogo    = '<span class="visuallyhidden">Github</span>';
  // const twitterLogo   = '<span class="visuallyhidden">Twitter</span>'
  // const dribbbleLogo  = '<span class="visuallyhidden">Instagram</span>';

  const linkedInLogo  = '';
  const websiteLogo   = '';
  const githubLogo    = '';
  const twitterLogo   = '';
  const dribbbleLogo  = '';

  app.innerHTML = peepData.map((p) => {
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
    const displaySuperpower = superpower ? `Superpower: ${superpower}` : '';
    const displayLinkedIn = linkedIn ? `${linkedInLogo}` + `<li class="linkedin"><a href=${linkedIn} _blank>Linkedin</a></li>` : '';
    const displayWebsite = website ? `${websiteLogo}` + `<li class="website"><a href=${website} _blank>${website}</a></li>` : '';
    const displayGithub = github ? `${githubLogo}` + `<li class="github"><a href=${github} _blank>Github</a></li>` : '';
    const displayTwitter = twitter ? `${twitterLogo}` + `<li class="twitter"><a href=${twitter} _blank>Twitter</a></li>` : '';
    const displayDribbble = dribbble ? `${dribbbleLogo}` + `<li class="dribbble"><a href=${dribbble} _blank>Dribbble</a></li>` : '';
    const displayCity = city ? `${city}` : '';
    const displayRemote = remote ? `Open to Remote ` : '';
    const displayRelocate = relocate ? `<li class="relocate">Willing to relocate</li>` : '';

    return '<article class="card">' +
      `<figure><img src=${avatar} alt="${name}" loading="lazy" /></figure>` +
      '<aside>' +
          '<strong>' + `${name}` + '</strong>' +
          '<em>' + `${title}` + '</em><br/>' +
          '<p class="city">' + `${displayCity}` + '</p>' +
          '<p class="desc">' + `${description}` + '</p>' +
          '<p class="superpower">' + `${displaySuperpower}` + '</p>'+
          '<ul class="links clearfix">' +
            `${displayLinkedIn}` +
            `${displayWebsite}` + 
            `${displayGithub}` + 
            `${displayTwitter}` + 
            //`${displayDribbble}` + 
            //`${displayRemote}` +
            `${displayRelocate}` +
          '</ul>' +
        '</aside>' +
      '</article>';
  }).join('');
};