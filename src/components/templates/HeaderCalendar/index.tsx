/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'moment-timezone';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CalendarViews, { OptionViews } from 'components/molecules/CalendarViews';
import DuarationView from 'components/molecules/DuarationView';
import { setDateDefault } from 'store/department';
import { incrementSetViewCalendar, isView } from 'store/example';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import mapModifiers from 'utils/functions';

interface HeaderCalendarProps {
  [x: string]: any;
}

const HeaderCalendar: React.FC<HeaderCalendarProps> = (toolbar) => {
  const {
    label, view, onView, onNavigate
  } = toolbar;
  const { t } = useTranslation();
  const isShowSideBar = useAppSelector((state) => state.example.isShowSideBar);
  const [width, setWidth] = useState(window.innerWidth);

  const dispatch = useAppDispatch();

  const optionsViews = [
    { id: 3, view: t('homepage.daily'), value: 'day' },
    { id: 1, view: t('homepage.weekly'), value: 'week' },
    { id: 2, view: t('homepage.monthly'), value: 'month' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChangView = (item: OptionViews) => {
    onView(item.value || '');
  };

  return (
    <div className={mapModifiers('t-header-calendar', isShowSideBar && 'showbar')}>
      <div className="t-header-calendar_item item_left">
        <div className="t-header-calendar_item_duration">
          <DuarationView
            duarationTime={label}
            onClickNext={() => {
              onNavigate('NEXT');
            }}
            onClickPrev={() => {
              onNavigate('PREV');
            }}
          />
        </div>
      </div>
      <div className="t-header-calendar_item item_right">
        <CalendarViews
          optionViews={optionsViews}
          viewActive={view}
          onChangeView={(handleChangView)}
        />
      </div>
    </div>

  );
};

HeaderCalendar.defaultProps = {
};

export default React.memo(HeaderCalendar);
