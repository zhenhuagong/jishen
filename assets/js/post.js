/**
 * JS file for post behaviours
 */
var postScript = (function($){
  if ((typeof window !== 'undefined')) {
    var postObj = {
      showToc: function(){
        var isHeaderHit = $(document).scrollTop() > $('.main-header').height();
        if (isHeaderHit) {  // Set width and height fit content
          $('#toc-wrapper').addClass('show');
        }else{  // Set width and height to zero
          $('#toc-wrapper').removeClass('show');
        }
      }
    };

    $(document).ready(function(){
      // Generate table of contents
      PostToc.generate({
        tocParentId: '#toc',
        postClass: '.post-content',
        depth: 4
      });

      // Bind scroll event handler
      var scrollHandler = function(event){
        postObj.showToc();
      };

      $(document).off('scroll', scrollHandler).on('scroll', scrollHandler);
    });
  }
})(jQuery);