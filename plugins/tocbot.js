import tocbot from 'tocbot'
import Vue from 'vue'

Vue.prototype.$InjectedTOC = () => {
  if (process.client) {
    createTocbot();
    function createTocbot() {
      var target = document.getElementById('content-body');
      var headings = target.querySelectorAll('h2')
      var headingMap = {}
      
      Array.prototype.forEach.call(headings, function (heading) {
        var id = heading.id ? heading.id : heading.textContent.trim().toLowerCase()
          .split(' ').join('-').replace(/[!@#$%^&*():]/ig, '').replace(/\//ig, '-')
        headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0
        if (headingMap[id]) {
          heading.id = id + '-' + headingMap[id]
        } else {
          heading.id = id
        }
      });

      tocbot.init({
        tocSelector: '.js-toc',
        contentSelector: '.content-body',
        headingSelector: 'h2',
        hasInnerContainers: true,
      });
    }

    // var observer = new MutationObserver(() => {   
    //   createTocbot();
    // });
    
    // var config = { childList: true };
    // observer.observe(target, config);
  }
}

