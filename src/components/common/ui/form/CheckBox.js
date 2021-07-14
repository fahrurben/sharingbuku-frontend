import React from 'react';
import PropTypes from 'prop-types';

function CheckBox({
                     inputRef, id, name, label,
                   }) {

  return (
    <div>
      <label className="inline-flex items-center mt-3">
        <input type="checkbox"
               className="form-checkbox h-5 w-5 text-gray-600"
               name={name}
               id={id}
               ref={inputRef}
        />
        <span className="ml-2 text-gray-700">{label}</span>
      </label>
    </div>
  );
}

CheckBox.propTypes = {
  inputRef: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CheckBox;
