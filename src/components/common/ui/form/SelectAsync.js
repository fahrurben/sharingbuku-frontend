import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async/dist/react-select.esm';

function SelectAsync({
                     control, id, name, label, validationRules, required, error, loadOptions, defaultOptions
                   }) {

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
        <Controller
          control={control}
          name={name}
          rules={validationRules}
          defaultValue={{}}
          render={({ onChange, onBlur, value }) => (
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions={defaultOptions}
              onChange={onChange}
            />
          )}
        />
        {
          error && <p className="text-red-500 text-xs italic">{error.message}</p>
        }
      </div>
    </div>
  );
}

SelectAsync.propTypes = {
  control: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  validationRules: PropTypes.object,
  loadOptions: PropTypes.func.isRequired,
  defaultOptions: PropTypes.array,
  error: PropTypes.string,
};

SelectAsync.defaultProps = {
  required: false,
  label: null,
  validationRules: {},
  error: '',
};

export default SelectAsync;
