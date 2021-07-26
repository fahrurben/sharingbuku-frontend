import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import App from '../App';
import Home from '../pages/home/Home';
import UserProfile from '../pages/user/UserProfile';
import ChangePassword from '../pages/user/ChangePassword';
import AddBook from '../pages/user/AddBook';
import MyListings from '../pages/user/MyListings';

export default function Routes() {
  return (
    <Switch>
      <Route path="/register" exact component={Register} />
      <Route path="/profile" exact component={UserProfile} isPrivate={true}/>
      <Route path="/change_password" exact component={ChangePassword} isPrivate={true}/>
      <Route path="/my_listings" exact component={MyListings} isPrivate={true}/>
      <Route path="/add_book" exact component={AddBook} isPrivate={true}/>
      <Route path="/" exact component={Home} isPrivate={true}/>

      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={Login} />
    </Switch>
  );
}
