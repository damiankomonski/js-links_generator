var codeText = document.querySelector('#site-code').innerText,
    regexp = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g,
    result = codeText.match(regexp),
    address = document.querySelector("#site-address").innerText,
    internalLinks = [],
    externalLinks = [],
    externalLinksDOM = document.querySelector('#external-links'),
    internalLinksDOM = document.querySelector('#internal-links'),
    generatorForm = document.querySelector('#generator-form'),
    codeTextDOM = document.getElementById('site-code-dom'),
    linksDOMArray,
    inputAddressDOM = document.createElement('a');

inputAddressDOM.href = address;

result.forEach(function(element){
    codeTextDOM.innerHTML += element;
});

linksDOMArray = codeTextDOM.querySelectorAll('a');

linksDOMArray.forEach(function (element) {
    if (element.hostname === inputAddressDOM.hostname) {
        internalLinks.push(element);
    } else {
        externalLinks.push(element);
    }
});

//add internal links to DOM
internalLinks.forEach(function (element) {
    var li = document.createElement("li");
    li.innerHTML = element;
    console.log(element);
    console.log(li);
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
        return false;
    }
    return true;
}

generatorForm.addEventListener("submit", function (e) {
    var address = generatorForm.querySelector('#address').value;

    if(!addhttp(address)){
        e.preventDefault();
        alert("Must start from http://");
    }
});