import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';

function Select({
                  inputRef,
                  id, name, label, options, optionsValueField, optionsLabelField, required, error, placeholder,
                  onChange, ...attributes
                }) {

  let styles = [
    'block', 'appearance-none', 'w-full', 'bg-gray-100', 'border', 'border-gray-100', 'text-gray-700',
    'py-2', 'px-4', 'pr-8', 'rounded', 'mb-3'
  ];
  styles = error ? _.concat(styles, ['border-red-500']) : styles;
  styles = clsx(styles);

  return (
    <div>
      {
        label
        && (
          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                 htmlFor={id}>
            {label}
            {
              required && <span className="text-red-600"> *</span>
            }
          </label>
        )
      }
      <div className="relative">
        <select
          id={id}
          name={name}
          className={styles}
          ref={inputRef}
          onChange={onChange}
          {...attributes}
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
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
        {
          error && <p className="text-red-500 text-xs italic">{error.message}</p>
        }
      </div>
    </div>
  );
}

Select.propTypes = {
  inputRef: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  optionsValueField: PropTypes.string,
  optionsLabelField: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
};

Select.defaultProps = {
  required: false,
  label: null,
  placeholder: '',
  error: '',
  optionsValueField: 'id',
  optionsLabelField: 'name',
};

export default Select;
