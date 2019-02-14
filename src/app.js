import './app/assets/scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import smoothscroll from 'smoothscroll-polyfill';
import { theme } from './app/components/MaterialTheme';
import thunk from 'redux-thunk';

smoothscroll.polyfill();

//Reducers
import { adminState, notificationState } from './app/components/reducers';

//components
import AppIndex from './app/components/AppIndex';
import Login from './app/components/Login';
import Register from './app/components/Register';

const adminApp = combineReducers({
    adminState,
    notificationState
});

// Manually enable/disable Redux dev tools
const enableReduxDevTools = true;
let activeComposer;

if (enableReduxDevTools) {
    activeComposer = composeWithDevTools({
        features: {
            pause: true, // start/pause recording of dispatched actions
            lock: true, // lock/unlock dispatching actions and side effects
            persist: true, // persist states on page reloading
            export: true, // export history of actions in a file
            jump: true, // jump back and forth (time travelling)
            skip: true, // skip (cancel) actions
            reorder: false, // drag and drop actions in the history list
            dispatch: true, // dispatch custom actions or action creators
            test: true // generate tests for the selected actions
        },
        latency: 600,
        maxAge: 10,
        serialize: {
            options: undefined
        }
    });
} else {
    activeComposer = compose;
}

const store = activeComposer(applyMiddleware(thunk))(createStore)(adminApp);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} name="Login" />
                    <Route path="/register" component={Register} name="Register" />
                    <Route path="/" component={AppIndex} />
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
