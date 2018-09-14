import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {requireMemberOfAnyGroup, requireMemberOfAdminGroup} from './utils/routeValidation';
import {
    AyaApp,
    AyaHome,
    DefaultApp,
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
    AyaRetail,
    AyaAbout,
    AyaProducts,
    AyaContact,
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
    JonProfile,
    AyaArticles,
    AyaArticle,
    ButtaNameSurvey
  } from 'containers';

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
      <Route component={DefaultApp}>
        <Route path="/aya" component={AyaApp}>
            <IndexRoute component={AyaHome}/>
            <Route path="ourstory" component={AyaAbout} />
            <Route path="retail" component={AyaRetail} />
            <Route path="contact" component={AyaContact} />
            <Route path="article">
              <IndexRoute component={AyaArticles}/>
              <Route path="search/:term(/:page)" component={AyaArticles} />
              <Route path=":article" component={AyaArticle}/>
            </Route>
            <Route path="product">
              <IndexRoute component={AyaProducts}/>
              <Route path="search/:term(/:page)" component={AyaProducts} />
              <Route path=":article" component={AyaArticle}/>
            </Route>
            <Route path="*" component={NotFound} status={404} />
        </Route>
        <Route path="/" component={App}>
          { /* Home (main) route */ }
          <IndexRoute component={Home}/>
          <Route path="survey" component={ButtaNameSurvey}/>
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
             <IndexRoute component={ArticleList}/>
            <Route path="search/:term(/:page)" component={ArticleList} />
            <Route path=":article" component={Article}/>
          </Route>
          <Route path="*" component={NotFound} status={404} />
        </Route>
    </Route>
  );
};
