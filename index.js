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

  const linkedInLogo = '<dt><span class="visuallyhidden">Linked In</span><svg xmlns="http://www.w3.org/2000/svg" width="27" height="25"><path fill="#111"d="M1 8.3h5.5v16.3H1V8.3zM3.8 6C1.8 6 .6 4.8.6 3.2.7 1.6 1.9.4 3.8.4c1.9 0 3 1.2 3 2.8 0 1.6-1.1 2.9-3 2.9zm22.6 18.5h-5.5v-8.7c0-2.2-.8-3.7-2.8-3.7a3 3 0 0 0-2.8 2c-.2.3-.2.8-.2 1.3v9H9.6V8.4H15v2.3c.7-1.1 2-2.7 5-2.7 3.6 0 6.3 2.3 6.3 7.3v9.4z"></path></svg></dt>';
  const websiteLogo = '<dt><span class="visuallyhidden">Website/Folio</span></dt>';
  const githubLogo = '<dt><span class="visuallyhidden">Github</span></dt>';
  const twitterLogo = '<dt><span class="visuallyhidden">Twitter</span><svg xmlns="http://www.w3.org/2000/svg" width="31" height="25"><path fill="#111"d="M27.1 6.3A17.6 17.6 0 0 1 9.7 24.6c-3.5 0-6.8-1-9.5-2.8l1.5.1c2.9 0 5.5-1 7.6-2.6-2.7 0-5-1.9-5.7-4.3a6 6 0 0 0 2.8-.1c-2.8-.6-5-3-5-6v-.1c.9.4 1.8.7 2.8.8a6.1 6.1 0 0 1-1.9-8.3C5.3 5.1 10 7.5 15 7.8a6.2 6.2 0 0 1 6-7.6c1.8 0 3.4.8 4.5 2 1.4-.3 2.7-.8 3.9-1.5A6.2 6.2 0 0 1 26.7 4a12 12 0 0 0 3.5-1c-.8 1.2-1.9 2.3-3 3.2"></path></svg></dt>'
  const dribbbleLogo = '<dt><span class="visuallyhidden">Dribbble</span><svg xmlns="http://www.w3.org/2000/svg" width="27" height="25"><path d="M0 500c0-90.667 22.334-174.333 67-251 44.667-76.667 105.334-137.333 182-182C325.667 22.333 409.334 0 500 0c90.667 0 174.334 22.333 251 67 76.667 44.667 137.334 105.333 182 182 44.667 76.667 67 160.333 67 251s-22.333 174.333-67 251c-44.666 76.667-105.333 137.333-182 182-76.666 44.667-160.333 67-251 67-90.666 0-174.333-22.333-251-67-76.666-44.667-137.333-105.333-182-182C22.334 674.333 0 590.667 0 500zm83 0c0 104 35 195.667 105 275 32-62.667 82.667-122.333 152-179 69.334-56.667 137-92.333 203-107-10-23.333-19.666-44.333-29-63-114.666 36.667-238.666 55-372 55-26 0-45.333-.333-58-1 0 2.667-.166 6-.5 10-.333 4-.5 7.333-.5 10zm13-103c14.667 1.333 36.334 2 65 2 111.334 0 217-15 317-45-50.666-90-106.333-165-167-225-52.666 26.667-97.833 63.667-135.5 111-37.666 47.333-64.166 99.667-79.5 157zm149 432c75.334 58.667 160.334 88 255 88 49.334 0 98.334-9.333 147-28-13.333-114-39.333-224.333-78-331-61.333 13.333-123.166 47-185.5 101C321.167 713 275 769.667 245 829zM398 97c58.667 60.667 113 136.333 163 227 90.667-38 159-86.333 205-145-77.333-64-166-96-266-96-34 0-68 4.667-102 14zm199 298c10 21.333 21.334 48.333 34 81 49.334-4.667 103-7 161-7 41.334 0 82.334 1 123 3-5.333-90.667-38-171.333-98-242-43.333 64.667-116.666 119.667-220 165zm59 151c34 98.667 57 200 69 304 52.667-34 95.667-77.667 129-131 33.334-53.333 53.334-111 60-173-48.666-3.333-93-5-133-5-36.666 0-78.333 1.667-125 5z"/></svg></path></svg></dt>';

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
    const displayDepartment = department ? `<p>${department}</p>` : '';
    const displaySuperpower = superpower ? '<p>' + `Superpower: ${superpower}` + '</p>' : '';
    const displayLinkedIn = linkedIn ? `${linkedInLogo}` + `<dd><a href=${linkedIn} _blank>Linkedin</a></dd>` : '';
    const displayWebsite = website ? `${websiteLogo}` + `<dd><a href=${website} _blank>Link to folio</a></dd>` : '';
    const displayGithub = github ? `${githubLogo}` + `<dd><a href=${github} _blank>Github</a></dd>` : '';
    const displayTwitter = twitter ? `${twitterLogo}` + `<dd><a href=${twitter} _blank>Twitter</a></dd>` : '';
    const displayDribbble = dribbble ? `${dribbbleLogo}` + `<dd><a href=${dribbble} _blank>Dribbble</a></dd>` : '';
    const displayCity = city ? `<p>${city}</p>\n` : '';
    const displayRemote = remote ? `Open to Remote <br>` : '';
    const displayRelocate = relocate ? `Open to Relocate` : '';

    return '<div class="card third">' +
      '<aside>' +
      `<figure><img src=${avatar} alt="avatar" /></figure>` +
          '<strong>' + `${name}` + '</strong>' +
          '<small>' + `${title}` + '</small>' +
          `${displayCity}` +
          '<p>' + `${description}` + '</p>' +
           `${displaySuperpower}`+
          '<dl>' +
            `${displayLinkedIn}` +
            `${displayWebsite}` + 
            `${displayGithub}` + 
            `${displayTwitter}` + 
            `${displayDribbble}` + 
            `${displayRemote}` +
            `${displayRelocate}` +
          '</dl>' +
        '</aside>' +
      '</div>';
  }).join('');
};