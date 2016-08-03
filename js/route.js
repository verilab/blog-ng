const router = new VueRouter({
    history: true,
    saveScrollPosition: true
});

router.afterEach(function (transition) {
    window.scrollTo(0, 0);
});

router.map({
    '/': {
        component: Index,
    },
    '/page/:id': {
        exact: false,
        component: Index
    },
    '/post/:year/:month/:day/:name': {
        exact: false,
        component: Post
    },
    '/category/:name': {
        exact: false,
        component: Archive.extend({
            data: function () {
                return {
                    archiveName: 'Category'
                }
            }
        })
    },
    '/tag/:name': {
        exact: false,
        component: Archive.extend({
            data: function () {
                return {
                    archiveName: 'Tag'
                }
            }
        })
    },
    '/*custom_page': {
        component: CustomPage
    }
});

router.start(App, 'html');
