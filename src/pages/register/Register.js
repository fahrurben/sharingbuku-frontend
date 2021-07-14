import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import TextInput from '../../components/common/ui/form/TextInput';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/ui/Button';
import Select from '../../components/common/ui/form/Select';
import { fetchCities, fetchProvinces, registerUser, resetForm, setCities } from '../../redux/slices/registerSlice';
import { FAILED, SUCCEEDED } from '../../constant';
import DateInput from '../../components/common/ui/form/DateInput';
import { timeout } from '../../helpers/AjaxHelper';
import { IDLE } from '../../constant';

function Register() {
  const { control, register, getValues, handleSubmit, errors: formErrors } = useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [cityDisabled, setCityDisabled] = React.useState(true);

  const formStatus = useSelector((state) => state.register.formStatus);
  const formError = useSelector((state) => state.register.formError);
  const provinces = useSelector((state) => state.register.provinces);
  const cities = useSelector((state) => state.register.cities);

  function submit(user) {
    dispatch(registerUser(user));
  }

  useEffect(() => {
    dispatch(fetchProvinces());
  }, []);

  useEffect(() => {
    if (formStatus === SUCCEEDED) {
      toast.success(t('Register success'));
      timeout(1000).then(() => {
        dispatch(resetForm());
        history.push('/login');
      });
    }
  }, [formStatus]);

  useEffect(() => {
    if (_.isArray(cities) && cities.length > 0) {
      setCityDisabled(false);
    } else {
      setCityDisabled(true);
    }
  }, [cities]);

  function provinceOnChange(e) {
    let value = e.target.value;
    if (value === '') {
      dispatch(setCities([]));
    } else {
      dispatch(fetchCities(value));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('Register')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('Or')}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              {t('Sign in Here, if already registered')}
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
                id="first_name"
                name="first_name"
                type="first_name"
                label={t('First Name')}
                required="true"
                inputRef={register({ required: { value: true, message: t('First Name is required') } })}
                error={formErrors?.first_name}
              />
            </div>
            <div>
              <TextInput
                id="last_name"
                name="last_name"
                type="last_name"
                label={t('Last Name')}
                required="true"
                inputRef={register({ required: { value: true, message: t('Last Name is required') } })}
                error={formErrors?.last_name}
              />
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
            <div>
              <TextInput
                id="repassword"
                name="repassword"
                type="password"
                label={t('Password Confirmation')}
                required="true"
                inputRef={register({
                  required: { value: true, message: t('Password Confirmation is required') },
                  validate: (repassword) => repassword === getValues('password') || t('Password Confirmation must be same with password')
                })}
                error={formErrors?.repassword}
              />
            </div>
            <div>
              <DateInput name="birthday" label="Birthday" control={control} id="birthday"
                         validationRules={{
                           required: { value: true, message: t('Birthday is required') },
                         }}
                         error={formErrors?.birthday}
              />
            </div>
            <div>
              <TextInput
                id="address"
                name="address"
                type="text"
                label={t('Address')}
                required="true"
                inputRef={register({ required: { value: true, message: t('Address is required') } })}
                error={formErrors?.address}
              />
            </div>
            <div>
              <Select
                id="province"
                name="province"
                label={t('Province')}
                placeholder="- Province -"
                inputRef={register({ required: { value: true, message: t('Province is required') } })}
                options={provinces}
                error={formErrors?.province}
                onChange={provinceOnChange}
              />
            </div>
            <div>
              <Select
                id="city"
                name="city"
                label={t('City')}
                placeholder="- City -"
                inputRef={register({ required: { value: true, message: t('City is required') } })}
                options={cities}
                error={formErrors?.city}
                disabled={cityDisabled}
              />
            </div>
            <div>
              <TextInput
                id="zip_code"
                name="zip_code"
                type="text"
                label={t('Zip Code')}
                required="true"
                inputRef={register({ required: { value: true, message: t('Zip Code is required') } })}
                error={formErrors?.zip_code}
              />
            </div>

          </div>

          <div className="flex flex-row-reverse">
            <Button onClick={handleSubmit(submit)} disabled={formStatus !== IDLE} isFull={true}>
              {t('Register')}
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register