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
}

function makeLinksOpenInNewTab() {
    var elems = document.getElementsByTagName('a');
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].href.length > 0 && elems[i].href.indexOf(document.domain) < 0) {
            elems[i].target = '_blank';
        }
    }
}

function fixStyleColor() {
    if (!document.getElementById('fix-style-color')) {
        var a = document.getElementsByTagName('a')[0];
        var color = window.getComputedStyle(a).color;

        var css = '.site-header h1 a:hover, .site-header h1 a:focus, h1, ' +
            '.ttw-music-player .control-btn:hover, ' +
            '.ttw-music-player .tracklist li:hover, ' +
            '.ttw-music-player li.playing, ' +
            '.ttw-music-player .more:hover ' +
            '{ color: ' + color + '; }';
        var style = document.createElement('style');
        style.id = 'fix-style-color';

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(style);
    }
}

function disqusThread() {
    var thread = document.getElementById('disqus_thread');
    if (thread) {
        MutationObserver = window.MutationObserver;
        var documentObserver = new MutationObserver(function () {
            var gfwNotice = document.getElementById('gfw-fucked-notice');
            if (gfwNotice) {
                gfwNotice.remove();
            }
            documentObserver.disconnect();
        });
        documentObserver.observe(thread, {childList: true});

        var site = router.app.site;
        var page = router._children[1].page;

        var disqus_config = function () {
            this.page.url = page.absolute_url;
            this.page.identifier = page.id_key;
        };

        (function () { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');

            s.src = '//' + site.disqus_short_name + '.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());
            thread.parentElement.appendChild(s);
        })();
    }
}

// Don't remove this function!
var handleReady = function () {
    createPlayer();
};

// Don't remove this function!
var handleLoadedAll = function () {
    makeLinksOpenInNewTab();
    fixStyleColor();
    disqusThread();
};

// Don't remove this function!
var handleBeforeDestroy = function () {
};
