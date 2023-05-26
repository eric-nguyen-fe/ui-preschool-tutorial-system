/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEqual } from 'date-fns';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
import Checkbox from 'components/atoms/Checkbox';
import MultiSelect, { Option } from 'components/atoms/DropDownCheckbox';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import Link from 'components/atoms/Link';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import PullDown, { OptionType } from 'components/molecules/PullDown';
import DatePickerCustom from 'components/organisms/DatePicker';
import Popup from 'components/organisms/Popup';
import { SeclectType } from 'services/types';
import { useAppSelector } from 'store/hooks';
import { TOKEN } from 'utils/constants';
import mapModifiers from 'utils/functions';

export interface PopupBookingProps {
  title?: string;
  isOpen?: boolean;
  handleClose?: () => void;
  btnText?: string;
  subBtnText?: string;
  handleConfirm?: () => void;
  handleSubBtn?: () => void;
  handleSelectStart?: (value: Date) => void;
  handleSelectEnd?: (value: Date) => void;
  start?: Date;
  end?: Date;
  date?: Date;
  handleChangeDate?: (value: Date) => void;
  optionList?: SeclectType[];
  select?: SeclectType;
  handleSelect?: (option: SeclectType) => void;
  handleChangeMulti?: (options: Option[]) => void;
  optionSelected?: Option[]
  onChangValue?: React.ChangeEventHandler<HTMLInputElement>;
  onChangValueName?: React.ChangeEventHandler<HTMLInputElement>;
  valueTest?: string
  options?: Option[];
  isbtn?: boolean
  isOpenCloseBtn?: boolean
  handleChangCheckbox?: () => void
  isChecked?: boolean
  value?: string
  isButtonLink?: boolean
  textButtonLink?: string
  valueName?: string
}

const PopupBooking: React.FC<PopupBookingProps> = ({
  title,
  isOpen = false,
  handleClose,
  btnText,
  handleConfirm,
  subBtnText,
  handleSubBtn,
  handleSelectStart,
  handleSelectEnd,
  start,
  end,
  date,
  handleChangeDate,
  optionList,
  handleSelect,
  select,
  optionSelected,
  handleChangeMulti,
  onChangValue,
  valueTest,
  options,
  isbtn,
  isOpenCloseBtn = false,
  handleChangCheckbox,
  isChecked,
  value,
  isButtonLink,
  textButtonLink,
  valueName,
  onChangValueName
}) => {
  const { t } = useTranslation();
  const Guest = localStorage.getItem(TOKEN);
  const user = useAppSelector((state) => state.user.infuser);

  const checkOverDurationTime = (start: Date, end: Date,) => ((new Date(start.getFullYear(), start.getMonth(), start.getDate(), user?.mintime, start.getMinutes(), 0).getTime() - 1) < new Date(start).getTime())
    && (new Date(end).getTime() < (new Date(end.getFullYear(), end.getMonth(), end.getDate(), user?.maxtime, end.getMinutes(), 0).getTime() + 1));

  return (
    <Popup
      isOpen={isOpen}
      handleClose={handleClose}
      closeName="close"
      sizeClose="24x24"
      variant="booking"
    >
      <div className="o-booking">
        <div className="o-booking_title">
          <div className="o-booking_title_desc">
            <Typography modifiers={['white', 'center', '700', '20x30', 'uppercase']} content={title} />

            {isOpenCloseBtn && (
              <div className="o-booking_title_desc_close" onClick={handleClose}>
                <Icon iconName="close" size="24x24" isPointer />
              </div>
            )}
          </div>
          <div className="o-booking_content">
            <div className="o-booking_time">
              <div className="o-booking_time_hours">
                <div className="o-booking_time_start">
                  <DatePickerCustom
                    selected={start || new Date()}
                    handleChange={(value) => {
                      if (handleSelectStart) {
                        handleSelectStart(value || new Date());
                      }
                    }}
                    label={t('popup.start') || ''}
                    iconName="clock"
                    size="21x21"
                  />
                </div>
                <div className="o-booking_time_end">
                  <DatePickerCustom
                    selected={end || new Date()}
                    handleChange={(value) => {
                      if (handleSelectEnd) {
                        handleSelectEnd(value || new Date());
                      }
                    }}
                    label={t('popup.end') || ''}
                    iconName="clock"
                    size="21x21"
                  />

                </div>
              </div>
              <div className="o-booking_time_days">
                <DatePickerCustom
                  selected={date}
                  isDate
                  handleChange={(value) => {
                    if (handleChangeDate) { handleChangeDate(value || new Date()); }
                  }}
                  iconName="calendar"
                  size="25x19"
                  label={`${t('popup.date')}` || ''}
                />
              </div>
            </div>

            <div className="o-booking_service">

              <Input value={valueName} onChange={onChangValueName} id="name" label="Visitor" variant="borderRadius" isRequire />
            </div>
            <div className="o-booking_detail">
              <Input value={valueTest} onChange={onChangValue} id="name" label={t('popup.detail') || ''} variant="borderRadius" isRequire />
            </div>
            <div className="o-booking-wrapperLink">
              <div className="o-booking_ggmeet">
                <Checkbox
                  isChecked={isChecked}
                  onChange={() => {
                    if (handleChangCheckbox) {
                      handleChangCheckbox();
                    }
                  }}
                />

                <div className={mapModifiers('o-booking_ggmeet-input', isChecked && 'active')}>
                  <Input readOnly id="ggmeet" value={value} label="Create Edu link:" />
                  <CopyToClipboard text={`${value && value}`}>
                    <Typography type="span">
                      <Icon iconName="copy" />
                    </Typography>

                  </CopyToClipboard>
                </div>

              </div>
              <div className="o-booking-wrapperLink_button">
                {value && isChecked && isButtonLink && (
                  <Button
                    modifiers={['primary']}
                    onClick={() => {
                      window.open(`${value}`);
                    }}
                  >
                    <Icon iconName="duliArrow" size="24x24" />
                    <Typography modifiers={['700', '16x24']}>
                      {textButtonLink}
                    </Typography>
                  </Button>
                )}

              </div>
            </div>
          </div>
        </div>
        <div className="o-booking_btn">
          {subBtnText && (
            <Button
              modifiers={['columbia-blue']}
              onClick={() => {
                if (handleClose) handleClose();
                if (handleSubBtn) handleSubBtn();
              }}
            >
              <Typography content={subBtnText} modifiers={['700', '16x24', 'uppercase']} />
            </Button>
          )}
          {btnText && isbtn && (
            <Button
              modifiers={['primary']}
              onClick={() => {
                if (valueTest?.trim() === '') {
                  return toast.error(t('notify.booking_department_option') || '');
                }
                if (valueName?.trim() === '') {
                  return toast.error(t('notify.booking_department_option') || '');
                }
                if (handleClose) handleClose();
                if (handleConfirm) handleConfirm();
              }}
              type="submit"
            >
              <Typography content={btnText} modifiers={['700', '16x24', 'uppercase']} />
            </Button>
          )}
        </div>
      </div>
    </Popup>
  );
};

PopupBooking.defaultProps = {
};

export default React.memo(PopupBooking);
