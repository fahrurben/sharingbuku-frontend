import React, { useEffect } from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import Route from './Route';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import App from '../App';
import Home from '../pages/home/Home';
import UserProfile from '../pages/user/UserProfile';
import ChangePassword from '../pages/user/ChangePassword';
import AddBook from '../pages/user/AddBook';
import MyListings from '../pages/user/MyListings';
import BookDetails from '../pages/book/Details';
import MyRequestList from '../pages/user/MyRequestList';
import IncomingRequestList from '../pages/user/IncomingRequestList';
import { resetError, setError, setLoaded, setLoading } from '../redux/slices/globalSlice';
import axios from 'axios';
import { setConfig } from '../helpers/AjaxHelper';
import { setRequestListData } from '../redux/slices/myRequestSlice';
import { AUTH_FULL_NAME_KEY, AUTH_TOKEN_KEY } from '../constant';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Routes() {
  const history = useHistory();
  const location = useLocation();

  useEffect(async () => {
    const pathname = location.pathname;
    if (pathname !== '/login' || pathname !== '/register') {
      try {
        const response = await axios.get(`${baseUrl}/api/user/profile`, setConfig());
        if (!response.data) {
          history.push('/login');
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(AUTH_FULL_NAME_KEY);
        }
      } catch (e) {
        history.push('/login');
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_FULL_NAME_KEY);
      } finally {
      }
    }

  }, [location]);

  return (
    <Switch>
      <Route path="/register" exact component={Register} />
      <Route path="/profile" exact component={UserProfile} isPrivate={true}/>
      <Route path="/change_password" exact component={ChangePassword} isPrivate={true}/>
      <Route path="/my_listings" exact component={MyListings} isPrivate={true}/>
      <Route path="/add_book" exact component={AddBook} isPrivate={true}/>
      <Route path="/book/:id" exact component={BookDetails} isPrivate={true}/>
      <Route path="/my_request_list" exact component={MyRequestList} isPrivate={true}/>
      <Route path="/incoming_request_list" exact component={IncomingRequestList} isPrivate={true}/>
      <Route path="/" exact component={Home} isPrivate={true}/>

      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={Login} />
    </Switch>
  );
}
