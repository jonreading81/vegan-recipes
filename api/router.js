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

router.route('/recipes')
  .post(multipartMiddleware, function(req, res) {
    console.log('post data');
     console.log(req.body, req.files);

     req.body.imageURL=req.files.imageURL.originalFilename;
   
     handleAction(recipes.add(req.body), res);        
  })

  .get(function(req, res) {
      handleAction(recipes.find(), res);
});

router.route('/recipes/:recipe_id')

  .get(stormpath.loginRequired, function(req, res) {
        handleAction(recipes.findBySlug(req.params.recipe_id), res);
  })

  .delete(function(req, res) {
       handleAction(recipes.findByIdAndRemove(req.params.recipe_id), res);
  })

  .put(function(req, res) {
       handleAction(recipes.findByIdAndUpdate(req.params.recipe_id, req.body), res);
});

export default router;
