Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.headers.common['Accept'] = 'application/json';

var App = Vue.extend({
    created: function () {
        this.init();
    },
    data: function () {
        return {
            title: 'Title',
            widgetWidth: document.querySelector('#sidebar .panel-body').offsetWidth
        }
    },
    computed: {
        // siteTitle: function () {
        //     document.title = this.title;
        //     return this.title;
        // },
        // widgetWidth: function () {
        //     var firstWidget = document.querySelector('#sidebar .panel-body');
        //     return firstWidget.offsetWidth;
        // }
    },
    methods: {
        init: function () {
            // console.log(window.location);
            // getJSON(apiUrl(window.location.pathname), function (json) {
            //     console.log(json);
            // });
        },
        // post: function (event) {
        //     var url = apiUrl(event.target.getAttribute('href'));
        //     console.log(url);
        //     getJSON(url, function (json) {
        //         console.log(json);
        //         this.title = json.site.title;
        //     });
        // }
        handleResize: function () {
            this.widgetWidth = document.querySelector('#sidebar .panel-body').offsetWidth;
        }
    },
    ready: function () {
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleResize)
    }
});

var router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

var Index = Vue.extend({
    template: (
        '<div v-if="$loadingRouteData">Loading ...</div>' +
        '<div v-else="!$loadingRouteData">' +
        '<p>This is {{$route.path}}. There are {{count}} links.</p>' +
        '</div>'
    ),
    data() {
        return {
            count: 0
        }
    },
    route: {
        data(transition) {
            return this.$http.get('/api' + transition.to.path)
                .then(function (response) {
                    const json = response.json();
                    console.log(json);
                    this.count = json.page.entries.length;
                    router.app.title = json.site.title;
                });
        }
    }
});

router.map({
    '/': {
        component: Index
    },
    '/page/:page_id': {
        component: Index
    },
    '/*custom_page': {
        component: {
            template: '<p>This is custom page {{$route.params.custom_page}}</p>'
        }
    }
});

router.start(App, '#app');
