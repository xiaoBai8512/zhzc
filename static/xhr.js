function pulldata(url, params) {
    var p = formatParams(params || {});
    var client = new XMLHttpRequest();
    client.open('GET', url+'?'+p);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
// client.setRequestHeader('Content-type', 'multipart/form-data');
// client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// client.send(p) if method is POST
    client.send(null);
}


function handler() {
    if(this.readyState!==4){
        return
    }
    if(this.status===200){
        console.log(this.response)
    }else{
        console.log(this.statusText)
    }
}

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}
