import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {requireMemberOfAnyGroup, requireMemberOfAdminGroup} from './utils/routeValidation';
import {
    App,
    Home,
    NotFound,
    AddRecipe,
    RecipeList,
    ViewRecipe,
    UpdateRecipe,
    DeleteRecipe,
    Login,
    Logout,
    Register,
    Welcome,
    Survey,
    DietaryInformation,
    ImageList,
    UpdateImage,
    DeleteImage,
    AddImage
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
      <Route path="register" component={Register}/>
      <Route onEnter={requireMemberOfAnyGroup.bind(null, store)} path="welcome" component={Welcome}/>
      <Route path="recipe">
        <Route onEnter={requireMemberOfAnyGroup.bind(null, store)} path="add" component={AddRecipe}/>
        <Route path="list/:term(/:page)" component={RecipeList} ignoreScrollBehavior/>
        <Route path=":recipe" component={ViewRecipe}/>
        <Route onEnter={requireMemberOfAdminGroup.bind(null, store)}>
          <Route path=":recipe/update" component={UpdateRecipe}/>
          <Route path=":recipe/delete" component={DeleteRecipe}/>
        </Route>
      </Route>
       <Route path="images" onEnter={requireMemberOfAdminGroup.bind(null, store)}>
         <Route path="list/:term(/:page)" component={ImageList}/>
        <Route path="add" component={AddImage}/>
         <Route path=":image" component={UpdateImage}/>
         <Route path=":image/delete" component={DeleteImage}/>
      </Route>
      <Route path="plant-butter">
        <IndexRoute component={DietaryInformation}/>
        <Route path="survey" component={Survey}/>
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
