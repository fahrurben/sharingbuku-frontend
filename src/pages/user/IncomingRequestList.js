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
  STATUS_APPROVED,
  STATUS_LABEL,
  STATUS_REQUEST,
  SUCCEEDED
} from '../../constant';
import Pagination from '../../components/common/ui/table/Pagination';
import { modal_position } from '../../components/common/ui/styles';
import RequestForm from '../../components/transactions/RequestForm';
import Modal from 'react-modal';
import ApproveRequestForm from '../../components/transactions/ApproveRequestForm';
import { toast } from 'react-toastify';
import { timeout } from '../../helpers/AjaxHelper';
import { resetForm } from '../../redux/slices/requestBookSlice';
import { fetchIncomingRequestList } from '../../redux/slices/incomingRequestListSlice';
import RejectRequestForm from '../../components/transactions/RejectRequestForm';
import SendBookForm from '../../components/transactions/SendBookForm';

function IncomingRequestList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const data = useSelector((state) => state.incomingRequestList.data);
  const meta = useSelector((state) => state.incomingRequestList.meta);

  const formApproveStatus = useSelector((state) => state.approveRequest.formStatus);
  const formRejectStatus = useSelector((state) => state.rejectRequest.formStatus);
  const formSendBookStatus = useSelector((state) => state.sendBook.formStatus);

  const [isApproveRequestModalShow, setIsApproveRequestModalShow] = useState(false);
  const [isRejectRequestModalShow, setIsRejectRequestModalShow] = useState(false);
  const [isSendBookModalShow, setIsSendBookModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    dispatch(fetchIncomingRequestList(1));
  }, []);

  useEffect(() => {
    if (formApproveStatus === SUCCEEDED) {
      setIsApproveRequestModalShow(false);
      toast.success(t('Book approved successfully'));
      timeout(1000).then(() => {
        dispatch(resetForm());
        history.go(0);
      });
    }
  }, [formApproveStatus]);

  useEffect(() => {
    if (formRejectStatus === SUCCEEDED) {
      setIsRejectRequestModalShow(false);
      toast.success(t('Book rejected successfully'));
      timeout(1000).then(() => {
        dispatch(resetForm());
        history.go(0);
      });
    }
  }, [formRejectStatus]);

  useEffect(() => {
    if (formSendBookStatus === SUCCEEDED) {
      setIsSendBookModalShow(false);
      toast.success(t('Book send successfully'));
      timeout(1000).then(() => {
        dispatch(resetForm());
        history.go(0);
      });
    }
  }, [formSendBookStatus]);

  function gotoPage(page) {
    dispatch(fetchIncomingRequestList(page));
  }

  function approveRequestClicked(id, title) {
    setSelectedId(id);
    setSelectedTitle(title);
    setIsApproveRequestModalShow(true);
  }

  function rejectRequestClicked(id, title) {
    setSelectedId(id);
    setSelectedTitle(title);
    setIsRejectRequestModalShow(true);
  }

  function sendBookClicked(id, title) {
    setSelectedId(id);
    setSelectedTitle(title);
    setIsSendBookModalShow(true);
  }

  return (
    <>
      <aside className="flex-initial w-60 hidden md:block" style={{ minWidth: '250px' }}>
        <ProfileSidebar/>
      </aside>
      <div className="flex-auto px-6">
        <div className="py-2 border-b mb-4">
          <h3 className="float-left text-2xl font-bold">{t('Incoming Request')}</h3>
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
                    <td className="px-4 py-2">{trans?.listing?.book?.title}</td>
                    <td className="px-4 py-3">{requested_at}</td>
                    <td className="px-4 py-3">{approved_at}</td>
                    <td className="px-4 py-3">{send_at}</td>
                    <td className="px-4 py-3">{send_back_at}</td>
                    <td align="center" className="px-4 py-2">{STATUS_LABEL[trans?.status]}</td>
                    <td align="center" className="px-4 py-2 flex justify-center gap-x-2">
                      {getNextStep(trans?.status, true)}
                      {
                        trans.status === STATUS_REQUEST &&
                        (
                          <>
                            <Button
                              onClick={() => approveRequestClicked(trans.id, trans?.listing?.book?.title)}>Approve</Button>
                            <Button
                              type="secondary"
                              onClick={() => rejectRequestClicked(trans.id, trans?.listing?.book?.title)}>Reject</Button>
                          </>
                        )
                      }
                      {
                        trans.status === STATUS_APPROVED &&
                        <Button
                          onClick={() => sendBookClicked(trans.id, trans?.listing?.book?.title)}>Send Book</Button>
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
        isOpen={isApproveRequestModalShow}
        contentLabel="Approve Request"
        style={modal_position}
        onRequestClose={() => setIsApproveRequestModalShow(false)}
      >
        <ApproveRequestForm
          transactionId={selectedId}
          title={selectedTitle}
          closeDialog={() => setIsApproveRequestModalShow(false)}
        >
        </ApproveRequestForm>
      </Modal>
      <Modal
        isOpen={isRejectRequestModalShow}
        contentLabel="Reject Request"
        style={modal_position}
        onRequestClose={() => setIsRejectRequestModalShow(false)}
      >
        <RejectRequestForm
          transactionId={selectedId}
          title={selectedTitle}
          closeDialog={() => setIsRejectRequestModalShow(false)}
        >
        </RejectRequestForm>
      </Modal>
      <Modal
        isOpen={isSendBookModalShow}
        contentLabel="Send Book"
        style={modal_position}
        onRequestClose={() => setIsSendBookModalShow(false)}
      >
        <SendBookForm
          transactionId={selectedId}
          title={selectedTitle}
          closeDialog={() => setIsSendBookModalShow(false)}
        >
        </SendBookForm>
      </Modal>
    </>
  );
}

export default IncomingRequestList;