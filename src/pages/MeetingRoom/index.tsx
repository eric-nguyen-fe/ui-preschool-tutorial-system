/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import person from 'assets/images/young-student.png';
import Typography from 'components/atoms/Typography';
import MainLayout from 'components/templates/MainLayout';
import mapModifiers from 'utils/functions';

// type MeetingStatus = 'Occupied' | 'Stand by' | 'Waiting';

const MeetingRoom: React.FC = () => {
  const [idHover, setIdHover] = useState(0);
  const [result, setResult] = useState('');
  const [data, setData] = useState<number[]>();
  const [types, setTypes] = useState('');
  const { t } = useTranslation();
  const dataMeeting = [
    {
      id: 1, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling1', status: 'Occupied', state: t('class_chat.room_status_waiting') || ''
    },
    {
      id: 2, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling2', status: 'Occupied', state: t('class_chat.room_status_waiting') || ''
    },
    {
      id: 3, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling3', status: 'Waiting', state: t('class_chat.room_status_waiting') || ''
    },
    {
      id: 4, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling4', status: 'Waiting', state: t('class_chat.room_status_waiting') || ''
    },
    {
      id: 5, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling5', status: 'Waiting', state: t('class_chat.room_status_waiting') || ''
    },
    {
      id: 6, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling6', status: 'Waiting', state: t('class_chat.room_status_waiting') || ''
    },
    {
      id: 7, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling7', status: 'Waiting', state: t('class_chat.room_status_waiting') || ''
    },
    {
      id: 8, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling8', status: 'Waiting', state: t('class_chat.room_status_waiting') || ''
    },
    {
      id: 9, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling9', status: 'Waiting', state: t('class_chat.room_status_waiting') || ''
    },
    {
      id: 10, name: t('class_chat.room_title') || '', slug: 'https://meet.remotedu.castis.io/counseling10', status: 'Waiting', state: t('class_chat.room_status_waiting') || ''
    },
  ];
  const HandleOMouseHover = (item: number) => {
    setIdHover(item);
  };
  const HandleOMouseLeave = (item: number) => {
    setIdHover(0);
  };

  const CallResult = async () => {
    try {
      const response = await fetch('http://meet.remotedu.castis.io/result.html');
      // const response = await fetch('/sampleText.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.text();
      const htmlData = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlData, 'text/html');
      const data = doc.body.textContent?.trim() || '';

      setResult(data);
    } catch (error) {
      console.log('🚀- DaiNQ - 🚀: -> CallResult -> error:', error);
    }
  };

  // Set up a status value to check the rooms condition then inactivate room link
  // Make a new status value named 'isDataReady' to check if the data is ready to use
  // initial value = false, when data is ready, set isDataReady to true
  const [isDataReady, setIsDataReady] = useState(false);
  useEffect(() => {
    if (data) {
      setIsDataReady(true);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(CallResult, 2000); // Gọi lại hàm mỗi 5 giây
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const arr = result.split(',').map((num) => parseInt(num, 10)).slice(0, 10);
    // const arr = result.split(',').map(Number).slice(0, 10); // Cắt chuỗi, chuyển về số và lấy 10 phần tử đầu tiên
    setData(arr);
  }, [result]);

  const handleRetrunText = (val: number) => {
    if (typeof data !== 'undefined') {
      const check = data[val - 1];
      switch (check) {
        case 0: return 'Empty';
        case 1: return 'Waiting';
        case 2: return 'Occupied';
      }
    }
  };

  return (
    <MainLayout>
      <div className="p-meeting">
        <div className="p-meeting_ui">
          <div className="p-meeting_ui_text">
            <Typography content="Education<br/>Counseling" type="p" modifiers={['capitalize', 'goldenrod']} />
            <Typography content="Top teachers on your desk" type="span" modifiers={[]} />
          </div>
          <div className="p-meeting_img">
            <div className="p-meeting_img_wrap">
              <img src={person} alt="" />
            </div>
          </div>
        </div>
        <div className="p-meeting_room">
          <div className="p-meeting_room_wrap">
            {dataMeeting.length && dataMeeting.map((item) => (
              // isDataReady 와 handleReturnText(item.id) !== "Occupied" 둘 다 true 일 때만 링크가 활성화됨
              // If one of condition returns false then set up item.slug to '#'
              <a
                href={isDataReady || handleRetrunText(item.id) !== 'Occupied' ? item.slug : '#'}
                onClick={(e) => {
                  if (!isDataReady || handleRetrunText(item.id) === 'Occupied') {
                    e.preventDefault();
                  }
                }}
                key={item.id}
                id={item.id.toString()}
                className={mapModifiers(
                  'p-meeting_room_wrap_item',
                  idHover === item.id
                  && handleRetrunText(item.id)?.toLowerCase().toString() !== 'occupied'
                  && 'hover',
                  handleRetrunText(item.id)?.toLowerCase().toString() === 'occupied' && 'disable'
                )}
                onMouseEnter={() => HandleOMouseHover(item.id)}
                onMouseLeave={() => HandleOMouseLeave(item.id)}
              >
                <Typography type="p" content={item.name} />
                <div className="p-meeting_room_wrap_item_state">
                  <span className={handleRetrunText(item.id)?.toString().replace(/\s+/g, '').toLowerCase()}>
                    {handleRetrunText(item.id)?.toLowerCase().toString() === 'empty' && <p>{t('class_chat.room_status_waiting') || ''}</p>}
                    {handleRetrunText(item.id)?.toLowerCase().toString() === 'waiting' && <p>{t('class_chat.room_status_standby') || ''}</p>}
                    {handleRetrunText(item.id)?.toLowerCase().toString() === 'occupied' && <p>{t('class_chat.room_status_busy') || ''}</p>}
                  </span>
                  <div className="p-meeting_room_wrap_item_state_rate">
                    <span className="pp">no</span>
                    {`#${item.id}`}
                  </div>
                </div>
                {idHover === item.id && handleRetrunText(item.id)?.toLowerCase().toString() !== 'occupied' && (<div className={mapModifiers('p-meeting_room_wrap_item_hover', handleRetrunText(item.id)?.toString().replace(/\s+/g, '').toLowerCase())} />)}
                {handleRetrunText(item.id)?.toLowerCase().toString() === 'occupied' && (<div className={mapModifiers('p-meeting_room_wrap_item_disable')}><Typography type="p" content={t('class_chat.room_status_busy') || ''} modifiers={['white', 'uppercase']} /></div>)}
              </a>
            ))}
          </div>
        </div>
        <span className="p-meeting_circle1" />
        <span className="p-meeting_circle2" />
        <span className="p-meeting_circle3" />
        <span className="p-meeting_circle4" />
      </div>
    </MainLayout>
  );
};

export default MeetingRoom;
