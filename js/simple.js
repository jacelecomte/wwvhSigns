// JavaScript source code
var today = new Date();
var date;

function getDate() { 
    date = today.getDate() + '/' + + (today.getMonth() + 1) + '/' + today.getFullYear();
}

function writeDate() {
    document.getElementById("date").innerHTML = "Signed on " + date;
}

var hours = today.getHours();
var minutes = today.getMinutes();
var meridiem = "AM";

function getTime() {
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours >= 12) {
        meridiem = "PM";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }
}

function writeTime() {
    document.getElementById("whattime").innerHTML = "Signed at " + hours + ":" + minutes + " " + meridiem;
}

function writeHospInfo() {
    document.getElementById("HospInfo").innerHTML = "29157 Schoenherr Road <br> Warren, Michigan 48088 <br> Phone: (586) 751 - 3350 Fax: (586) 751 3447 <br>general@wwvhcares.com <br> AAHA Accredited"
    }
    
var fname = '';
var lname = '';
var pname = '';
    
// prompts chosen instead of forms for simplicity. Users that may not be very familiar w/ technology can easily read whats in the form and fill it in. 
function getInfo() {
    fname = prompt("What is your first name?", '');
    lname = prompt("What is your last name?", '');
    pname = prompt("What is your pets name?", '');
    if (fname === '' || fname.length == '0') {
        return alert("Please provide your first name.");
    }
    if (lname === '' || lname.length == '0') {
        return alert("Please provide your last name.");
    }
    if (pname === '' || pname.length == '0') {
        return alert("Please provide your pets name.");
    }
}

function resetInfo() {
    fname = '';
    lname = '';
    pname = '';
}

function writeCritSigInfo() {
    document.getElementById("CritSigInfo").innerHTML = "<p> My signature below confirms my consent for the specified services for my pet. I recognize that this signature holds the same value as a paper copy, and follows the rules and regulations noted in \"Electronic Signatures in Global and National Commerce Act\". </p>"
}

function writeInfo() {
    getDate();
    writeDate();
    getTime();
    writeTime();
    document.getElementById("userinfo").innerHTML = "<p> My name is " + fname + ' ' + lname + " and my pets name is " + pname + ". By signing this form I agree to have these specified services performed on my pet. </p>";
}

function onPageView() {
    writeHospInfo();
    writeCritSigInfo();
    resetInfo();
}

function onFinSig() {
    getInfo();
    writeInfo();
    injectScript('./src/html2canvas.js');
    injectHtml2canvas();
    finalizeScreenshot();
    redirectThanks();
}

function finalizeScreenshot() {
    html2canvas(document.body).then(function (canvas) {
        document.body.appendChild(canvas);
        saveScreenshot(canvas);
    });
}

function injectScript(uri) {
    const document = window.document;
    const script = document.createElement("script");
    script.setAttribute("src", uri);
    //document.body.appendChild(script);
}

function injectHtml2canvas() {
    injectScript("//html2canvas.hertzen.com/dist/html2canvas.js");
}

function saveScreenshot(canvas) {
    const fileName = "image";
    const link = document.createElement("a");
    link.download = fileName + ".png";
    console.log(canvas);
    canvas.toBlob(function (blob) {
        console.log(blob);
        link.href = URL.createObjectURL(blob);
        link.click();
    });
}

function redirectThanks() {
    setTimeout(function () {
        window.location.href = './thanks.html';
    }, 3000)
}

function redirectHome() {
    setTimeout(function () {
        window.location.href = './index.html';
    }, 10000)
}

// screenshot and show on page (for testing)
function screenshot() {
    html2canvas(document.body).then(function (canvas) {
        document.body.appendChild(canvas);
    });
} 

// given from SigPad documentation (slightly modified)
function createSigPad() {
    var canvas = document.getElementById('signature-pad');
    function resizeCanvas() { //given from signature pad documentation
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        backgroundColor: "rgb(230,230,230)";
    }

    window.onresize = resizeCanvas;
    resizeCanvas();

    var signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(230, 230, 230)'
    });

    document.getElementById('save-png').addEventListener('click', function () {
        if (signaturePad.isEmpty()) {
            return alert("Please provide a signature first.");
        }
        var data = signaturePad.toDataURL('image/png');
        var img = document.createElement('img');
        img.src = data;
        //document.body.appendChild(img);
    });

    document.getElementById('clear').addEventListener('click', function () {
        signaturePad.clear();
    });
}


