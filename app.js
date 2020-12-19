const formElement = document.getElementById('form');
formElement.addEventListener('submit', memorizeMarkers);

function memorizeMarkers(x) {
  let websiteName = document.getElementById('website-name').value;
  let websiteURL = document.getElementById('website-url').value;
  let errorMessage = document.getElementById('error-message');
  x.preventDefault();
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
    let sitemarker = [];
    sitemarker.push(markers);
    const myJSON = JSON.stringify(sitemarker);
    localStorage.setItem('storage', myJSON);
  } else {
    let get = JSON.parse(localStorage.getItem('storage'));
    get.push(markers);
    let myJSON = JSON.stringify(get);
    localStorage.setItem('storage', myJSON);
  }
  displayMarkerList();
  document.getElementById('form').reset();
  // document.getElementById('error-message').reset();
}

function displayMarkerList() {
  let get = JSON.parse(localStorage.getItem('storage'));
  let resultOfTheList = document.getElementById('websites-list');
  resultOfTheList.innerHTML = '';
  for (let i = 0; i < get.length; i++) {
    resultOfTheList.innerHTML +=
      '<div class="d-block mb-2">' +
      get[i].SiteName +
      '<a class="btn btn-primary ml-4 p-1" href="' +
      get[i].SiteURL +
      '" target="_blank">Go</a>' +
      '<button onclick="deleteTheMarker(\'' +
      get[i].SiteName +
      '\')" target="_blank" class="btn btn-danger ml-2 p-1">Delete</button>' +
      '</div>';
  }
}
// displayMarkerList();

function deleteTheMarker(element) {
  let get = JSON.parse(localStorage.getItem('storage'));
  for (let i = 0; i < get.length; i++) {
    if (get[i].SiteName === element) {
      get.splice(i, 1);
    }
  }
  let myJSON = JSON.stringify(get);
  localStorage.setItem('storage', myJSON);
  displayMarkerList();
}
