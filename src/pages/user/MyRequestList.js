import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ProfileSidebar from '../../components/common/ui/sidebar/ProfileSidebar';
import Button from '../../components/common/ui/Button';
import { fetchMyRequestList } from '../../redux/slices/myRequestSlice';
import {
  DATE_DISPLAY_FORMAT,
  getNextStep, RESOLUTION_LABEL,
  STATUS_LABEL,
  STATUS_RECEIVED,
  STATUS_REQUEST,
  SUCCEEDED
} from '../../constant';
import Pagination from '../../components/common/ui/table/Pagination';
import { modal_position } from '../../components/common/ui/styles';
import RequestForm from '../../components/transactions/RequestForm';
import Modal from 'react-modal';
import CancelRequestForm from '../../components/transactions/CancelRequestForm';
import { toast } from 'react-toastify';
import { timeout } from '../../helpers/AjaxHelper';
import { resetForm } from '../../redux/slices/requestBookSlice';
import SendBookForm from '../../components/transactions/SendBookForm';
import SendBackForm from '../../components/transactions/SendBackForm';

function MyRequestList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const data = useSelector((state) => state.myRequestList.data);
  const meta = useSelector((state) => state.myRequestList.meta);

  const formCancelStatus = useSelector((state) => state.cancelRequest.formStatus);
  const formSendBackStatus = useSelector((state) => state.sendBack.formStatus);
  const [isCancelRequestModalShow, setIsCancelRequestModalShow] = useState(false);
  const [isSendBackModalShow, setIsSendBackModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    dispatch(fetchMyRequestList(1));
  }, []);

  useEffect(() => {
    if (formCancelStatus === SUCCEEDED) {
      setIsCancelRequestModalShow(false);
      toast.success(t('Book cancelled successfully'));
      timeout(1000).then(() => {
        dispatch(resetForm());
        history.go(0);
      });
    }
  }, [formCancelStatus]);

  useEffect(() => {
    if (formSendBackStatus === SUCCEEDED) {
      setIsSendBackModalShow(false);
      toast.success(t('Book send back submitted successfully'));
      timeout(1000).then(() => {
        dispatch(resetForm());
        history.go(0);
      });
    }
  }, [formSendBackStatus]);

  function gotoPage(page) {
    dispatch(fetchMyRequestList(page));
  }

  function cancelRequestClicked(id, title) {
    setSelectedId(id);
    setSelectedTitle(title);
    setIsCancelRequestModalShow(true);
  }

  function sendBackClicked(id, title) {
    setSelectedId(id);
    setSelectedTitle(title);
    setIsSendBackModalShow(true);
  }

  return (
    <>
      <aside className="flex-initial w-60 hidden md:block" style={{ minWidth: '250px' }}>
        <ProfileSidebar/>
      </aside>
      <div className="flex-auto px-6">
        <div className="py-3 border-b">
          <h3 className="float-left text-2xl font-bold">{t('My Request')}</h3>
          <div className="clear-both" />
        </div>
        <div className="mt-4">
          {
            data &&
            data.map((trans) => {
              const requested_at = trans?.requested_at ? moment(trans?.requested_at).format(DATE_DISPLAY_FORMAT) : '-';
              const approved_at = trans?.approved_at ? moment(trans?.approved_at).format(DATE_DISPLAY_FORMAT) : '-';
              const send_at = trans?.send_at ? moment(trans?.send_at).format(DATE_DISPLAY_FORMAT) : '-';
              const received_at = trans?.received_at ? moment(trans?.received_at).format(DATE_DISPLAY_FORMAT) : '-';
              const send_back_at = trans?.send_back_at ? moment(trans?.send_back_at).format(DATE_DISPLAY_FORMAT) : '-';
              const received_back_at = trans?.received_back_at ? moment(trans?.received_back_at).format(DATE_DISPLAY_FORMAT) : '-';
              const next_step = getNextStep(trans?.status);

              return (
                <div
                  className="w-full border border-gray-300 bg-white rounded px-6 py-6 flex flex-col justify-between leading-normal">
                  <h3 className="text-gray-900 font-bold text-xl mb-2">{trans?.listing?.book?.title}</h3>
                  <div className="flex flex-row flex-wrap gap-y-5">
                    <div className="w-full md:w-1/3">
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Status')}</span>
                        :<span className="flex-grow text-right">{STATUS_LABEL[trans?.status]}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Resolution')}</span>
                        :<span className="flex-grow text-right">{RESOLUTION_LABEL[trans?.resolution]}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Requested At')}</span>
                        :<span className="flex-grow text-right">{requested_at}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Approved At')}</span>
                        :<span className="flex-grow text-right">{approved_at}</span>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 md:pl-3 md:pr-3">
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Send At')}</span>
                        :<span className="flex-grow text-right">{send_at}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Send Receipt')}</span>
                        :<span className="flex-grow text-right">{trans.receipt ?? '-'}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Received At')}</span>
                        :<span className="flex-grow text-right">{received_at}</span>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3">
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Send Back At')}</span>
                        :<span className="flex-grow text-right">{send_back_at}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Send Back Receipt')}</span>
                        :<span className="flex-grow text-right">{trans.send_back_receipt ?? '-'}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="display-block flex-grow-0 w-32">{t('Received Back At')}</span>
                        :<span className="flex-grow text-right">{received_back_at}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="float-left">
                      {
                        next_step &&
                        <div className="bg-gray-100 px-3 py-2 rounded-lg">{next_step}</div>
                      }
                    </div>
                    <div className="float-right">
                      {
                        trans.status === STATUS_REQUEST &&
                        <Button
                          onClick={() => cancelRequestClicked(trans.id, trans?.listing?.book?.title)}>Cancel</Button>
                      }
                      {
                        trans.status === STATUS_RECEIVED &&
                        <Button
                          onClick={() => sendBackClicked(trans.id, trans?.listing?.book?.title)}>Send Back</Button>
                      }
                    </div>
                  </div>

                </div>
              );
            })
          }
          <Pagination
            current_page={meta.current_page}
            total_page={meta.last_page}
            gotoPage={gotoPage}/>
        </div>

      </div>
      <Modal
        isOpen={isCancelRequestModalShow}
        contentLabel="Request book"
        style={modal_position}
        onRequestClose={() => setIsCancelRequestModalShow(false)}
      >
        <CancelRequestForm
          transactionId={selectedId}
          title={selectedTitle}
          closeDialog={() => setIsCancelRequestModalShow(false)}
        >
        </CancelRequestForm>
      </Modal>
      <Modal
        isOpen={isSendBackModalShow}
        contentLabel="Send Back"
        style={modal_position}
        onRequestClose={() => setIsSendBackModalShow(false)}
      >
        <SendBackForm
          transactionId={selectedId}
          title={selectedTitle}
          closeDialog={() => setIsSendBackModalShow(false)}
        >
        </SendBackForm>
      </Modal>
    </>
  );
}

export default MyRequestList;