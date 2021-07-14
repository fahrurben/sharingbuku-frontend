import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';

function TextArea({
                     inputRef, id, name, label, required, error, placeholder,
                   }) {
  let styles = [
    'appearance-none', 'block', 'w-full', 'bg-gray-100', 'text-gray-700', 'border', 'border-gray-100',
    'focus:outline-none', 'rounded', 'py-2', 'px-4', 'mb-3',
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
              required && <span class="text-red-600"> *</span>
            }
          </label>
        )
      }
      <div>
        <textarea
          className={styles}
          placeholder={placeholder}
          name={name}
          id={id}
          ref={inputRef}
        />
        {
          error && <p className="text-red-500 text-xs italic">{error.message}</p>
        }
      </div>
    </div>
  );
}

TextArea.propTypes = {
  inputRef: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
};

TextArea.defaultProps = {
  required: false,
  label: null,
  placeholder: '',
  error: '',
};

export default TextArea;
