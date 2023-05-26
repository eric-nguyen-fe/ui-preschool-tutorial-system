/* eslint-disable import/no-extraneous-dependencies */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import Popup from '../Popup';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';

interface IFormInput {
  user_name: string;
  birthday: string;
  grade: string;
  phone: string;
  userId: string;
  email: string
  password: string
  confirm_password: string
}
interface ValueDefaul {
   user_name: string;
  birthday: string;
  grade: string;
  phone: string;
  userId: string;
  email: string
  password: string
}

interface PopupEditStudentProps {
    title?: string;
    isOpen: boolean;
    handleClose: ()=>void;
    handleSubBtn?: () => void
    subBtnText?: string
    btnText?: string
    valueDefaul?: ValueDefaul
}

const PopupEditStudent: React.FC<PopupEditStudentProps> = ({
 title,
handleClose,
isOpen,
handleSubBtn,
subBtnText,
btnText, valueDefaul
}) => {
  const { t } = useTranslation();

 const formSchema = Yup.object().shape({
    password: Yup.string()
      .required(t('validate.password_required') || '')
      .min(6, t('validate.minimun_char') || '')
      .max(20, t('validate.password_max') || ''),
    confirm_password: Yup.string()
      .required(t('validate.password_required') || '')
      .oneOf([Yup.ref('password')], t('validate.password_match') || ''),
    user_name: Yup.string()
      .required(t('validate.user_id_required') || '')
      .min(6, t('validate.minimun_char') || '')
      .max(20, t('validate.user_id_max') || ''),
    grade: Yup.string()
      .required(t('validate.user_id_required') || '')
      .min(6, t('validate.minimun_char') || '')
      .max(20, t('validate.user_id_max') || ''),
    userId: Yup.string()
      .required(t('validate.user_id_required') || '')
      .min(6, t('validate.minimun_char') || '')
      .max(20, t('validate.user_id_max') || ''),
    phone: Yup.string()
      .required(t('validate.email_required') || '')
      .matches(/^\+?[0-9]{3}-?[0-9](-[0-9]+)+$/, t('validate.email_match') || ''),
    email: Yup.string()
      .required(t('validate.email_required') || '')
      .email(t('validate.email_pattern') || ''),
  });
    const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset
  } = useForm<IFormInput>(formOptions);
  const onSubmit = () => {

  };
  useEffect(() => {
    setFocus('user_name');
  }, [setFocus]);
  return (
    <div className="o-popupStudent">
      <Popup
        isOpen={isOpen}
        handleClose={() => {
          handleClose();
          reset();
        }}
        sizeClose="24x24"
        variant="addstudent"
      >
        <div className="o-popupStudent_title">
          <Typography
            type="h1"
            modifiers={['white', 'center', '500', '20x26', 'uppercase']}
            content={title}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="o-popupStudent_form">
            <div className="o-popupStudent_form-left">
              <div className="o-popupStudent_form-text">
                <Typography type="span" modifiers={['16x21', '500', 'crayola']}>
                  Student
                </Typography>
              </div>
              <Input
                id="user_name"
                label="Student Name"
                {...register('user_name')}
                error={errors.user_name?.message}
                value={valueDefaul?.user_name}
                isRequire
              />
              <Input
                id="birthday"
                label="Birthday"
                {...register('birthday')}
                error={errors.birthday?.message}
                value={valueDefaul?.birthday}
              />
              <Input
                id="grade"
                label="Grade"
                {...register('grade')}
                error={errors.grade?.message}
                isRequire
                value={valueDefaul?.grade}
              />
              <Input
                id="phone"
                label="Phone"
                {...register('phone')}
                error={errors.phone?.message}
                isRequire
                value={valueDefaul?.phone}
              />
            </div>
            <div className="o-popupStudent_form-right">
              <div className="o-popupStudent_form-text">
                <Typography type="span" modifiers={['16x21', '500', 'crayola']}>
                  Account
                </Typography>
              </div>
              <Input
                id="userId"
                label="UserID"
                {...register('userId')}
                error={errors.userId?.message}
                isRequire
                value={valueDefaul?.userId}
              />
              <Input
                id="email"
                label="Email"
                {...register('email')}
                error={errors.email?.message}
                isRequire
                value={valueDefaul?.email}
              />
              <Input
                id="password"
                isPassword
                type="password"
                label="Password"
                {...register('password')}
                error={errors.password?.message}
                isRequire
                value={valueDefaul?.password}
              />
              <Input
                id="confirm_password"
                type="password"
                isPassword
                label="Confirm Password"
                {...register('confirm_password')}
                error={errors.confirm_password?.message}
                value={valueDefaul?.password}
                isRequire
              />
            </div>
          </div>
          <div className="o-booking_btn">
            {subBtnText && (
            <Button
              modifiers={['columbia-blue']}
              onClick={() => {
                reset();
                if (handleClose) handleClose();
                if (handleSubBtn) handleSubBtn();
              }}
            >
              <Typography content={subBtnText} modifiers={['700', '16x24', 'uppercase']} />
            </Button>
          )}
            {btnText && (
            <Button
              modifiers={['primary']}
              type="submit"
            >
              <Typography content={btnText} modifiers={['700', '16x24', 'uppercase']} />
            </Button>
          )}
          </div>
        </form>
      </Popup>
    </div>
);
};

PopupEditStudent.defaultProps = {
};

export default PopupEditStudent;
