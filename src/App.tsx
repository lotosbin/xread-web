import React from 'react';
import './App.css';
import {ApolloProvider} from "react-apollo";
import client from './apollo/client';
import {HashRouter as Router, Route, Redirect} from "react-router-dom";
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks';
import AppBar from './components/AppBar'
import loadable from '@loadable/component'
import Callback from "./Callback";
import styles from "./App.module.css"
import GuessContainer from "./modules/guess/containers/GuessContainer";

const Home = loadable(() => import('./Home'));
const Feed = loadable(() => import('./Feed'));
const Tag = loadable(() => import('./Tag'));
const Topic = loadable(() => import('./Topic'));
const Series = loadable(() => import('./Series'));

const App = () => (
    <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
            <Router>
                <div className="App">
                    <AppBar/>
                    <div className={styles.content}>
                        <div className={styles.left}>
                            <Route exact path="/" component={Home}/>
                            <Route path="/article" component={Home}/>
                            <Route path="/article/all" component={Home}/>
                            <Route path="/guess/priority_:priority" component={GuessContainer}/>
                            <Route path="/feed" component={Feed}/>
                            <Route path="/tag" component={Tag}/>
                            <Route path="/topic" component={Topic}/>
                            <Route path="/series" component={Series}/>
                            <Route path="/oauth/callback" component={Callback}/>
                        </div>
                    </div>
                </div>
            </Router>
        </ApolloHooksProvider>
    </ApolloProvider>
);


export default App;
