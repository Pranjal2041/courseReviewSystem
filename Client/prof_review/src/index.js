import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from './App';
import CourseReviewsPage from "./courseReviewsPage";
import ProfReviewPage from "./profReviewsPage"
import * as serviceWorker from './serviceWorker';
import Callback from "./Callback";


var hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/courses/:title" component={CourseReviewsPage} />
            <Route path="/professors/:title" component={ProfReviewPage} />
            <Route exact path='/callback' component={Callback} />
            <Route path="/" component={App} />

        </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
