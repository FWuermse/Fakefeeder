document.getElementById('button').onclick = function changeContent() {
    sendRequest();
}

var cookies = "";


["DV", "NID", "SAPISID", "SID", "SSID", "AID", "ANID", "APISID", "CGIC", "CONSENT", "HSID", "OTZ", "PAIDCONTENT", "SEARCH_SAMESITE", "SIDCC", "SNID", "SSID", "TAID"].forEach(cookie => {
    browser.cookies.get({url: "https://www.google.com", name: cookie}).then(value => {
        cookies = cookies.concat(`${value.name}=${value.value}; `);
    });
})


function sendRequest() {
    var response;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            document.getElementById("reaction").innerHTML = "Success: " + getQuery() + this.responseText;
        }
    });
    xhr.open("GET", "https://www.google.com/search?q=" + getQuery());
    xhr.onerror = function () {
        document.getElementById("reaction").innerHTML = "Error";
    };
    xhr.setRequestHeader('Cookie', cookies);
    xhr.send();
}