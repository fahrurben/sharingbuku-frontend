import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';

function FilterInput({
                     inputRef, id, name, position, placeholder,
                   }) {
  let styles = [
    'appearance-none', 'border-t', 'border-r', 'border-b', 'border-gray-400', 'block',
    'pl-3', 'pr-3', 'py-2', 'w-full', 'bg-white', 'text-sm', 'placeholder-gray-400', 'text-gray-700', 'focus:bg-white',
    'focus:placeholder-gray-600', 'focus:text-gray-700', 'focus:outline-none',
  ];

  if (position === 'start') {
    styles = _.concat(styles, ['border-l', 'rounded-l'])
  } else if (position === 'end') {
    styles = _.concat(styles, ['rounded-r'])
  }

  styles = clsx(styles);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        ref={inputRef}
        className={styles}
      />
    </div>
  );
}

FilterInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

FilterInput.defaultProps = {
  position: 'middle',
  placeholder: '',
};

export default FilterInput;
