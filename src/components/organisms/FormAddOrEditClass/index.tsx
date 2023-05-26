/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import CSelect from '../CSelect';

import { CurrencyUnit } from 'assets/fakeData';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import PullDown, { OptionType } from 'components/molecules/PullDown';
import { SeclectType } from 'services/types';

interface IFormInput {
  class_name: string;
  tutor: string;
  student: string;
  lesson: number;
  hour: number;
  payment: string
  note: string
}

interface FormAddOrEditClassProps {
  subBtnText?: string;
  btnText?: string;
  handleClose?: () => void;
}

const FormAddOrEditClass: React.FC<FormAddOrEditClassProps> = ({
  subBtnText, btnText, handleClose
}) => {
  const formSchema = Yup.object().shape({
    class_name: Yup.string(),
    tutor: Yup.string(),
    student: Yup.string(),
    lesson: Yup.number(),
    hour: Yup.number(),
    payment: Yup.string(),
    note: Yup.string(),
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
    <div className="o-form_class">
      <div className="o-form_class_wrap">
        <Input
          id="class_name"
          label="Class name"
          placeholder="Enter your name"
          variant="borderRadius"
          {...register('class_name')}
          error={errors.class_name?.message}
          isRequire
        />
        <div className="o-form_class_wrap_flex">
          <Input
            id="tutor"
            label="Tutor"
            placeholder="Enter your name"
            variant="borderRadius"
            {...register('tutor')}
            error={errors.tutor?.message}
          />
          <Input
            id="student"
            label="Student"
            placeholder="Enter your name"
            variant="borderRadius"
            {...register('student')}
            error={errors.student?.message}
          />
        </div>
        <div className="o-form_class_wrap_flex">
          <Input
            id="lesson"
            label="Lesson amount"
            placeholder="Enter your name"
            variant="borderRadius"
            {...register('lesson')}
            error={errors.lesson?.message}
          />
          <Input
            id="hour"
            label="Hour"
            placeholder="Enter your name"
            variant="borderRadius"
            {...register('hour')}
            error={errors.hour?.message}
          />
        </div>
        <div className="o-form_class_wrap_flex o-form_class_wrap_payment">
          <Input
            id="lesson"
            label="Payment"
            placeholder=""
            variant="borderRadius"
            type="text"
            {...register('lesson')}
            error={errors.lesson?.message}
            defaultValue="3,699,000"
            onChange={(e) => e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // input = '"1234567890"; // output: "1,234,567,890"
              .split('')
              .reverse()
              .join('')
              .replace(/^,/, '')
              .replace(/(^|,)(\d{1,3})$/, (match, p1, p2) => p2 + p1)}
          />

          <CSelect optionData={CurrencyUnit} />
        </div>
        <TextArea id="" readOnly={false} label="Class description" />
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

FormAddOrEditClass.defaultProps = {
};

export default FormAddOrEditClass;
