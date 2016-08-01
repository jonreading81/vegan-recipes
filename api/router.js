import express from 'express';
import handleAction from 'utils/handleAction.js';
const Recipe   = require('models/recipe');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
import * as recipes  from 'actions/recipe';
import stormpath from 'express-stormpath';

router.get('/status', function(req, res){
  res.json({status:"connected"});
});

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


export default router;
