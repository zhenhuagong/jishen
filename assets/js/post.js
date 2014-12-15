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
      var tocGen = PostToc.generate({
        tocParentId: '#toc',
        postClass: '.post-content',
        depth: 4
      });

      if (tocGen > 0) {
        // Bind scroll event handler
        var scrollHandler = function(event){
          postObj.showToc();
        };

        $(document).off('scroll', scrollHandler).on('scroll', scrollHandler);

        // Bind click event for expanding toc
        $('#toc-wrapper .header-button a').click(function(){
          if($(this).hasClass('icon-arrow-right')){
            // display toc
            $('#toc').show();
            $(this).removeClass('icon-arrow-right');
            $(this).addClass('icon-arrow-down');
          }else{
            // hide toc
            $('#toc').hide();
            $(this).removeClass('icon-arrow-down');
            $(this).addClass('icon-arrow-right');
          }
        });
      }
    });
  }
})(jQuery);