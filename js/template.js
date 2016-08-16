const Index = BaseComponent.extend({
    template: '<template v-if="ok">\n  <div class="panel panel-primary" v-for="entry in page.entries">\n    <div class="panel-heading">\n      <h3 class="panel-title">\n        <template v-for="category in entry.categories">\n          <span v-if="$index > 0"> & </span><a v-link="\'/category/\' + category">{{ category }}</a>\n        </template>\n        <i class="fa fa-fw fa-angle-right"></i>\n      </h3>\n    </div>\n    <div class="panel-body markdown-body">\n      <h1><a v-link="entry.url">{{ entry.title }}</a></h1>\n      <hr>\n      {{{ entry.body }}}\n      <template v-if="entry.read_more">\n        <p>……</p>\n        <p><a v-link="entry.url">继续阅读</a></p>\n      </template>\n    </div>\n    <div class="panel-footer">\n      <span><i class="fa fa-fw fa-user"></i>{{ entry.author }}</span>\n      <span><i class="fa fa-fw fa-calendar"></i>{{ formatDate(entry.date) }}</span>\n      <span v-if="entry.updated"><i class="fa fa-fw fa-refresh"></i>{{ formatDate(entry.updated) }}</span>\n      <span>\n        <i class="fa fa-fw fa-tags"></i><template v-for="tag in entry.tags"><span v-if="$index > 0">, </span><a\n              v-link="\'/tag/\' + tag">{{ tag }}</a></template>  \n      </span>\n    </div>\n  </div>\n  <template v-if="page.has_newer || page.has_older">\n    <ul class="pager">\n      <li class="previous" v-if="page.has_older"><a v-link="page.older_url">← Older</a></li>\n      <li class="next" v-if="page.has_newer"><a v-link="page.newer_url">Newer →</a></li>\n    </ul>\n  </template>\n</template>\n<template v-else><p v-if="$loadingRouteData">努力加载中……</p>\n  <p v-else>什么都没有……</p>\n</template>'
});

const Post = BaseComponent.extend({
    methods: {
        documentTitle: function () {
            return this.page.title + ' - ' + this.site.title;
        }
    },
    template: '<template v-if="ok">\n  <div class="panel panel-primary">\n    <div class="panel-heading">\n      <h3 class="panel-title">\n        <template v-for="category in page.categories">\n          <span v-if="$index > 0"> & </span>\n          <a v-link="\'/category/\' + category">{{ category }}</a>\n        </template>\n        <i class="fa fa-fw fa-angle-right"></i>\n      </h3>\n    </div>\n    <div class="panel-body markdown-body">\n      <article>\n        <h1>{{ page.title }}</h1>\n        <hr>\n        {{{ page.body }}}\n      </article>\n    </div>\n    <div class="panel-footer">\n      <span><i class="fa fa-fw fa-user"></i>{{ page.author }}</span>\n      <span><i class="fa fa-fw fa-calendar"></i>{{ formatDate(page.date) }}</span>\n      <span v-if="page.updated"><i class="fa fa-fw fa-refresh"></i>{{ formatDate(page.updated) }}</span>\n      <span>\n        <i class="fa fa-fw fa-tags"></i><template v-for="tag in page.tags"><span v-if="$index > 0">, </span><a\n              v-link="\'/tag/\' + tag">{{ tag }}</a></template>   \n      </span>\n    </div>\n  </div>\n  <div class="panel panel-primary">\n    <div class="panel-heading">\n      <h3 class="panel-title">\n        Discuss\n        <i class="fa fa-fw fa-angle-right"></i>\n      </h3>\n    </div>\n    <div class="panel-body markdown-body">\n      <div id="disqus_thread">\n        <p id="gfw-fucked-notice">\n          <i class="fa fa-fw fa-exclamation-triangle"></i>\n          如果你一直能看见这段话，小心！你可能是正版防火长城的受害者！\n        </p>\n      </div>\n    </div>\n  </div>\n</template>\n<template v-else>\n  <p v-if="$loadingRouteData">努力加载中……</p>\n  <p v-else>什么都没有……</p>\n</template>'
});

const Archive = BaseComponent.extend({
    data: function () {
        return {
            archiveName: 'Archive'
        }
    },
    methods: {
        documentTitle: function () {
            return this.$route.params.name + ' - ' + this.archiveName + ' - ' + this.site.title;
        }
    },
    template: '<template v-if="ok">\n  <div class="panel panel-primary">\n    <div class="panel-heading">\n      <h3 class="panel-title">Archive<i class="fa fa-fw fa-angle-right"></i></h3>\n    </div>\n    <div class="panel-body">\n      <article>\n        <h1>{{ archiveName }}: {{ $route.params.name }}</h1>\n        <hr>\n        <table class="table table-hover">\n          <tbody>\n          <template v-for="entry in page.entries">\n            <tr>\n              <td class="text-right" style="border-top: none; width: 15%;">{{ formatDate(entry.date) }}</td>\n              <td style="border-top: none"><a v-link="entry.url">{{ entry.title }}</a></td>\n            </tr>\n          </template>\n          </tbody>\n        </table>\n      </article>\n    </div>\n  </div>\n</template>\n<template v-else>\n  <p v-if="$loadingRouteData">努力加载中……</p>\n  <p v-else>什么都没有……</p>\n</template>'
});

const CustomPage = BaseComponent.extend({
    methods: {
        documentTitle: function () {
            return this.page.title + ' - ' + this.site.title;
        },
    },
    template: '<template v-if="ok">\n  <div class="panel panel-primary">\n    <div class="panel-heading">\n      <h3 class="panel-title">\n        <span>Page</span>\n        <i class="fa fa-fw fa-angle-right"></i>\n      </h3>\n    </div>\n    <div class="panel-body markdown-body">\n      <article>\n        <h1>{{ page.title }}</h1>\n        <hr>\n        {{{ page.body }}}\n      </article>\n    </div>\n    <div class="panel-footer">\n      <span><i class="fa fa-fw fa-user"></i>{{ page.author }}</span>\n    </div>\n  </div>\n  <div class="panel panel-primary">\n    <div class="panel-heading">\n      <h3 class="panel-title">\n        Discuss\n        <i class="fa fa-fw fa-angle-right"></i>\n      </h3>\n    </div>\n    <div class="panel-body markdown-body">\n      <div id="disqus_thread">\n        <p id="gfw-fucked-notice">\n          <i class="fa fa-fw fa-exclamation-triangle"></i>\n          如果你一直能看见这段话，小心！你可能是正版防火长城的受害者！\n        </p>\n      </div>\n    </div>\n  </div>\n</template>\n<template v-else>\n  <p v-if="$loadingRouteData">努力加载中……</p>\n  <p v-else>什么都没有……</p>\n</template>'
});

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
