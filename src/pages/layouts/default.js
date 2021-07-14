import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AUTH_FULL_NAME_KEY, AUTH_TOKEN_KEY } from '../../constant';

export default function DefaultLayout({ children }) {
  const { t, i18n } = useTranslation();
  const isLoading = useSelector((state) => state.global.isLoading);
  const error = useSelector((state) => state.global.error);
  const history = useHistory();
  const fullName = localStorage.getItem(AUTH_FULL_NAME_KEY);

  function logoutClicked() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_FULL_NAME_KEY);
    history.push('/');
  }

  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<BounceLoader />}
    >
      <nav className="block w-full h-auto sm:h-16 bg-indigo-900">
        <div className="container mx-auto h-full">
          <div className="float-left h-full">
            <div className="flex items-center h-full py-2">
              <a href="#" className="text-xl md:text-2xl px-2 font-bold text-white">Sharing Buku</a>
              <div className="md:ml-8">
                <input
                  className="float-left appearance-none md:w-80 ml-2 block bg-gray-50 text-gray-700 border border-gray-500 rounded rounded-r-none py-2 px-2 h-10 border-r-0"
                  id="" type="text" placeholder="Cari" />
                  <button
                    className="float-left h-10 block border border-gray-500 rounded rounded-l-none bg-gray-200 border-l-0 w-10">
                    <i className="lni lni-search-alt"></i></button>
                  <div className="clear-both"></div>
              </div>
            </div>
          </div>
          <div className="float-right flex items-center h-full px-2 py-1">
            <div className="float-left flex flex-row items-center h-full border-l border-gray-600 p-4">
              <span className="flex flex-row items-center justify-center h-10 w-10 rounded-full bg-gray-400 mr-2">
                <i className="lni lni-user"></i>
              </span>
              <a href="#" className="display-block text-white">{fullName}</a>
            </div>
            <div className="float-left flex flex-row items-center h-full border-l border-gray-600 p-4">
              <a href="#" onClick={logoutClicked} className="display-block text-white">Logout</a>
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
