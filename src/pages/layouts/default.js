import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';

export default function DefaultLayout({ children }) {
  const history = useHistory();

  return (
    <div className="">
      {children}
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
