# BlogNG

[![License](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](LICENSE)

基于 [Vue.js](http://vuejs.org/) 和 [Bootstrap](http://getbootstrap.com/) 的 [BlogA](https://github.com/richardchien/blog-a) 前端，Demo：[http://blog.richardchien.cn](http://blog.richardchien.cn)。

## 如何使用

首先需要将 BlogA 配置成 mixed 模式或 api 模式（见 [API 模式](https://github.com/richardchien/blog-a#api-模式)），并在 Nginx、Apache 等服务器里将 `/api/` 反代到 BlogA 的地址（具体配置可以看 [`sample-conf`](sample-conf) 里的示例）。

然后在 `index.html` 里修改侧边栏和 Footer。在 `main.js` 里修改 `App` 里的默认 `site` 属性，注意这个属性是默认填充的，实际获取到 API 的数据后，会使用获取到的信息。

修改 `favicons` 文件夹里的内容，建议使用 [RealFaviconGenerator](https://realfavicongenerator.net/) 在线生成。

全部修改好之后，直接放到 Web 服务器作为静态文件就好了。

如果需要修改现有模板，可以在 `template.js` 里自定义那几个组件的 `template` 属性（建议用 WebStorm，可以很方便地编辑字符串里面的 HTML）。
