import stormpath from 'express-stormpath';

export default function(app) {
  return stormpath.init(app, {
    expand: {
      groups: true
    },
    web: {
      produces: ['application/json'],
       me: {
        expand: {
          groups: true
        },
      }
    },
    postLoginHandler: (account, req, res, next) => {
      res.send({
        name: account.username,
        groups: account.groups
      });
      console.log(account);
    },
    postRegistrationHandler: (account, req, res, next) => {
      account.addToGroup('https://api.stormpath.com/v1/groups/2xofCJhC8PbXFHXAAM2vdf', (err, membership) => {
            console.log(membership);
      });
      next();
    }
  });
}