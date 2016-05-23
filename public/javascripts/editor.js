function tryIt() {
    var editor = document.getElementById("editor");
    if (editor.value == "") {
        alert("Please input some content");
        return false;
    }
    var viewer = document.getElementById("viewer");
    var iframeDocument = viewer.contentDocument || viewer.contentWindow.document;
    iframeDocument.writeln(editor.value);
    iframeDocument.close();
}

tryIt();

function updateIt() {

    var xmlhttp;
    if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = ActiveObject('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //do some thing here
            var json = JSON.parse(xmlhttp.responseText);
            document.getElementById("editor").value = json.funContent;
            tryIt();
        }
    }

    xmlhttp.open('POST', '/editor/update', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var name = document.getElementsByTagName('title')[0].innerText;
    var content = document.getElementById("editor").value;
    xmlhttp.send('name=' + name + '&content=' + content);
}