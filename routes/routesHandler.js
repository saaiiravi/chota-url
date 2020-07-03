var url = require ('../controller/controller');
module.exports = function(router) {
  router.post('/shrink',url.shrink);
  router.get('/:shortUrl',url.expand);
  
}