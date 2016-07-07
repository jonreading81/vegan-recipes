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
    Logout,
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
      <Route path="logout" component={Logout}/>
      <Route path="login" component={Login}/>
      <Route path="recipe" component={App}>
        <Route onEnter={requireMemberOfAnyGroup.bind(null, store)} path="add" component={AddRecipe}/>
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
