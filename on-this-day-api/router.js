const Router = require('koa-router');
const router = new Router();

const controllers = require('./controllers/fact-controller')


router.get('/facts/:date', controllers.getFact);
router.post('/facts', controllers.postFact);
router.get('/*', () => {
  this.body = '';
  this.status = 404;
});

module.exports = router;