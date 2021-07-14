import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';

function FilterSelect({
                  inputRef,
                  id, name, options, optionsValueField, optionsLabelField, placeholder, position,
                }) {

  let styles = [
    'appearance-none', 'h-full', 'border-t', 'border-r', 'border-b', 'block', 'appearance-none', 'w-full', 'bg-white',
    'border-gray-400', 'text-gray-700', 'py-2', 'px-4', 'pr-8', 'leading-tight', 'focus:outline-none', 'focus:border-l', 'focus:border-r', 'focus:bg-white', 'focus:border-gray-500'
  ];

  if (position === 'start') {
    styles = _.concat(styles, ['border-l', 'rounded-l'])
  } else if (position === 'end') {
    styles = _.concat(styles, ['rounded-r'])
  }
  styles = clsx(styles);

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        className={styles}
        ref={inputRef}
      >
        <option value="">{placeholder}</option>
        {
          options
          && options.map(
            (option) => (
              <option
                key={option[optionsValueField]}
                value={option[optionsValueField]}
              >
                {option[optionsLabelField]}
              </option>
            ),
          )
        }
      </select>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}

FilterSelect.propTypes = {
  inputRef: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  position: PropTypes.string.isRequired,
  optionsValueField: PropTypes.string,
  optionsLabelField: PropTypes.string,
};

FilterSelect.defaultProps = {
  required: false,
  placeholder: null,
  optionsValueField: 'id',
  optionsLabelField: 'name',
  position: 'middle',
};

export default FilterSelect;
