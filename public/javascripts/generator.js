var codeText = document.querySelector('#site-code').innerText,
    regexp = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g,
    result = codeText.match(regexp),
    address = document.querySelector("#site-address").innerText.slice(11),
    internalLinks = [],
    externalLinks = [],
    externalLinksDOM = document.querySelector('#external-links'),
    internalLinksDOM = document.querySelector('#internal-links'),
    generatorForm = document.querySelector('#generator-form'),
    codeTextDOM = document.getElementById('site-code-dom'),
    linksDOMArray;

function sendLinkToDB(link) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log('Zapisano w bazie!');
    }
  };
  xhttp.open("POST", "/insert-link", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("link=" + link);
}

result.forEach(function(element){
    codeTextDOM.innerHTML += element;
});

linksDOMArray = codeTextDOM.querySelectorAll('a');

linksDOMArray.forEach(function (element) {
    sendLinkToDB(element.href);

    if (element.hostname.indexOf(address) !== -1) {
        internalLinks.push(element);
    } else {
        externalLinks.push(element);
    }
});

//add internal links to DOM
internalLinks.forEach(function (element) {
    var li = document.createElement("li");
    li.innerHTML = element;
    internalLinksDOM.appendChild(li);
});

//add external links to DOM
externalLinks.forEach(function (element) {
    var li = document.createElement("li");
    li.innerHTML = element;
    externalLinksDOM.appendChild(li);
});


//Checking Form
function addhttp(url) {
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
        return true;
    }
    return false;
}

generatorForm.addEventListener("submit", function (e) {
    var address = generatorForm.querySelector('#address').value;

    if(!addhttp(address)){
        e.preventDefault();
        alert("Must start from http://");
    }
});
