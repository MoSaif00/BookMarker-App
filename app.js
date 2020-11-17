const formElement = document.getElementById('form');
formElement.addEventListener('submit', memorizeMarker);

function memorizeMarker() {
  const websiteName = document.getElementById('website-name').value;
  const websiteURL = document.getElementById('website-url').value;
  const errorMessage = document.getElementById('error-message');
  if (!websiteURL && !websiteName) {
    errorMessage.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>OH SORRY</strong> You have not entered the website name and URL. 
  </div>`;
    return false;
  } else if (!websiteName) {
    errorMessage.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>OH SORRY</strong> You have not entered the website name .
  </div>`;
    return false;
  } else if (!websiteURL) {
    errorMessage.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>OH SORRY</strong> You have not entered the website URL.
  </div>`;
    return false;
  } else {
    errorMessage.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Congrats</strong> You have successfully saved the website.
  </div>`;
  }

  let markers = {
    SiteName: websiteName,
    SiteURL: websiteURL,
  };
  if (localStorage.getItem('storage') === null) {
    let arr = [];
    arr.push(markers);
    const myJson = JSON.stringify(arr);
    localStorage.setItem('storage', myJson);
  } else {
    const get = JSON.parse(localStorage.getItem('storage'));
    get.push(markers);
    myJson = JSON.stringify(get);
    localStorage.setItem('storage', myJson);
  }
}

function displayMarkerList() {
  const get = JSON.parse(localStorage.getItem('storage'));
  const resultOfTheList = document.getElementById('websites-list');
  resultOfTheList.innerHTML = '';
  for (let i = 0; i < get.length; i++) {
    resultOfTheList.innerHTML += `
        <li class="d-block mb-2">${get[i].SiteName}<a class="btn btn-primary ml-4 p-1" href="${get[i].SiteURL}" target="_blank">Open </a> <button class="btn btn-danger ml-2 p-1">Delete</button></li>
    `;
  }
}
displayMarkerList();

function deleteTheMarker(element) {
  const get = JSON.parse(localStorage.getItem('storage'));
  for (let i = 0; i < get.length; i++) {
    if (get[i].SiteName === element) {
      get.splice(i, 1);
    }
  }

  myJson = JSON.stringify(get);
}
