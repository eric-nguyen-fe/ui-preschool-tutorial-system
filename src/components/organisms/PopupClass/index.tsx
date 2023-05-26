/* eslint-disable import/no-extraneous-dependencies */
import { Progress, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

import Typography from 'components/atoms/Typography';
import Popup from 'components/organisms/Popup';

interface DataTypepopup {
  classname: string;
  tutor: string;
  current: number
  endClass: number
  dateCreated: string
}

interface PopupClassProps {
     isOpen: boolean;
  handleClose: () => void;
  title?: string;
  data: DataTypepopup[]

}
const PopupClass: React.FC<PopupClassProps> = ({
  title,
  isOpen,
  handleClose,
  data
}) => {
    const columns: ColumnsType<DataTypepopup> = [
  {
    title: 'Class Name',
    dataIndex: 'classname',
    key: 'classname',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Tutor',
    dataIndex: 'tutor',
    key: 'tutor',
  },

  {
    title: 'Completed',
    dataIndex: '',
    key: 'email',
    render: (text, record) => (
      <div>
        {record.current }
        /
        {' '}
        {record.endClass}
        <Progress percent={Number(record.current / record.endClass * 100)} size="small" />
      </div>
),
  },

  {
    title: 'Created Date',
    dataIndex: 'dateCreated',
    key: 'dateCreated',
  },
];

  return (
    <div className="t-popupClass">
      <Popup
        isOpen={isOpen}
        handleClose={handleClose}
        sizeClose="24x24"
        variant="scrollBarMayGreen"
      >
        <div className="t-popupClass_title">
          <Typography
            type="h1"
            modifiers={['white', 'center', '500', '20x26', 'uppercase']}
            content={title}
          />
        </div>
        <div className="t-popupClass_table">
          <Table pagination={{ pageSize: 4 }} columns={columns} dataSource={data} />
        </div>
      </Popup>
    </div>
);
};

export default PopupClass;
