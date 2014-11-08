# Jishen

A theme for [Ghost](http://github.com/tryghost/ghost/), made by [Jishen 龚振华](http://allmyverse.com/about-me.php).

See Jishen in action at: [Blog - 姫神](http://blog.allmyverse.com)

###Tutorials of writing your own theme for Ghost

* http://themes.ghost.org/v0.5.3/docs/about _(Make sure you go through **DOCUMENTATION** part)_
* http://docs.ghost.org/zh/themes/ _(Just in case you feel more comfortable with document in Chinese)_

# Features
Jishen is still in progress.

## Must for next release

* Global
  * ~~_[Done]_~~ Make a header menu with 2 items
    * Subscribe, MyWebsite
  * ~~_[Done]_~~ Add more info into the cover of home page
    * Make it a partial and you can customize as you like
  * ~~_[Done]_~~ Set a proper font style for Chinese
    * "Microsoft YaHei", "微软雅黑", STXihei, "华文细黑"
  * ~~_[Done]_~~ Add Google analytic
    * Still need to remove Ghost-built-in ga.js
* Post
  * Add a comment plugin
    * Lazy loaded, or click to load
  * Add weibo into share list
  * ~~_[Done]_~~ Set a better style for code block
    * Use [Prismjs](http://prismjs.com/) with Okaidia theme.
    * Language Support: CSS/C/JavaScript/Java/PHP/Bash/Python/Git
  * Add an overlay of navigation outline for post content

## Try for next release
* Global
  * Performance improvement for images
    * Use WebP
    * Lazy load
  * Add search function
    * Option1: Build an independent search service
    * Option2: Search directly based on internal RSS output without index
  * Archive by date
    * Probably need code injection into core of Ghost
* Post
  * ~~_[Half Way Done]_~~ Show Related posts
    * Options: [jquery.ghostrelated](https://github.com/danecando/jquery.ghostrelated)

## Copyright & License

Copyright (c) 2013-2014 Ghost Foundation - Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
