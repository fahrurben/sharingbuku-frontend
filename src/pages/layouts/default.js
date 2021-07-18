import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AUTH_FULL_NAME_KEY, AUTH_TOKEN_KEY } from '../../constant';
import clsx from 'clsx';
import _ from 'lodash';

export default function DefaultLayout({ children }) {
  const { t, i18n } = useTranslation();
  const isLoading = useSelector((state) => state.global.isLoading);
  const error = useSelector((state) => state.global.error);
  const history = useHistory();
  const fullName = localStorage.getItem(AUTH_FULL_NAME_KEY);

  const [showProfile, setShowProfile] = React.useState(false);

  function toggleProfile() {
    setShowProfile(!showProfile);
  }

  useEffect(() => {
    const pageClickEvent = (e) => {
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

  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<BounceLoader/>}
    >
      <nav className="block w-full h-auto sm:h-16 bg-indigo-900">
        <div className="container mx-auto h-full">
          <div className="float-left h-full">
            <div className="flex items-center h-full py-2">
              <a href="#" className="text-xl md:text-2xl px-2 font-bold text-white">Sharing Buku</a>
              <div className="md:ml-8">
                <input
                  className="float-left appearance-none md:w-80 ml-2 block bg-gray-50 text-gray-700 border border-gray-500 rounded rounded-r-none py-2 px-2 h-10 border-r-0"
                  id="" type="text" placeholder="Cari"/>
                <button
                  className="float-left h-10 block border border-gray-500 rounded rounded-l-none bg-gray-200 border-l-0 w-10">
                  <i className="lni lni-search-alt"></i></button>
                <div className="clear-both"></div>
              </div>
            </div>
          </div>
          <div className="float-right flex items-center h-full px-2 py-1">
            <div className="float-left relative flex flex-row items-center h-full border-l border-gray-600 p-4">
              <a href="#" onClick={toggleProfile} className="flex flex-row items-center h-full">
                <span className="flex flex-row items-center justify-center h-10 w-10 rounded-full bg-gray-400 mr-2">
                  <i className="lni lni-user"></i>
                </span>
                <span className="display-block text-white">{fullName}</span>
                <svg className="fill-current text-white h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </a>
              {showProfile ?
                (<ul className="absolute text-gray-700" style={{ top: '60px', left: '0px', right: '0px' }}>
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
                </ul>) : <span>&nbsp;</span>
              }
            </div>
          </div>
          <div className="clear-both"></div>
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
