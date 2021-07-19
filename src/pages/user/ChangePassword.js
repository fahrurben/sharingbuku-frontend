import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextInput from '../../components/common/ui/form/TextInput';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/ui/Button';
import { FAILED, SUCCEEDED } from '../../constant';
import { timeout } from '../../helpers/AjaxHelper';
import { IDLE } from '../../constant';
import ProfileSidebar from '../../components/common/ui/sidebar/ProfileSidebar';
import { doChangePassword, resetForm } from '../../redux/slices/changePasswordSlice';

function ChangePassword() {
  const { register, getValues, handleSubmit, errors: formErrors } = useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const formStatus = useSelector((state) => state.changePassword.formStatus);
  const formError = useSelector((state) => state.changePassword.formError);

  useEffect(() => {
    if (formStatus === SUCCEEDED) {
      toast.success(t('Password updated'));
      timeout(2000).then(() => {
        dispatch(resetForm());
        history.go(0);
      });
    }
  }, [formStatus]);

  function submit(credentials) {
    dispatch(doChangePassword(credentials));
  }

  return (
    <>
      <aside className="flex-initial w-60 hidden sm:block">
        <ProfileSidebar />
      </aside>
      <div className="flex-auto px-6">
        <div className="py-2 border-b mb-4">
          <h3 className="float-left text-2xl font-bold">Change Password</h3>
          <div className="clear-both">&nbsp;</div>
        </div>

        <div>
          <form>

            <div>
              {formStatus === FAILED && <p className="text-red-600 p-3 bg-red-100 rounded mb-4">{formError}</p>}
            </div>

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
                <TextInput
                  id="old_password"
                  name="old_password"
                  type="password"
                  label={t('Old Password')}
                  required="true"
                  inputRef={register({ required: { value: true, message: t('Old Password is required') } })}
                  error={formErrors?.old_password}
                />
            </div>
            {/* -- Form Row End -- */}

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <TextInput
                id="new_password"
                name="new_password"
                type="password"
                label={t('Password')}
                required="true"
                inputRef={register({ required: { value: true, message: t('Password is required') } })}
                error={formErrors?.new_password}
              />
            </div>
            {/* -- Form Row End -- */}

            {/* -- Form Row -- */}
            <div className="-mx-3 md:flex mb-6">
              <TextInput
                id="new_password_repeat"
                name="new_password_repeat"
                type="password"
                label={t('Re-Password')}
                required="true"
                inputRef={register({validate: {
                  matchesPreviousPassword: (value) => {
                    const { new_password } = getValues();
                    return new_password === value || t('Re-Password and Password should match!');
                  }}})}
                error={formErrors?.new_password_repeat}
              />
            </div>
            {/* -- Form Row End -- */}

            <div className="flex flex-row-reverse gap-x-2">
              <Button onClick={handleSubmit(submit)}  disabled={formStatus !== IDLE}>
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

export default ChangePassword;