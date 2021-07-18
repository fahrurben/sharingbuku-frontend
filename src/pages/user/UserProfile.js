import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import TextInput from '../../components/common/ui/form/TextInput';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/ui/Button';
import Select from '../../components/common/ui/form/Select';
import { fetchCities, resetProfileForm, setCities, updateProfile } from '../../redux/slices/profileSlice';
import { FAILED, SUCCEEDED } from '../../constant';
import DateInput from '../../components/common/ui/form/DateInput';
import { timeout } from '../../helpers/AjaxHelper';
import { IDLE } from '../../constant';
import ProfileSidebar from '../../components/common/ui/sidebar/ProfileSidebar';

function UserProfile() {
  const { control, register, setValue, handleSubmit, errors: formErrors } = useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const formStatus = useSelector((state) => state.profile.formStatus);
  const formError = useSelector((state) => state.profile.formError);
  const provinces = useSelector((state) => state.profile.provinces);
  const cities = useSelector((state) => state.profile.cities);
  const first_name = useSelector((state) => state.profile.first_name);
  const last_name = useSelector((state) => state.profile.last_name);
  const birthday = useSelector((state) => state.profile.birthday);
  const province = useSelector((state) => state.profile.province);
  const city = useSelector((state) => state.profile.city);
  const address = useSelector((state) => state.profile.address);
  const zip_code = useSelector((state) => state.profile.zip_code);

  const [cityDisabled, setCityDisabled] = React.useState(true);

  useEffect(() => {
    dispatch(resetProfileForm());
  }, []);

  useEffect(() => {
    setValue('first_name', first_name);
    setValue('last_name', last_name);
    setValue('birthday', new Date(birthday));
    setValue('province', province);
    setValue('city', city);
    setValue('address', address);
    setValue('zip_code', zip_code);
  }, [first_name, last_name, birthday, province, city, address, zip_code]);

  useEffect(() => {
    if (province !== null) {
      dispatch(fetchCities(province));
    }
  }, [province]);

  useEffect(() => {
    if (_.isArray(cities) && cities.length > 0) {
      setCityDisabled(false);
      setValue('city', city);
    } else {
      setCityDisabled(true);
    }
  }, [cities]);

  useEffect(() => {
    if (formStatus === SUCCEEDED) {
      toast.success(t('Profile updated'));
      timeout(2000).then(() => {
        dispatch(resetProfileForm());
        history.go(0);
      });
    }
  }, [formStatus]);

  function provinceOnChange(e) {
    let value = e.target.value;
    if (value === '') {
      dispatch(setCities([]));
    } else {
      dispatch(fetchCities(value));
    }
  }

  function submit(user) {
    dispatch(updateProfile(user));
  }

  return (
    <>
      <aside className="flex-initial w-60 hidden sm:block">
        <ProfileSidebar />
      </aside>
      <div className="flex-auto px-6">
        <div className="py-2 border-b mb-4">
          <h3 className="float-left text-2xl font-bold">My Profile</h3>
          <div className="clear-both">&nbsp;</div>
        </div>

        <div>
          <form>

            <div>
              {formStatus === FAILED && <p className="text-red-600 p-3 bg-red-100 rounded mb-4">{formError}</p>}
            </div>

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
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

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
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
            </div>
            {/* -- Form Row End -- */}

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
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

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
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
            </div>
            {/* -- Form Row End -- */}

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
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

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
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
            {/* -- Form Row End -- */}


            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <DateInput name="birthday" label="Birthday" control={control} id="birthday"
                           validationRules={{
                             required: { value: true, message: t('Birthday is required') },
                           }}
                           error={formErrors?.birthday}
                />
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-0">&nbsp;</div>
            </div>
            {/* -- Form Row End -- */}

            <div className="flex flex-row-reverse gap-x-2">
              <Button onClick={handleSubmit(submit)} disabled={formStatus !== IDLE}>
                {t('Submit')}
              </Button>

              <Button onClick={() => history.push('/')} type="secondary">
                {t('Cancel')}
              </Button>
            </div>
          </form>
        </div>
      </div>
     </>
  );
}

export default UserProfile;