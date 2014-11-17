self = (typeof window !== 'undefined') ? window : false;
var PostToc = (function($){
  if (self) {
    var _ = self.PostToc = {
      MAX_DEPTH: 5,
      ID_PREFIX: 'toc_',
      idIncrement: 1,
      tocResult: [],

      // @param: config
      // {
      //   tocParentId: '#toc',
      //   postClass: '.post-content',
      //   depth: 3
      // }
      init: function(config){
        _.headerDepth = (config.depth < _.MAX_DEPTH && config.depth) || 3;
        var postClass = config.postClass || 'body';
        _.$postContent = $(postClass);
        if (config.tocParentId) {
          _.$tocParent = $(config.tocParentId);
        }else{
          _.$tocParent = null;
        }
      },

      generate: function(config){
        _.init(config);
        if (_.$tocParent) {
          var start = 1;
          // Ignore the cases where no header with startLevel exists
          while(start <= _.headerDepth && $('h' + start, _.$postContent).length === 0){
            start++;
          }
          if (start > _.headerDepth) {
            return;
          }
          _.tocResult.push('<ul>');
          var toc = _.buildToc(start, _.headerDepth);
          _.tocResult.push('</ul>');
          _.$tocParent.html(toc);
        }else{
          // `tocParentId` needs to be specified
          return;
        }
      },

      buildToc: function(start, end, current, elem){
        if (current === end || start === end) {
          return ;
        }
        if (typeof current === 'undefined') {
          var firstHeaders = $('h' + start, _.$postContent).each(function(index, elem){
            if (!_.isIdFormat(elem.innerHTML)) {  // when id not equal title
              elem.setAttribute('id', _.ID_PREFIX + parseInt(_.idIncrement++));
            }
            _.tocResult.push('<li><a href="#' + elem.id + '">' + elem.innerHTML + '</a></li>');
            _.buildToc(start, end, start + 1, elem);
          });
        }else {
          var elemChildHeaders = $(elem).nextUntil('h' + (parseInt(current) - 1), 'h' + current);
          if (elemChildHeaders.length !== 0) {
            _.tocResult.push('<ul>');
            elemChildHeaders.each(function(index, elem){
              if (!_.isIdFormat(elem.innerHTML)) {  // when id not equal title
                elem.setAttribute('id', _.ID_PREFIX + parseInt(_.idIncrement++));
              }
              _.tocResult.push('<li><a href="#' + elem.id + '">' + elem.innerHTML + '</a></li>');
              _.buildToc(start, end, current + 1, elem);
            });
            _.tocResult.push('</ul>');
          }
        }

        return _.tocResult.join(' ');
      },

      /*
      * Check if markdown will generate a id attribute for a header
      * Only a-zA-Z0-9_ will be used for the value of id attribute
      * @param content: innerHTML of header
      */
      isIdFormat: function(content){
        var english = /^[A-Za-z0-9_]*$/;
        if (english.test(content)) {
          return true;
        }else{
          return false;
        }
      }

    };

    return self.PostToc;
  }
})(jQuery);