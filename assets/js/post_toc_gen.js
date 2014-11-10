self = (typeof window !== 'undefined') ? window : false;

var PostToc = (function(){
  if (self) {
    var _ = self.PostToc = {
      // @param: config
      // {
      //   tocId: 'toc'
      //   postClass: '.post-content',
      //   depth: 3
      // }
      init: function(config){
        _.headerDepth = config.depth || 3;
        var postClass = config.postClass || 'body';
        _.postContent = document.querySelector(postClass);
        if (config.tocId) {
          _.tocParent = document.getElementById(config.tocId);
        }else{
          _.tocParent = undefined;
        }

        // <h1 /><h3 /><h2 /><h3 /><h1 />
        _.headers = []; // headers html: ["header1", "header3", "header2", "header3", "header1"]
        _.headerIds = []; // header id: ["headerid1", "headerid2", "headerid3", "headerid4", "headerid5"]
        _.actualLevelOffsets = [];  // offset of header in toc: [0, 1, 1, 1, 0]
      },

      generate: function(config){
        _.init(config);
        if (_.tocParent) {
          var toc = _.buildToc();
          _.tocParent.appendChild(toc);
        }else{
          // `tocId` needs to be specified
          return;
        }
      },

      // Extract id attribute of <hx> tags
      // and make them normalized
      extractHeadersId : function(){
        var headerNodes = _.getHeaderNodes();

        var level = 1,  // level of current header node
            preHeaderLevel = 1, // level of the previous header node
            preRevHeaderLevel = 1;  // revised level of the previous header node

        while (headerNodes.length){
          headerNode = headerNodes.shift();
          _.headerIds.push(headerNode.id);
          _.headers.push(headerNode.innerHTML);
          level = headerNode.tagName.match(/\d/)[0];

          // Normalize out-of-ordered headers
          if (level > preHeaderLevel) {
            _.actualLevelOffsets.push(1);
            preRevHeaderLevel += 1;
          }else if (level === preRevHeaderLevel
                    || level > preRevHeaderLevel && level <= preHeaderLevel){
            _.actualLevelOffsets.push(0);
          }else if (level < preRevHeaderLevel) {
            actualLevelOffsets.push(level - preRevHeaderLevel);
            preRevHeaderLevel = level;
          }

          totalOffsets += _.actualLevelOffsets[_.actualLevelOffsets.length - 1];
          preHeaderLevel = level;
        }

        if (totalOffsets !== 0 && _.actualLevelOffsets[0] === 1) {
          _.actualLevelOffsets[0] = 0;
        }
      },

      // Build the `table of content` based on the post
      buildToc: function(){
        _.extractHeadersId();

        var tocList = document.createElement('ul');
        var listLevel = [0];
        for(var i = 0; i < _.actualLevelOffsets.length; i++){
          levelOffset = _.actualLevelOffsets[i];
          if (levelOffset === 1) {
            // A new sublist
            subList = document.createElement('ul');
            if (!tocList.lastElementChild) {
              tocList.appendChild(document.createElement('li'));
            }
            tocList.lastElementChild.appendChild(subList);

          }else if(levelOffset < 0){
            levelOffset *= 2;
            while(levelOffset++){
              if (levelOffset % 2) {
                listLevel.pop();
                tocList = tocList.parentNode;
              }
            }
          }
          listLevel[listLevel.length - 1]++;
          li = document.createElement('li');
          link = document.createElement('a');
          link.href = '#' + _.headerIds[i];
          link.innerHTML = _.headers[i];
          li.appendChild(link);
          tocList.appendChild(li);
        }
      },

      getHeaderNodes: function(){
        var result = [];
        var regex = /^h\d$^/;

        var nodes = _.postContent.childNodes;
        var len = nodes.length;
        var node, i;
        for (i = 0; i < len; i++) {
          node = nodes[i];
          if ((node.nodeType === 1 || node.nodeType === 9)
                && regex.test(node.tagName.toLowerCase())) {
            result.push(node);
          }
        }

        return result;
      }
    }

    return self.PostToc;
  }
})();