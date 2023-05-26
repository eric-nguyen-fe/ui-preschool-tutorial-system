/* eslint-disable no-mixed-operators */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Login from './Login';

import ToastNotify from 'components/atoms/ToastNotify';
import Typography from 'components/atoms/Typography';

export type TypeForm =
  'login' |
  'register' |
  'profile' |
  'forgot'; // forgot password

interface RenderFormProps {
}

const RenderForm: React.FC<RenderFormProps> = ({
}) => {
  const navigator = useNavigate();

  const { t } = useTranslation();
  /* End APIs */
  const handleChangeFormForgot = () => {

  };

  const handleChangeFormRegister = () => {
    navigator('/authen/register');
  };
  return (
    <div className="t-form">
      <div className="t-form_heading">
        <Typography modifiers={['blackolive', 'uppercase', '32x36', 'center']}>
          {t('login.login') || ''}
        </Typography>
      </div>
      <Login
        handleChangeFormForgot={handleChangeFormForgot}
        handleChangeFormRegister={handleChangeFormRegister}
      />
      <ToastNotify />

    </div>
  );
};

RenderForm.defaultProps = {
};

export default RenderForm;
