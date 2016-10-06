import handleAction from './handleAction.js';

export const addDefaultCrudRoutes = (name, actionObject, router, stormpath, multipartMiddleware) => {

  router.route('/' + name).post(stormpath.groupsRequired(['public']), multipartMiddleware, function(req, res) {    
    handleAction(actionObject.add(req.body, req.files), res);        
  });

  router.route('/' + name + '/:term/:page').get(function(req, res) {    
    handleAction(actionObject.find(req.params.term,req.params.page), res);      
  });

  router.route('/' + name + '/:item_id')

    .get(function(req, res) {
      handleAction(actionObject.findBySlug(req.params.item_id), res);
    })

    .delete(stormpath.groupsRequired(['admin']), function(req, res) {
      handleAction(actionObject.findByIdAndRemove(req.params.item_id), res);
    })

    .put(stormpath.groupsRequired(['admin']), multipartMiddleware, function(req, res) {
      handleAction(actionObject.findByIdAndUpdate(req.params.item_id, req.body, req.files), res);
  });
}
