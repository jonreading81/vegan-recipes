import stormpath from 'express-stormpath';
import request from 'superagent';
import get from 'lodash/get';

const API_KEY = process.env.OKTA_APITOKEN;
const OKTA_ORG = process.env.OKTA_ORG;
const API_URL = `${OKTA_ORG}/api/v1/`;
const OKTA_AUTH = `SSWS ${API_KEY}`;
const publiGroupId = '00gaqz9nm7iVmafzW0h7';

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
  request.get(`${API_URL}users/${user.id}/groups/`)
  .set('Authorization', OKTA_AUTH)
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
};

const addUserToGroup = function (userId, groupId) {
  console.log('addUserToGroup');
  const URL = `${API_URL}groups/${groupId}/users/${userId}`;
  console.log('URL', URL);
  request.put(URL)
  .set('Authorization', OKTA_AUTH)
  .end(function(err, res){
    console.log(err);
    console.log(res);
  });
};

export default function(app) {

  const stormpathMiddleware = stormpath.init(app, {
    web: {
      produces: ['application/json'],
      register: {
        autoLogin: true
      }
    },
    postLoginHandler: (user, req, res, next) => {
      appendUserGroupDataToRes(user, res);
    },
    postRegistrationHandler: (account, req, res, next) => {
      console.log('post login handler');
      addUserToGroup(account.id, publiGroupId);
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
