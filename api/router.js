import express from 'express';
import handleAction from 'utils/handleAction.js';
import {addDefaultCrudRoutes} from 'utils/routerHelper.js';
const Recipe   = require('models/recipe');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
import * as recipes  from 'actions/recipe';
import * as inspiration  from 'actions/inspiration';
import * as images  from 'actions/image';
import * as survey  from 'actions/survey';
import * as wordpress  from 'actions/wordpress';
import stormpath from 'express-stormpath';


/*

-------------------------- API  ------------------

*/
router.get('/status', function(req, res){
  res.json({status:"connected"});
});

/*

-------------------------- Recipes  ------------------

*/
console.log(recipes);
addDefaultCrudRoutes('recipes', recipes, router, stormpath, multipartMiddleware);


router.route('/ingredients').get(function(req, res) {    
  handleAction(recipes.ingredients(), res);        
});

router.route('/quantities').get(function(req, res) {    
  handleAction(recipes.quantities(), res);        
});

router.route('/diets').get(function(req, res) {    
  handleAction(recipes.diets(), res);        
});

router.route('/categories').get(function(req, res) {    
  handleAction(recipes.categories(), res);        
});


/*

-------------------------- Inspiration  ------------------

*/

addDefaultCrudRoutes('inspiration', inspiration, router, stormpath, multipartMiddleware);

/*

-------------------------- Images  ------------------

*/

router.route('/images/:term/:page').get(stormpath.groupsRequired(['admin']), function(req, res) {    
  handleAction(images.getPaginated(req.params.term,req.params.page), res);        
});

router.route('/images/:image')

  .delete(stormpath.groupsRequired(['admin']), function(req, res) {
      handleAction(images.deleteImage(req.params.image), res);      
  })

  .put(stormpath.groupsRequired(['admin']), multipartMiddleware, function(req, res) {
    handleAction(images.update(req.body, req.files), res);        
});

router.route('/images').post(stormpath.groupsRequired(['admin']), multipartMiddleware,  function(req, res) {  
  handleAction(images.update(req.body, req.files), res);        
});

/*

-------------------------- Survey  ------------------

*/

router.post('/survey', function(req, res){
   handleAction(survey.post(req.body, req), res);
});

/*

-------------------------- Wordpress  ------------------

*/

router.get('/wp-json*', function(req, res){
   handleAction(wordpress.get(req), res);
});


export default router;
