import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


export default function AuthLayout({ children }) {
  const { t } = useTranslation();
  const isLoading = useSelector((state) => state.global.isLoading);
  const error = useSelector((state) => state.global.error);

  useEffect(() => {
    if (error) {
      toast.error(t('Error, please contact your administrator'));
    }
  }, [error]);

  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<BounceLoader />}
    >
      {error && <div>Error</div>}
      {children}
    </LoadingOverlay>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
