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

function onFunItemAddClick() {
    openFunItemAddModal()
    /*
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

    xmlhttp.open('POST', '/apis/add', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var name = document.getElementById('funName').value;
    var folder = document.getElementById('funFolder').value;
    var content = document.getElementById("editor").value;
    xmlhttp.send('name=' + name + '&folder=' + folder + '&content=' + content);
    */
}

function onFunItemUpdateClick() {

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
    var name = document.getElementById('funName').value;
    var folder = document.getElementById('funFolder').value;
    var content = document.getElementById("editor").value;
    xmlhttp.send('name=' + name + '&folder=' + folder + '&content=' + content);
}

function onFunItemRemoveClick() {
    var funName = document.getElementById('funName').value;
    var funFolder = document.getElementById('funFolder').value;

    var xmlhttp;
    if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = ActiveObject('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //do some thing here
            document.getElementById("editor").value = 'empty';
            document.getElementById('funName').value = '';
            document.getElementById('funFolder').value = '';
            tryIt();
        }
    }

    xmlhttp.open('GET', '/apis/remove' + '?funFolder=' + funFolder + '&funName=' + funName, true);
    xmlhttp.send();
}


function onFunItemClick(ele) {

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
            document.getElementById('funName').value = json.funName;
            document.getElementById('funFolder').value = json.funFolder;
            tryIt();
        }
    }

    xmlhttp.open('GET', '/apis/' + ele.value, true);
    xmlhttp.send();
}


function openFunItemAddModal() {
    document.getElementById("fun-item-modal").style.visibility = 'visible';
}

function closeFunItemAddModal() {
    document.getElementById("fun-item-modal").style.visibility = 'hidden';
}