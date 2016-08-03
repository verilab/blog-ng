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
            widgetWidth: 330,
        }
    },
    computed: {},
    methods: {
        init: function () {
            this.updateWidgetWIdth();
        },
        updateWidgetWIdth: function () {
            this.widgetWidth = document.querySelector('#sidebar .panel-body').offsetWidth;
        },
        handleWindowResize: function (event) {
            console.log(event);
            this.updateWidgetWIdth();
        }
    },
    ready: function () {
        window.addEventListener('resize', this.handleWindowResize)
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleWindowResize)
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
