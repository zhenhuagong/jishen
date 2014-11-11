'use strict';

var hbs     = require('express-hbs'),
    _       = require('lodash'),
    cheerio = require('cheerio');


var registerHelper = function () {

  //
  // ### Table of Contents helper
  //
  // @param  {Object} options object,
  // start is the starting level and
  // end the max depth of the headline level
  //
  // *Usage example:*
  // `{{toc}}`
  // `{{toc start="1" end="3"}}`
  //
  // Defaults to start="1"
  // Defaults to end="4"
  //
  // **returns** SafeString content html.
  //
  hbs.registerHelper('toc', function(options) {

    options = options || {};
    options.hash = options.hash || {};

    var toc = [];
    var $ = cheerio.load(this.html);
    var startLevel = options.hash.start || 1;
    var maxDepth = options.hash.end || 4;

    var idPrefix = 'toc_';
    var idIncrement = 1;

    var isIdFormat = function(content){
      var english = /^[A-Za-z0-9_]*$/;  // only a-zA-Z0-9_ will be used for the value of id attribute
      if (english.test(content)) {
        return true;
      }else{
        return false;
      }
    };

    /*
    * TODO: Need to find a way to alter DOM element in hbs helpers
    */
    var getHeadlines = function(start, end, current, elem) {
      if(current > end || start > end) { return; }
      if(_.isUndefined(current)) {
        $('h' + start).each(function(i, elem) {
          var headerElem = $(elem);
          if(!isIdFormat(headerElem.text())) { // when id not equal title
            var newId = idIncrement++;
            $(elem).attr('id', idPrefix + newId);
          }
          toc.push('<li><a href="#' + $(elem).attr('id') + '">' + $(elem).text() + '</a></li>');
          getHeadlines(start, end, parseInt(start) + 1, elem);
        });
      } else if($(elem).nextUntil('h' + (parseInt(current) - 1), 'h' + current).length !== 0) {
        toc.push('<ul>');
        $(elem).nextUntil('h' + (parseInt(current) - 1), 'h' + current).each(function(i, elem) {
          toc.push('<li><a href="#' + $(elem).attr('id') + '">' + $(elem).text() + '</a></li>');
          getHeadlines(start, end, parseInt(current) + 1, elem);
        });
        toc.push('</ul>');
      }
    };

    // Ignore the cases where no header with startLevel exists
    while($('h' + startLevel).length === 0){
      startLevel++;
    }
    getHeadlines(startLevel, maxDepth);

    return new hbs.handlebars.SafeString(toc.join(' '));

  });

};

module.exports = registerHelper;