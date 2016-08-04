Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.headers.common['Accept'] = 'application/json';

const App = Vue.extend({
    data: function () {
        return {
            site: {
                title: 'Project RC',
                subtitle: '#include <stdrc.h>',
                author: 'Richard Chien'
            }
        }
    }
});

App.component('sidebar-content', {
    template: '<div class="panel panel-primary">\n  <div class="panel-body">\n    <h4>\n      Richard Chien<br>\n      <small>richardchien</small>\n    </h4>\n    <p>GitHub: <a href="http://github.com/richardchien">richardchien</a></p>\n    <p>Telegram: <a href="https://telegram.me/richardchien">@richardchien</a></p>\n    <p>这里是我的博客，欢迎你的来访，我会在这里写一些技术笔记和感想。</p>\n    <p>除非特别说明，文章均默认采用\n      <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">CC BY-SA 4.0 协议</a>。\n    </p>\n  </div>\n</div>\n<div class="panel panel-primary">\n  <div class="panel-body">\n    <h4>\n      友情链接<br>\n      <small>friend links</small>\n    </h4>\n    <ul>\n      <li><a href="http://tong-kuo.tumblr.com/">Tong Kuo</a></li>\n      <li><a href="https://www.puteulanus.com/">创世神域</a></li>\n      <li><a href="https://blog.ntzyz.io/">namespace ntzyz;</a></li>\n      <li><a href="http://www.orangejoy.moe/">404 BeenFound</a></li>\n    </ul>\n  </div>\n</div>\n<!--<div class="panel panel-primary hidden-sm hidden-xs">-->\n  <!--<div class="panel-body">-->\n    <!--<h4>-->\n      <!--歌单<br>-->\n      <!--<small>song list</small>-->\n    <!--</h4>-->\n    <!--<p>喜欢？来收藏吧：<a href="http://music.163.com/#/m/playlist?id=87165194">欢快年轻积极向上的英文歌</a></p>-->\n    <!--<div class="text-center" style="width: 100%; margin: 0px -15px -15px">-->\n      <!--<iframe id="netease-player" frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=450-->\n              <!--src="http://music.163.com/outchain/player?type=0&id=436548777&auto=0&height=430"></iframe>-->\n    <!--</div>-->\n  <!--</div>-->\n<!--</div>-->'
});

const BaseComponent = Vue.extend({
    data: function () {
        return {
            ok: false,
            page: null
        }
    },
    computed: {
        site: {
            get: function () {
                return this.$router.app.site;
            },
            set: function (site) {
                this.$router.app.site = site;
            }
        }
    },
    route: {
        data: function (transition) {
            return this.$http.get('/api' + transition.to.path)
                .then(function (response) {
                    const json = response.json();
                    this.ok = json.ok;
                    if (json.ok) {
                        this.site = json.site;
                        this.page = json.page;
                    }
                    document.title = this.documentTitle();
                });
        }
    },
    methods: {
        formatDate: function (date) {
            const d = new Date(date);
            return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDay();
        },
        documentTitle: function () {
            return this.site.title;
        }
    },
    ready: function () {
        // var s = document.createElement("script");
        // s.type = "text/javascript";
        // s.src = "/js/custom.js";
        // s.async = true;
        // document.getElementsByTagName('body')[0].appendChild(s);
        // console.log(document.getElementsByClassName('col-md-8')[0].innerHTML);
        // console.log(document.querySelector('.col-md-8'));
        // handleReady();
        this.$watch('$loadingRouteData', function (newVal, oldVal) {
            if (oldVal === true && newVal === false) {
                handleReady();
            }
        })
    },
    beforeDestroy: function () {
        handleBeforeDestroy();
    }
});
