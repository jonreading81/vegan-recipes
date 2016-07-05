import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {requireMemberOfAnyGroup, requireMemberOfAdminGroup} from './utils/routeValidation';
import {
    App,
    Home,
    AddRecipe,
    RecipeList,
    ViewRecipe,
    UpdateRecipe,
    DeleteRecipe,
    Login,
    LoginSuccess,
    NotFound,
  } from 'containers';

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireMemberOfAnyGroup.bind(null, store)}>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>
      <Route path="login" component={Login}/>
      <Route path="recipe" component={App}>
        <Route onEnter={requireMemberOfAnyGroup.bind(null, store)}>
          <Route path="add" component={AddRecipe}/>
        </Route>
        <Route path="list" component={RecipeList}/>
        <Route path=":recipe" component={ViewRecipe}/>
        <Route onEnter={requireMemberOfAdminGroup.bind(null, store)}>
          <Route path=":recipe/update" component={UpdateRecipe}/>
          <Route path=":recipe/delete" component={DeleteRecipe}/>
        </Route>
      </Route>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
