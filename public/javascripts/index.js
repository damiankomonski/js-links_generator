var generatorForm = document.querySelector('#generator-form');

//FUNCTIONS
function addhttp(url) {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    return true;
  }
  return false;
}

function parseData(data) {
  return JSON.parse(data);
}

function checkInDB(link) {

  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = parseData(this.responseText);
        resolve(response.length > 0);
      }
    };
    xhttp.open("GET", "/check-visitedLink?link=http://www." + link, true);
    xhttp.send();
  });
}

generatorForm.addEventListener("submit", function(e) {
  e.preventDefault();
  var address = generatorForm.querySelector('#address').value;

  checkInDB(address).then(response => {
    if (response === false) {
      document.getElementById("generator-form").submit();
    } else {
      alert('Adres został już odwiedzony.')
    }
  });;
});
