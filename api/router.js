import express from 'express';
import handleAction from 'utils/handleAction.js';
const Recipe   = require('models/recipe');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
import * as recipes  from 'actions/recipe';
import * as images  from 'actions/image';
import * as survey  from 'actions/survey';
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

router.route('/recipes').post(stormpath.groupsRequired(['public']), multipartMiddleware, function(req, res) {    
  handleAction(recipes.add(req.body, req.files), res);        
});

router.route('/recipes/:term/:page').get(function(req, res) {    
  handleAction(recipes.find(req.params.term,req.params.page), res);      
});

router.route('/recipes/:recipe_id')

  .get(function(req, res) {
    handleAction(recipes.findBySlug(req.params.recipe_id), res);
  })

  .delete(stormpath.groupsRequired(['admin']), function(req, res) {
    handleAction(recipes.findByIdAndRemove(req.params.recipe_id), res);
  })

  .put(stormpath.groupsRequired(['admin']), multipartMiddleware, function(req, res) {
    handleAction(recipes.findByIdAndUpdate(req.params.recipe_id, req.body, req.files), res);
});

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

-------------------------- Images  ------------------

*/

router.route('/images').get(stormpath.groupsRequired(['admin']), function(req, res) {    
  handleAction(images.getAll(), res);        
});

router.route('/images').post(stormpath.groupsRequired(['admin']), function(req, res) {    
  handleAction(images.update(req.body, req.files), res);        
});

/*

-------------------------- Survey  ------------------

*/

router.post('/survey', function(req, res){
   handleAction(survey.post(req.body), res);
});


export default router;
