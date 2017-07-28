import stormpath from 'express-stormpath';


export default function(app) {

  const stormpathMiddleware = stormpath.init(app, {
    expand: {
      groups: true
    },
    web: {
      produces: ['application/json'],
       me: {
        expand: {
          groups: true
        },
      },
      register: {
        autoLogin: true
      }
    },
    postLoginHandler: (account, req, res, next) => {
      res.send({account:account});
    },
    postRegistrationHandler: (account, req, res, next) => {
      account.addToGroup('https://api.stormpath.com/v1/groups/2xofCJhC8PbXFHXAAM2vdf', (err, membership) => {

      });
      next();
    }
  });

  app.use(stormpathMiddleware);

   app.get('/auth',  stormpath.getUser, function (req, res) {
    if (req.user) {
      res.send({account:req.user});
    } else {
      res.status(401);
      res.send({
          name: 'Not Authorised',
          message:'Not Logged in'
      });
    }
  });



  return stormpathMiddleware;

}
