import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../common/ui/Button';
import { sendBookSubmit } from '../../redux/slices/sendBookSlice';
import { useForm } from 'react-hook-form';
import TextInput from '../common/ui/form/TextInput';

function SendBookForm(props) {
  const { control, register, getValues, handleSubmit, errors: formErrors } = useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  function submit(data) {
    dispatch(sendBookSubmit(props.transactionId, data.receipt));
  }

  return (
    <div className="px-4 pt-4">
      <h3
        className="text-2xl text-gray-500 font-medium mb-4">{t('Please fill details of delivery information')}</h3>
      <form>
        {/* -- Form Row -- */}
        <div className="-mx-3 md:flex mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <TextInput
              id="receipt"
              name="receipt"
              label={t('Receipt')}
              required={true}
              inputRef={register({required: true})}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="mr-2">
            <Button type="secondary"
                    onClick={() => props.closeDialog()}
            >
              {t('Cancel')}
            </Button>
          </div>

          <Button onClick={handleSubmit(submit)}>
            {t('Submit')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendBookForm;