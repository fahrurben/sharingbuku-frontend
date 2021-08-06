import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_FULL_NAME_KEY, AUTH_TOKEN_KEY } from '../../constant';
import { useForm } from 'react-hook-form';
import { fetchBooks, setTitle } from '../../redux/slices/homeSlice';

export default function DefaultLayout({ children }) {
  const { t } = useTranslation();
  const { control, register, getValues, handleSubmit, errors: formErrors } = useForm();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.global.isLoading);
  const error = useSelector((state) => state.global.error);
  const title = useSelector((state) => state.home.title);
  const categoryId = useSelector((state) => state.home.categoryId);

  const history = useHistory();
  const fullName = localStorage.getItem(AUTH_FULL_NAME_KEY);

  const [showProfile, setShowProfile] = React.useState(false);

  function toggleProfile() {
    setShowProfile(!showProfile);
  }

  useEffect(() => {
    const pageClickEvent = () => {
      setShowProfile(!showProfile);
    };

    // If the item is active (ie open) then listen for clicks
    if (showProfile) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [showProfile]);

  function logoutClicked() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_FULL_NAME_KEY);
    history.push('/');
  }

  function formSearchSubmitted(data) {
    console.log(data);
    dispatch(setTitle(data.search_key));
    dispatch(fetchBooks(1, data.search_key, categoryId));
  }

  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<BounceLoader/>}
    >
      <nav className="block w-full h-auto sm:h-16 bg-indigo-900 py-2">
        <div className="container mx-auto h-full">
          <div className="float-left h-full md:w-auto">
            <div className="flex items-center h-full">
              <Link to="/" className="text-xl md:text-2xl hidden md:inline px-2 font-bold text-white">Sharing Buku</Link>
              <div className="lg:ml-8">
                <form onSubmit={handleSubmit(formSearchSubmitted)}>
                  <input
                    className="float-left appearance-none md:w-80 ml-2 block bg-gray-50 text-gray-700 border border-gray-500 rounded rounded-r-none py-2 px-2 h-10 border-r-0"
                    id="search_key" name="search_key" defaultValue={title} ref={register()} type="text" placeholder="Cari"/>
                  <button
                    className="float-left h-10 block border border-gray-500 rounded rounded-l-none bg-gray-200 border-l-0 w-10">
                    <i className="lni lni-search-alt"/></button>
                  <div className="clear-both"/>
                </form>
              </div>
            </div>
          </div>
          <div className="float-right flex items-center h-full px-2 py-1">
            <div className="relative flex flex-row items-center h-full lg:p-4">
              <a href="#" onClick={toggleProfile} className="flex flex-row items-center h-full" style={{minWdith: '200px'}}>
                <span className="flex flex-row items-center justify-center h-10 w-10 rounded-full bg-gray-400 mr-2">
                  <i className="lni lni-user"/>
                </span>
                <span className="hidden lg:block text-white">{fullName}</span>
                <svg className="fill-current text-white h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </a>
              {showProfile ?
                (<ul className="fixed lg:absolute text-gray-700" style={{ top: '52px', left: '0px', right: '0px' }}>
                  <li>
                    <Link to="/my_listings"
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">{t('My Books')}</Link>
                  </li>
                  <li>
                    <Link to="/my_request_list"
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">{t('My Requests')}</Link>
                  </li>
                  <li>
                    <Link to="/incoming_request_list"
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">{t('Incoming Requests')}</Link>
                  </li>
                  <li>
                    <Link to="/profile"
                       className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">{t('My Profile')}</Link>
                  </li>
                  <li>
                    <Link to="/change_password"
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">{t('Change Password')}</Link>
                  </li>
                  <li>
                    <a onClick={logoutClicked}
                       className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Logout</a>
                  </li>
                </ul>) : <span/>
              }
            </div>
          </div>
          <div className="clear-both"/>
        </div>
      </nav>
      {/* Main Wrapper */}
      <div className="main-wrapper py-6 min-h-screen">
        <div className="container mx-auto">
          <div className="flex">
            {children}
          </div>
        </div>
      </div>
      {/* Main Wrapper End */}
    </LoadingOverlay>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
