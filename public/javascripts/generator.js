var codeText = document.querySelector('#site-code').innerText,
    regexp = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g,
    result = codeText.match(regexp),
    resultString = result.join(''),
    links = resultString.match(/href="([^"]*")/g),
    cleanLinks = [],
    address = document.querySelector("#site-address").innerText,
    internalLinks = [],
    externalLinks = [],
    externalLinksDOM = document.querySelector('#external-links'),
    internalLinksDOM = document.querySelector('#internal-links'),
    generatorForm = document.querySelector('#generator-form');


//FUNCTIONS
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function addhttp(url) {
    if (!/^(f|ht)tps?:\/\/www\./i.test(url)) {
        return false;
    }
    return true;
}


//ACTIONS
links.forEach(function (element) {
    cleanLinks.push(element.slice(6, -1));
});

cleanLinks.forEach(function (element) {
    if (extractHostname(address) === extractHostname(element) ||
        element.indexOf("/") === 0 ||
        element.indexOf("#") === 0 ||
        element.indexOf(".") === 0) {
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

generatorForm.addEventListener("submit", function (e) {
   var address = generatorForm.querySelector('#address').value;

   if(!addhttp(address)){
       e.preventDefault();
       alert("Must start from http://www.");
   }
});