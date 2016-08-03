Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.headers.common['Accept'] = 'application/json';

const App = Vue.extend({
    data: function () {
        return {
            site: {
                title: 'Project RC',
                subtitle: '#include <stdrc.h>'
            }
        }
    },
    created: function () {
        document.title = this.title;
    }
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
    }
});
