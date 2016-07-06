// import has from 'lodash/has';
import get from 'lodash/get';
import includes from 'lodash/includes';

export default class User {
  constructor(user = {}) {
    this.user = user;
    this.initGroups();
  }

  getUser() {
    return this.user;
  }

  initGroups() {
    const account = this.getAccount();
    const groups = get(account, 'groups', []);
    const items = get(groups, 'items', []);
    this.groups = [];
    items.map(group => {
      const name = get(group, 'name');
      if (name) {
        this.groups.push(name);
      }
    });
  }

  getGroups() {
    return this.groups;
  }

  isMemberOfGroups(groups = []) {
    let isMember = true;
    groups.map(group => {
      if (!this.isMemberOfGroup(group)) {
        isMember = false;
      }
    });
    return isMember;
  }

  isMemberOfGroup(group) {
    if (includes(this.getGroups(), group)) {
      return true;
    }
    return false;
  }

  getAccount() {
    return get(this.getUser(), 'account', false);
  }

  getFullName() {
    return get(this.getAccount(), 'fullName', '');
  }

  isLoggedIn() {
    if (this.getAccount()) {
      return true;
    }
    return false;
  }

}

