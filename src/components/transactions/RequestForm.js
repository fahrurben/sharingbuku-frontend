import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../common/ui/Button';
import { requestBookSubmit } from '../../redux/slices/requestBookSlice';

function RequestForm(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="px-4 pt-4">
      <h3
        className="text-2xl text-gray-500 font-medium mb-4">{t('Are you sure want to submit borrow request for this book ?')}</h3>
      <form>
        <div className="flex flex-row justify-end">
          <div className="mr-2">
            <Button type="secondary"
                    onClick={() => props.closeDialog()}
            >
              No
            </Button>
          </div>

          <Button
            onClick={() => dispatch(requestBookSubmit(props.bookId))}
          >
            Yes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RequestForm;