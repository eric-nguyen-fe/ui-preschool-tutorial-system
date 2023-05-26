/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import logo from 'assets/images/logo.png';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import CardNotifyList, { NewsListCardProps } from 'components/molecules/CardNotifyList';
import Dropdown, { OptionsChild } from 'components/molecules/Dropdown';
import useClickOutside from 'hooks/useClickOutside';
import { OptionDept } from 'services/Login/types';
import { getNotification, updateNotification, updateNotificationSeenAll } from 'services/notification';
import { User } from 'services/types';
import { department } from 'store/department';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAllUserAction, getUserAction } from 'store/infouser';
import { TOKEN } from 'utils/constants';
import mapModifiers from 'utils/functions';

export type ResponseSearch = {
  id_derp: number;
  id_user?: number;
  label?: string;
  value?: number;
};
interface HeaderProps {
  optionsProfile?: OptionsChild[];
  handleClickProfile?: (option: OptionsChild) => void;
  iconNameProfile?: string;
  nameUser?: string;
  CardList?: NewsListCardProps[],
  deptBtn: string;
  optionsLanguage?: OptionsChild[];
  handleChangeLanguage?: (option: OptionsChild) => void;
  iconNameLanguage?: string;
  nameLanguage?: string;
  headerData?: { id: number, name: string, slug?: string }[];
  numberNotifi?: number
  toggleShowMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  optionsProfile,
  toggleShowMenu,
  optionsLanguage,
  handleChangeLanguage,
  iconNameLanguage,
  nameLanguage,
  handleClickProfile,
  iconNameProfile,
  nameUser,
  CardList,
  deptBtn,
  headerData,
  numberNotifi = 0

}) => {
  const Guest = localStorage.getItem(TOKEN);
  const [isOpenNotify, setisShowNotify] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const refSearch = useRef<HTMLDivElement>(null);
  const [isOpenBoxSearch, setIsOpenBoxSearch] = useState(false);
  const user = useAppSelector((state) => state.user.infuser);
  const [userData, setUserData] = useState(user);
  const [numNotifi, SetnumNotifi] = useState(numberNotifi);

  useClickOutside(refSearch, () => {
    if (isOpenBoxSearch) setIsOpenBoxSearch(false);
  });
  useEffect(() => {
    dispatch(getAllUserAction());
  }, []);

  useEffect(() => {
    SetnumNotifi(numberNotifi);
  }, [numberNotifi]);

  useEffect(() => {
    if (Guest !== 'GUEST') {
      setUserData(user);
    } else {
      setUserData({} as User);
    }
  }, [user, Guest]);

  useClickOutside(dropdownRef, () => {
    if (isOpenNotify) setisShowNotify(false);
  });
  const { mutate: putNotifySeenAll } = useMutation(
    'put-notifiwatch',
    (id: number) => updateNotificationSeenAll(id),
    {
      onSuccess: () => {
        getNotification(Number(userData?.id_user));
      },
      onError: () => {
      }
    }
  );
  const toggling = () => {
    setisShowNotify(!isOpenNotify);
  };

  return (
    <div className="t-header">
      <div className="t-header_wrapperTootal">
        <div className="t-header-wrapper">
          <div className="t-header-wrapper_left">
            <div
              className="t-header-wrapper_left-toggle"
              onClick={() => {
                if (toggleShowMenu) {
                  toggleShowMenu();
                }
              }}
            >
              <Icon iconName="hamburger" isPointer />
            </div>

            <Link href="/">
              <div
                className="t-header-wrapper_left-name"
                onClick={() => {
                  dispatch(getUserAction(Number(user?.id_user) || 0));
                  dispatch(department(user?.departments[0] as OptionDept));
                  sessionStorage.setItem('id_sidebar', (0).toString());
                }}
              >
                <img src={logo} />
              </div>
            </Link>
          </div>
          <div className="t-header-wrapper_right">
            <div className="t-header-wrapper_right-language t-header-wrapper_right_item">
              <Dropdown
                optionsChild={optionsLanguage || []}
                handleClick={handleChangeLanguage}
                typeDropdown="dropDown"
                iconName={iconNameLanguage}
                name={nameLanguage}
              />
            </div>
            <div className="t-header-wrapper_right-notify t-header-wrapper_right_item" ref={dropdownRef} onClick={() => { setisShowNotify(!isOpenNotify); toggling(); }}>
              <Icon iconName="bell" isPointer />
              {numNotifi > 0
                && <span className="icon-button__badge">{numNotifi}</span>}
              {isOpenNotify && (
                <CardNotifyList
                  title={t('notify.notify')}
                  notifyList={CardList}
                  handleClickDoneAll={() => putNotifySeenAll(Number(userData?.id_user))}
                />
              )}
            </div>
            <div className="t-header-wrapper_right-profile t-header-wrapper_right_item">
              <Dropdown
                optionsChild={optionsProfile || []}
                handleClick={handleClickProfile}
                typeDropdown="menu"
                iconName={iconNameProfile}
                isAvatar={!!userData?.image_url}
                img={userData?.image_url}
                name={nameUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {
};

export default Header;
