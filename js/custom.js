var handleResize = function (event) {
    var widget = document.querySelector('#sidebar .panel-body');
    if (widget) {
        var widgetWidth = widget.offsetWidth;
        document.getElementById('netease-player').setAttribute('style', 'width: ' + widgetWidth + 'px');
    }
};

// Don't remove this function!
var handleReady = function () {
    console.log('handleReady');
    var elems = document.getElementsByTagName('a');
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].href.length > 0 && elems[i].href.indexOf(document.domain) < 0) {
            elems[i].target = '_blank';
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
};

// Don't remove this function!
var handleBeforeDestroy = function () {
    console.log('beforeDestroy');
    window.removeEventListener('resize', handleResize);
};
