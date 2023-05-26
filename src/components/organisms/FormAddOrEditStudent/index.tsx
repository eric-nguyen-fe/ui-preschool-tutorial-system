/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';

interface IFormInput {
  user_id: string;
  email: string;
  passowrds: string;
  confirm_pass: string;
  student_name: string;
  student_phone: string
  birthDay: string;
  parent: string;
  parent_phone: string;
  grade: string
}

interface FormAddOrEditStudentProps {
  subBtnText?: string;
  btnText?: string;
  handleClose?: () => void;
}

const FormAddOrEditStudent: React.FC<FormAddOrEditStudentProps> = ({
  subBtnText, btnText, handleClose
}) => {
  const formSchema = Yup.object().shape({
    user_id: Yup.string(),
    email: Yup.string(),
    passowrds: Yup.string(),
    confirm_pass: Yup.string(),
    student_name: Yup.string(),
    student_phone: Yup.string(),
    BirthDay: Yup.string(),
    parent: Yup.string(),
    parent_phone: Yup.string(),
    grade: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IFormInput>(formOptions);
  const onSubmit = () => {

  };
  return (
    <div className="o-form_student">
      <div className="o-form_student_wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="o-form_student_wrapper_account">
            <Input
              id="user_id"
              label="User ID"
              variant="borderRadius"
              {...register('user_id')}
              error={errors.user_id?.message}
              isRequire
            />
            <Input
              id="email"
              label="email"
              variant="borderRadius"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              id="passowrds"
              label="passowrd"
              type="password"
              isPassword
              variant="borderRadius"
              {...register('passowrds')}
              error={errors.passowrds?.message}
              isRequire
            />
            <Input
              id="confirm_pass"
              type="password"
              variant="borderRadius"
              isPassword
              label="confirm password"
              {...register('confirm_pass')}
              error={errors.confirm_pass?.message}
              isRequire
            />
          </div>
          <div className="o-form_student_wrapper_student">
            <Input
              id="student_name"
              label="Student name"
              placeholder="Enter student name"
              variant="borderRadius"
              {...register('student_name')}
              error={errors.student_name?.message}
              isRequire
            />
            <Input
              id="parent"
              label="Parent"
              placeholder="Enter mother or father name"
              variant="borderRadius"
              {...register('parent')}
              error={errors.parent?.message}
            />
            <Input
              id="student_phone"
              label="Phone"
              variant="borderRadius"
              placeholder="Enter student phone"
              {...register('student_phone')}
              error={errors.student_phone?.message}
            />
            <Input
              id="parent_phone"
              label="Parent's Phone"
              placeholder="Enter parent phone"
              variant="borderRadius"
              {...register('parent_phone')}
              error={errors.parent_phone?.message}
            />
            <Input
              id="birthDay"
              label="Birthday"
              placeholder="dd/mm/yyyy"
              variant="borderRadius"
              {...register('birthDay')}
              error={errors.birthDay?.message}
            />
            <Input
              id="grade  "
              label="Grade"
              variant="borderRadius"
              {...register('grade')}
              error={errors.grade?.message}
            />
          </div>
        </form>
        <div className="o-form_student_wrapper_button">
          <Button
            modifiers={['columbia-blue']}
            onClick={handleClose}
          >
            <Typography content={subBtnText} modifiers={['700', '16x24', 'uppercase']} />
          </Button>
          <Button
            modifiers={['primary']}
            onClick={handleClose}
            type="submit"
          >
            <Typography content={btnText} modifiers={['700', '16x24', 'uppercase']} />
          </Button>
        </div>
      </div>
    </div>
  );
};

FormAddOrEditStudent.defaultProps = {
};

export default FormAddOrEditStudent;
