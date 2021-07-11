import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PostComponent from "../Components/PostComponent/post";
import PostDetail from "../Components/PostDetailComponent/PostDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PostComponent} />
        <Route path="/posts/:post_id" component={PostDetail} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
