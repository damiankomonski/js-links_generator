var generatorForm = document.querySelector('#generator-form');

//FUNCTIONS
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