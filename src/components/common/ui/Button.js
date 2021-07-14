import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';

function Button({ type, onClick, children, ...props }) {
  let styles = [
    'inline-flex', 'justify-center', 'py-2', 'px-4', 'border', 'border-transparent', 'shadow-sm',
    'text-sm', 'font-medium', 'rounded-md', 'text-white', ''
  ];

  let primaryStyles = ['bg-indigo-600','hover:bg-indigo-700','focus:outline-none','focus:ring-2','focus:ring-offset-2','focus:ring-indigo-500'];
  let secondaryStyles = ['bg-gray-600', 'hover:bg-gray-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-gray-500'];

  let buttonStyles = [];
  if (type === 'secondary') buttonStyles = _.concat(styles, secondaryStyles);
  else buttonStyles = _.concat(styles, primaryStyles);

  if (props?.disabled) buttonStyles = _.concat(styles, secondaryStyles);
  buttonStyles = clsx(buttonStyles);

  return (
    <button
      onClick={onClick}
      className={buttonStyles}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

Button.defaultProps = {
  type: 'primary',
};

export default Button;