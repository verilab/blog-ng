function apiUrl(path) {
    if (path[0] != '/') {
        path = '/' + path;
    }
    // return window.location.protocol + '//' + base + '/apiUrl' + concat;
    return '/api' + path;
}

function getJSON(url, callback) {
    $.ajax({
        headers: {
            'Accept': 'application/json'
        },
        type: 'GET',
        url: url,
        dataType: 'json',
        success: callback
    });
}
