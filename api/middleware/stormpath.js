import stormpath from 'express-stormpath';
import request from 'superagent';
import get from 'lodash/get';

const API_KEY = process.env.OKTA_APITOKEN;
const OKTA_ORG = process.env.OKTA_ORG;

const mapOktaGroupToStormPath = function (oktaGroup) {
  let groupName;
  switch (get(oktaGroup, 'profile.name')) {
    case 'group:00gaqz9nm7iVmafzW0h7:admin':
      groupName = 'admin';
      break;
    case 'group:00gaqz9nm7iVmafzW0h7:butta':
      groupName = 'butta';
      break;
    case 'group:00gaqz9nm7iVmafzW0h7:public':
      groupName = 'public';
      break;
    default:
      groupName = 'other';
  }
  return {name: groupName};
};


const appendUserGroupDataToRes = function(user, res) {
  request.get(`${OKTA_ORG}/api/v1/users/${user.id}/groups/`)
  .set('Authorization', 'SSWS 00ssdtaAEZNj4lM8mkUpTSKTSlygwnMXeTMe1wpULw')
  .set('Accept', 'application/json')
  .end(function(err, _res){
      if(err) {
        res.status(500);
        res.send({
            name: 'Error',
            message:'Okta Error'
        });
      }else{
        const groups = JSON.parse(_res.text).map(mapOktaGroupToStormPath);
        user.groups = {items: groups.filter(({name}) => (name !== 'other' ))};
        res.send({account:user});
      }
  });
}

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
    postLoginHandler: (user, req, res, next) => {
      appendUserGroupDataToRes(user, res);
    },
    postRegistrationHandler: (account, req, res, next) => {
      /*
      account.addToGroup('https://api.stormpath.com/v1/groups/2xofCJhC8PbXFHXAAM2vdf', (err, membership) => {
      });
      */
      next();
    }
  });

  app.use(stormpathMiddleware);

   app.get('/auth',  stormpath.getUser, function (req, res) {
    if (req.user) {
      appendUserGroupDataToRes(req.user, res);
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
