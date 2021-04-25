import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AuthCatch from './Auth/AuthCatch';
import Error from "./404/Error404";
import AllPosts from './AllPosts/AllPosts';
import Contacts from './Contact/Contacts';
import PostDetail from './PostDetail/PostDetail';
import PostList from './PostList/PostList';
import EmailConfirmed from './Subscribe/EmailConfirmed';
import Unsubscribed from './Subscribe/Unsubscribed';
import usePageTracking from "../hooks/usePageTracking";
import Privacy from "./Footer/Privacy";


function Main() {
    usePageTracking();

    return (
        <main>            
            <Switch>
                <Route exact path='/' component={PostList} />
                <Route path='/contact' component={Contacts} />
                <Route path='/allposts' component={AllPosts} />
                <Route path='/auth' component={AuthCatch} />
                <Route path='/privacy' component={Privacy} />
                <Route path='/404' component={Error}/>
                <Route path='/subscribed' component={EmailConfirmed} />
                <Route path='/unsubscribed' component={Unsufsafbscribed} />
                <Route path='/:slug' component={PostDetail} />
            </Switch>
        </main>
    );
}

export default Main;
