import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import Home from './components/appbar/home';
import Notification from './components/notification';
import ChatsRecent from './components/chats/chatrecent';
import Post from './components/Post/post';
import People from './components/people';
import Profile from './components/user/profile';
import SpecificPost from './components/Post/specific_post';
import MobileHome from './components/appbar/mobilehome';
import Dashbord from './pages/home/Home'
import SavedPost from './components/Post/savePost_layout'
import FirstPage from './components/logo/logo'
import Groups from './components/Groups'
import DetailsGroups from './components/Groups/detailsGoup'
export class App2 extends Component {

    render() {
        return (
            <div>

                <BrowserRouter basename="/">

                    <Switch>
                        <Route exact path='/' component={FirstPage} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path="/logout" component={Logout}></Route>



                        <div>
                            {window.innerWidth > 700 ?
                                <Home >
                                    <div style={{ margin: 'auto' }}>
                                        <Route exact path='/notifications' render={() => <Notification key={uuidv4()} />} />
                                        <Route exact path='/messages' render={() => <ChatsRecent key={uuidv4()} />} />

                                        <Route exact path='/peoples' render={() => <People key={uuidv4()} />} />
                                        <Route exact path='/profile/:username' render={() => <Profile key={uuidv4()} />} />
                                        <Route exact path='/home' render={() => <Post key={uuidv4()} />} />
                                        <Route exact path='/post/:id' component={SpecificPost} key={"az44444ertyu"} />
                                        <Route exact path='/dashboard' render={() => <Dashbord key={uuidv4()} />} />
                                        <Route exact path='/profile' to="/profile/:username" />
                                        <Route exact path='/savedPost' render={() => <SavedPost key={uuidv4()} />} />
                                        <Route exact path='/groups' render={() => <Groups key={uuidv4()} />} />
                                        <Route exact path='/groups/:GroupId' render={() => <DetailsGroups key={uuidv4()} />} />


                                    </div>
                                </Home> :

                                <MobileHome>
                                    <Route exact path='/notifications' render={() => <Notification key={uuidv4()} />} />
                                    <Route exact path='/messages' render={() => <ChatsRecent key={uuidv4()} />} />
                                    <Route exact path='/peoples' render={() => <People key={uuidv4()} />} />
                                    <Route exact path='/profile/:username' render={() => <Profile key={uuidv4()} />} />
                                    <Route exact path='/home' render={() => <Post key={uuidv4()} />} />
                                    <Route exact path='/post/:id' component={SpecificPost} />
                                    <Route exact path='/groups/:GroupId' render={() => <DetailsGroups key={uuidv4()} />} />
                                    <Route exact path='/groups' render={() => <Groups key={uuidv4()} />} />
                                    <Route exact path='/savedPost' render={() => <SavedPost key={uuidv4()} />} />

                                </MobileHome>
                            }

                        </div>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
};

export default App2;