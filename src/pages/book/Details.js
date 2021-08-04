import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as _ from 'lodash';
import clsx from 'clsx';
import { fetchBook } from '../../redux/slices/bookDetailsSlice';
import { YES, NO } from '../../constant';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function Details() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  let { id } = useParams();

  const book = useSelector((state) => state.bookDetails.book);

  useEffect(() => {
    dispatch(fetchBook(id))
  }, []);

  function back() {
    history.goBack();
  }

  return (
    <>
      <div className="flex-auto px-6">
        <div className="py-2 border-b">
          <h3 className="float-left text-2xl font-bold">{t('Book Details')}</h3>
          <button
            className="float-right flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {t('Request Borrow')}
          </button>
          <div className="clear-both"></div>
        </div>
        <div className="flex py-4">

          <div className="flex-initial w-40">
            {
              book?.image ?
                (<img src={baseUrl + '/storage/books/' + book.image} alt=""/>) :
                (<img src={baseUrl + '/img/book_placeholder.jpg'} alt=""/>)
            }
          </div>

          <div className="flex-auto px-6">
            <h3 className="text-2xl font-bold">{book?.title}</h3>
            <p><span className="inline-block w-24">{t('Author')}</span>: {book?.author}</p>
            <p><span className="inline-block w-24">{t('Description')}</span>: {book?.desc}</p>
            <p><span className="inline-block w-24">{t('ISBN')}</span>: {book?.isbn}</p>
            <p><span className="inline-block w-24">{t('Category')}</span>: {book?.category?.name}</p>
            <p>
              <span className="inline-block w-24">{t('Is Available')}</span>
              : {book?.is_available && !book?.is_logged_in_user_owned ? t(YES) : t(NO)}
            </p>

          </div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="mt-4">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
    text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={back}>Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
