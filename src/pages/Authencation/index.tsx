/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import login1 from 'assets/images/login1.png';
import login2 from 'assets/images/login2.png';
import login3 from 'assets/images/login3.png';
import login4 from 'assets/images/login4.png';
import logo from 'assets/images/logo.png';
import Dropdown, { OptionsChild } from 'components/molecules/Dropdown';
import Container from 'components/organisms/Container';
import { optionsLanguage } from 'components/templates/MainLayout';
import RenderForm from 'components/templates/RenderForm';
import i18n from 'i18n';
import { increment } from 'store/example';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { USER_LOGIN } from 'utils/constants';

const slider = [login1, login2, login3, login4];

const Authencation: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.example.language);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(USER_LOGIN)) {
      navigator('/');
    }
  }, []);
  const handleChangeLang = (option: OptionsChild) => {
    i18n.changeLanguage(option.acronym);
    dispatch(increment(option));
    sessionStorage.setItem('currLanguage', JSON.stringify(option));
  };
  useEffect(() => {
    if (language.acronym !== 'KO') {
      document.body.style.fontFamily = 'Noto Sans,sans-serif';
    } else {
      document.body.style.fontFamily = 'Noto Sans KR,sans-serif';
    }
  }, [language]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < 3) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [index]);
  return (
    <div className="p-anthencation">
      <Container modifiers={['form']}>
        <div className="p-anthencation_language">
          <Dropdown
            optionsChild={optionsLanguage || []}
            handleClick={(item) => handleChangeLang(item)}
            typeDropdown="dropDown"
            iconName={language.IconName}
            name={language.acronym}
          />
        </div>
        <div className="p-anthencation_right">
          <RenderForm />
        </div>
        <div className="p-anthencation_left">
          <div className="p-anthencation_left_wrap" />
          <div className="p-anthencation_left_item">
            <div className="p-anthencation_left_item_logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="p-anthencation_left_item_slide">
              <img src={slider[index]} alt="logo" />
            </div>
          </div>
        </div>

      </Container>
      <span className="p-anthencation_neumorphism size-sm" />
      <span className="p-anthencation_neumorphism size-md" />
      <span className="p-anthencation_neumorphism size-lg" />
    </div>
  );
};

export default Authencation;
