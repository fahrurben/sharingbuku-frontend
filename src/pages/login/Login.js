import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import TextInput from '../../components/common/ui/form/TextInput';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/ui/Button';
import { IDLE, FAILED, SUCCEEDED } from '../../constant';
import { doLogin, resetForm } from '../../redux/slices/loginSlice';

function Login() {
  const { control, register, getValues, handleSubmit, errors: formErrors } = useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const formStatus = useSelector((state) => state.login.formStatus);
  const formError = useSelector((state) => state.login.formError);

  useEffect(() => {
    dispatch(resetForm());
  }, []);

  useEffect(() => {
    if (formStatus === SUCCEEDED) {
      history.push('/');
      dispatch(resetForm());
    }
  }, [formStatus]);

  function submit(credential) {
    dispatch(doLogin(credential));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('Login')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('Or')}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              {t('Register here, if you not registered yet')}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              {formStatus === FAILED && <p className="text-red-600 p-3 bg-red-100 rounded mb-4">{formError}</p>}
            </div>

            <div>
              <TextInput
                id="email"
                name="email"
                type="email"
                label={t('Email')}
                required="true"
                inputRef={register({ required: { value: true, message: t('Email is required') } })}
                error={formErrors?.email}
              />
            </div>
            <div>
              <TextInput
                id="password"
                name="password"
                type="password"
                label={t('Password')}
                required="true"
                inputRef={register({ required: { value: true, message: t('Password is required') } })}
                error={formErrors?.password}
              />
            </div>

          </div>

          <div className="flex flex-row-reverse">
            <Button onClick={handleSubmit(submit)}>
              {t('Submit')}
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login;