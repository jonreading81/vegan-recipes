
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import User from '../helpers/User';

function checkAuth(groups, store, replace, cb) {
  const { auth: { user}} = store.getState();
  const authenticatedUser = new User(user);
  if (!user || !authenticatedUser.isMemberOfGroups(groups)) {
    replace('/login');
  }
  cb();
}

export function requireMemberOfGroups(groups, store, nextState, replace, cb) {
  const _checkAuth = checkAuth.bind(this, groups, store, replace, cb);

  if (!isAuthLoaded(store.getState())) {
    store.dispatch(loadAuth()).then(_checkAuth, _checkAuth);
  } else {
    _checkAuth();
  }
}

export function requireMemberOfAnyGroup(store, nextState, replace, cb) {
  requireMemberOfGroups([], store, nextState, replace, cb);
}

export function requireMemberOfPublicGroup(store, nextState, replace, cb) {
  requireMemberOfGroups(['public'], store, nextState, replace, cb);
}

export function requireMemberOfAdminGroup(store, nextState, replace, cb) {
  requireMemberOfGroups(['admin'], store, nextState, replace, cb);
}

export function requireMemberAyaGroup(store, nextState, replace, cb) {
  requireMemberOfGroups(['aya'], store, nextState, replace, cb);
}
