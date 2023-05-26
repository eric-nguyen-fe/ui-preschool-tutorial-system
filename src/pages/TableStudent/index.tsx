/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';

import { DataExampletableStudent } from 'assets/fakeData';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import FormAddOrEditStudent from 'components/organisms/FormAddOrEditStudent';
import Notify from 'components/organisms/Notify';
import Popup from 'components/organisms/Popup';
import PopupClass from 'components/organisms/PopupClass';
import { datapopuop } from 'components/organisms/PopupClass/index.stories';
import PopupEditStudent from 'components/organisms/PopupEditStudent';
import MainLayout from 'components/templates/MainLayout';

export interface DataStudent {
  userID: string;
  name: string;
  phone: string;
  email: string;
  parentName: string;
  parentPhone: string;
  class: number;
  pay: string;
}

const TableStudent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [isOpenNoti, setIsOpennoti] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [dataForn, setDataForn] = useState({
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
  const columns: ColumnsType<DataStudent> = [
    {
      title: 'UserID',
      dataIndex: 'userID',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Parent Name',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Parent\'sPhone',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Registerd Class',
      dataIndex: 'class',
      key: 'class',
      render: (text, record) => (
        <div className="tableTextoption">
          {text}
          <div className="tableIconoption" onClick={() => handleClickOption(record.userID)}>
            <Icon iconName="option" />
          </div>
        </div>
      ),
    },
    {
      title: 'Payment',
      key: 'pay',
      dataIndex: 'pay',
      defaultSortOrder: 'descend',
      render: (text) => (
        <p>
          {text}
          $
        </p>
      ),
      sorter: (a, b) => Number(a.pay) - Number(b.pay),
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
    if (isUpdate) setDataForn(valueDefaul);
    if (!isUpdate) setDataForn(valueAdd);
  }, [isUpdate]);

  return (
    <MainLayout isShowBarLayout>
      <div className="p-table_admin">
        <div className="p-table_admin-info">
          <div className="p-table_admin-total">
            <Typography modifiers={['24x31', '700']}>
              30&nbsp;Student
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
        <Table columns={columns} dataSource={DataExampletableStudent} />
        <Popup
          isOpen={isOpenPopup}
          variant="width900"
          handleClose={() => setIsOpenPopup(false)}
          headerComponent={<div className="header_popup"><Typography content="student infomation" modifiers={['uppercase']} /></div>}
        >
          <FormAddOrEditStudent btnText="Thêm mới" subBtnText="hủy" handleClose={() => setIsOpenPopup(false)} />
        </Popup>
        <PopupClass
          isOpen={isOpen}
          handleClose={handleClose}
          title="REGISTERED CLASS"
          data={datapopuop}
        />
        <PopupEditStudent valueDefaul={dataForn} isOpen={isOpenEdit} handleClose={handleCloseEdit} title="STUDENT INFORMATION" btnText="save" subBtnText="cancel" />
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

export default TableStudent;
