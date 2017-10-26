import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {requireMemberOfAnyGroup, requireMemberOfAdminGroup, requireMemberOfButtaGroup} from './utils/routeValidation';
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
    /* ButtaLabel, */
    AboutButta,
    ImageList,
    UpdateImage,
    DeleteImage,
    AddImage,
    Article,
    ArticleList,
    InspirationList,
    AddInspiration,
    ViewInspiration,
    UpdateInspiration,
    DeleteInspiration,
    InspirationSlideshow,
    AddLink,
    UpdateLink,
    DeleteLink,
    LinkList,
    JonProfile
  } from 'containers';

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      <Route path="butta" onEnter={requireMemberOfButtaGroup.bind(null, store)}>>
        <IndexRoute component={AboutButta}/>
        <Route path="survey" component={Survey}/>
        { /* <Route path="label" component={ButtaLabel}/> */ }
      </Route>
       <Route path="images" onEnter={requireMemberOfAdminGroup.bind(null, store)}>
         <Route path="list/:term(/:page)" component={ImageList}/>
        <Route path="add" component={AddImage}/>
         <Route path=":image" component={UpdateImage}/>
         <Route path=":image/delete" component={DeleteImage}/>
      </Route>
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
      <Route path="inspiration">
        <Route onEnter={requireMemberOfAnyGroup.bind(null, store)} path="add" component={AddInspiration}/>
        <Route path="slideshow" component={InspirationSlideshow}/>
        <Route path="list/:term(/:page)" component={InspirationList} />
        <Route path=":entity" component={ViewInspiration}/>
         <Route onEnter={requireMemberOfAdminGroup.bind(null, store)}>
          <Route path=":entity/update" component={UpdateInspiration}/>
          <Route path=":entity/delete" component={DeleteInspiration}/>
        </Route>
      </Route>
       <Route path="link">
        <Route onEnter={requireMemberOfAnyGroup.bind(null, store)} path="add" component={AddLink}/>
        <Route onEnter={requireMemberOfAdminGroup.bind(null, store)}>
          <Route path=":entity/update" component={UpdateLink}/>
          <Route path=":entity/delete" component={DeleteLink}/>
        </Route>
        <Route path="list/:term(/:page)" component={LinkList} />
      </Route>
      <Route path="yoga">
        <Route path="jon-reading(/:page)" component={JonProfile} />
      </Route>
      <Route path="article">
        <Route path="list/:term(/:page)" component={ArticleList} />
        <Route path=":article" component={Article}/>
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
