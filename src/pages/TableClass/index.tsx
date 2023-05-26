/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

import { DataExampleClass } from 'assets/fakeData';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import FormAddOrEditClass from 'components/organisms/FormAddOrEditClass';
import Notify from 'components/organisms/Notify';
import Popup from 'components/organisms/Popup';
import PopupClass from 'components/organisms/PopupClass';
import { datapopuop } from 'components/organisms/PopupClass/index.stories';
import PopupEditStudent from 'components/organisms/PopupEditStudent';
import MainLayout from 'components/templates/MainLayout';

export interface DataClass {
  className: string;
  createDate: Date;
  status: string;
  tutorName: string;
  studentName: string;
  NumberOfTime: number;
  NumberOfHour: number;
}

const TableClass: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [isOpenNoti, setIsOpennoti] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [dataForm, setDataForm] = useState({
    user_name: '',
    birthday: '',
    grade: '',
    phone: '',
    userId: '',
    email: '',
    password: ''
  });

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleCloseEdit = () => {
    setIsOpenEdit(false);
    setisUpdate(false);
  };
  const handleEditUser = () => {
    setIsOpenEdit(true);
    setisUpdate(true);
  };
  const handleClickOption = (id: string) => {
    setIsOpen(true);
    console.log(id);
  };
  const handleDeleteUser = () => {
    setIsOpennoti(true);
    console.log('delete open');
  };

  const handleAdduser = () => {
    setisUpdate(false);
    setIsOpenEdit(true);
  };
  const handleConfirm = () => {
    alert('success');
  };

  // className: string;
  // createDate: string;
  // status: string;
  // tutorName: string;
  // studentName: string;
  // NumberOfTime: string;
  // NumberOfHour: string;

  const columns: ColumnsType<DataClass> = [
    {
      title: 'Class Name',
      dataIndex: 'className',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Created Date',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text) => <p>{moment(text).format('Do MMM YYYY')}</p>,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <div className="wrapper-status"><p className={`wrapper-status_${text.toLowerCase()}`}>{text}</p></div>,
    },

    {
      title: 'Tutor Name',
      dataIndex: 'tutorName',
      key: 'phone',
    },
    {
      title: 'The number of times',
      key: 'NumberOfTime',
      dataIndex: 'NumberOfTime',
      defaultSortOrder: 'descend',
      render: (text) => (
        <p>
          {text}
          $
        </p>
      ),
      sorter: (a, b) => Number(a.NumberOfTime) - Number(b.NumberOfTime),
    },
    {
      title: 'The number of hours',
      key: 'NumberOfHour',
      dataIndex: 'NumberOfHour',
      defaultSortOrder: 'descend',
      render: (text) => (
        <p>
          {text}
          $
        </p>
      ),
      sorter: (a, b) => Number(a.NumberOfHour) - Number(b.NumberOfHour),
    },
    {
      title: ' ',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button modifiers={['white-edit']} onClick={() => setIsOpenPopup(true)}>
            <Typography modifiers={['16x21', '400', 'center', 'capitalize']}>edit</Typography>
          </Button>
          <Button onClick={handleDeleteUser} modifiers={['pastel-red']}>
            <Typography modifiers={['16x21', '400', 'center', 'capitalize']}>Delete</Typography>
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const valueDefaul = {
      user_name: 'string',
      birthday: '11/11/1111',
      grade: 'string',
      phone: '0909090909',
      userId: 'string',
      email: 'string@gmail.com',
      password: 'string'
    };
    const valueAdd = {
      user_name: '',
      birthday: '',
      grade: '',
      phone: '',
      userId: '',
      email: '',
      password: ''
    };
    if (isUpdate) setDataForm(valueDefaul);
    if (!isUpdate) setDataForm(valueAdd);
  }, [isUpdate]);

  return (
    <MainLayout isShowBarLayout>
      <div className="p-table_admin">
        <div className="p-table_admin-info">
          <div className="p-table_admin-total">
            <Typography modifiers={['24x31', '700']}>
              30&nbsp;Class
            </Typography>
          </div>
          <div className="p-table_admin-search">
            <Input
              id="test"
              autoComplete="off"
              placeholder=" Search name"
              type="text"
              iconName="search"
            />
            <Button onClick={() => setIsOpenPopup(true)}>
              <Icon iconName="round-plus" />
              <Typography modifiers={['16x21', 'white', '500', 'capitalize']}>
                Add new users
              </Typography>
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={DataExampleClass} />
        <Popup
          isOpen={isOpenPopup}
          variant="width700"
          handleClose={() => setIsOpenPopup(false)}
          headerComponent={<div className="header_popup"><Typography content="add a new class" modifiers={['uppercase']} /></div>}
        >
          <FormAddOrEditClass btnText="Thêm mới" subBtnText="hủy" handleClose={() => setIsOpenPopup(false)} />
        </Popup>
        <PopupEditStudent valueDefaul={dataForm} isOpen={isOpenEdit} handleClose={handleCloseEdit} title="STUDENT INFORMATION" btnText="save" subBtnText="cancel" />
        <Notify
          isOpen={isOpenNoti}
          handleClose={() => setIsOpennoti(false)}
          type="error"
          message="Are you sure to delete this account?"
          btnText="SAVE"
          subBtnText="Cancel"
          modifiers="twoButton"
          animateNotify={false}
          Submessage="This action cannot be undone"
          handleConfirm={handleConfirm}
        />
      </div>
    </MainLayout>
  );
};

export default TableClass;
