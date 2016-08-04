function handleResize(event) {
    var widget = document.querySelector('#sidebar .panel-body');
    if (widget) {
        var widgetWidth = widget.clientWidth;
        document.getElementById('netease-player').setAttribute('style', 'width: ' + widgetWidth + 'px');
    }
};

function createPlayer() {
    var musicPlayer = document.getElementsByClassName('ttw-music-player')[0];
    if (!musicPlayer) {
        var playlist = [
            {
                mp3: '/audio/1.mp3',
                title: 'Different Colors',
                artist: 'Walk The Moon',
                duration: '3:42'
            },
            {
                mp3: '/audio/2.mp3',
                title: 'Cake By The Ocean',
                artist: 'DNCE',
                duration: '3:38'
            },
            {
                mp3: '/audio/3.mp3',
                title: 'Can\'t Stop The Feeling',
                artist: 'Justin Timberlake',
                duration: '3:56'
            },
            {
                mp3: '/audio/4.mp3',
                title: 'Blame It On The Girls',
                artist: 'Mika',
                duration: '3:18'
            }
        ];
        $('#music-player-container').ttwMusicPlayer(playlist, {
            autoPlay: false,
            description: '',
            jPlayer: {
                swfPath: '/music-player/jquery-jplayer'
            }
        });
    }
};

function makeLinksOpenInNewTab() {
    var elems = document.getElementsByTagName('a');
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].href.length > 0 && elems[i].href.indexOf(document.domain) < 0) {
            elems[i].target = '_blank';
        }
    }
}

// Don't remove this function!
var handleReady = function () {
    createPlayer();
};

// Don't remove this function!
var handleLoadedAll = function () {
    makeLinksOpenInNewTab();

    // handleResize();
    // window.addEventListener('resize', handleResize);
};

// Don't remove this function!
var handleBeforeDestroy = function () {
    // window.removeEventListener('resize', handleResize);
};
