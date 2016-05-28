function tryIt() {
    var editor = document.getElementById('editor');
    var viewer = document.getElementById('viewer');
    var iframeDocument = viewer.contentDocument || viewer.contentWindow.document;
    iframeDocument.writeln(editor.value);
    iframeDocument.close();
}

tryIt();

function onFunItemAddClick() {
    
    
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
            if(json.status === 0) {
                closeFunItemAddModal();
            } else if(json.status === 1) {
                 document.getElementById('error-msg').innerHTML = json.error;
            }
        }
    }

    xmlhttp.open('POST', '/apis/funlist', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var name = document.getElementById('funItemInModal').value;
    var folder = document.getElementById('funFolderInModal').value;
    xmlhttp.send('name=' + name + '&folder=' + folder);
    
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
            document.getElementById('editor').value = json.funContent;
            tryIt();
        }
    }


    var name = document.getElementById('funName').value;
    var folder = document.getElementById('funFolder').value;
    var content = document.getElementById('editor').value;

    xmlhttp.open('PUT', '/apis/' + folder + '/' + name, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xmlhttp.send('content=' + content);
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
            document.getElementById('editor').value = 'empty';
            document.getElementById('funName').value = '';
            document.getElementById('funFolder').value = '';
            tryIt();
        }
    }

    xmlhttp.open('DELETE', '/apis/' + funFolder + '/' + funName, true);
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
            document.getElementById('editor').value = json.funContent;
            document.getElementById('funName').value = json.funName;
            document.getElementById('funFolder').value = json.funFolder;
            tryIt();
        }
    }

    xmlhttp.open('GET', '/apis/' + ele.value, true);
    xmlhttp.send();
}


function openFunItemAddModal() {
    document.getElementById('fun-item-modal').style.visibility = 'visible';
}

function closeFunItemAddModal() {
    document.getElementById('fun-item-modal').style.visibility = 'hidden';
    document.getElementById('error-msg').innerHTML = '';
    document.getElementById('funItemInModal').value = '';
    document.getElementById('funFolderInModal').value = '';
}