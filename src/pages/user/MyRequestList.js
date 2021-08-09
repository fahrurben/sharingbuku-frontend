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
  getNextStep,
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
        <div className="py-2 border-b mb-4">
          <h3 className="float-left text-2xl font-bold">{t('My Request')}</h3>
          <div className="clear-both">&nbsp;</div>
        </div>
        {/* Table part */}
        <div className="mt-2">
          <table className="table-auto w-full">
            <thead className="">
            <tr className="bg-green-600">
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">{t('Title')}</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">{t('Requested At')}</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">{t('Approved At')}</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">{t('Send At')}</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">{t('Send Back At')}</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">{t('Status')}</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">{t('Actions')}</span>
              </th>

            </tr>
            </thead>
            <tbody className="bg-gray-200">
            {
              data &&
              data.map((trans) => {
                const requested_at = trans?.requested_at ? moment(trans?.requested_at).format(DATE_DISPLAY_FORMAT) : '';
                const approved_at = trans?.approved_at ? moment(trans?.approved_at).format(DATE_DISPLAY_FORMAT) : '';
                const send_at = trans?.send_at ? moment(trans?.send_at).format(DATE_DISPLAY_FORMAT) : '';
                const send_back_at = trans?.send_back_at ? moment(trans?.send_back_at).format(DATE_DISPLAY_FORMAT) : '';

                return (
                  <tr className="bg-white border-b-2 border-gray-200">
                    <td className="px-4 py-3">{trans?.listing?.book?.title}</td>
                    <td className="px-4 py-3">{requested_at}</td>
                    <td className="px-4 py-3">{approved_at}</td>
                    <td className="px-4 py-3">{send_at}</td>
                    <td className="px-4 py-3">{send_back_at}</td>
                    <td align="center" className="px-4 py-3">{STATUS_LABEL[trans?.status]}</td>
                    <td align="center">
                      {getNextStep(trans?.status)}
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
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
          <Pagination
            current_page={meta.current_page}
            total_page={meta.last_page}
            gotoPage={gotoPage}/>
        </div>
        {/* Table part end */}
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