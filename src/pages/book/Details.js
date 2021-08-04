import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { fetchBook } from '../../redux/slices/bookDetailsSlice';
import { YES, NO, SUCCEEDED } from '../../constant';
import RequestForm from '../../components/transactions/RequestForm';
import Button from '../../components/common/ui/Button';
import { modal_position } from '../../components/common/ui/styles';
import { toast } from 'react-toastify';
import { timeout } from '../../helpers/AjaxHelper';
import { resetForm } from '../../redux/slices/requestBookSlice';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function Details() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  let { id } = useParams();

  const book = useSelector((state) => state.bookDetails.book);
  const formStatus = useSelector((state) => state.requestBook.formStatus);
  const [isRequestModalShow, setIsRequestModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchBook(id))
  }, []);

  useEffect(() => {
    if (formStatus === SUCCEEDED) {
      setIsRequestModalShow(false);
      toast.success(t('Book request successfully'));
      timeout(2000).then(() => {
        dispatch(resetForm());
        history.push('/');
      });
    }
  }, [formStatus]);

  function back() {
    history.goBack();
  }

  return (
    <>
      <div className="flex-auto px-6">
        <div className="py-2 border-b">
          <h3 className="float-left text-2xl font-bold">{t('Book Details')}</h3>
          <div className="float-right">
            {
              book?.is_available && !book?.is_logged_in_user_owned ?
                (
                  <Button onClick={() => setIsRequestModalShow(true)}>
                    {t('Request Borrow')}
                  </Button>
                ) :
                (<></>)
            }
          </div>
          <div className="clear-both" />
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

      <Modal
        isOpen={isRequestModalShow}
        contentLabel="Request book"
        style={modal_position}
        onRequestClose={() => setIsRequestModalShow(false)}
      >
        <RequestForm
          bookId={id}
          closeDialog={() => setIsRequestModalShow(false)}
        >
        </RequestForm>
      </Modal>
    </>
  );
}

export default Details;
