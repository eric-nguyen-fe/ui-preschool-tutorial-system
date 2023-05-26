/* eslint-disable import/no-extraneous-dependencies */
import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';

import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import Notify from 'components/organisms/Notify';
import PopupClass from 'components/organisms/PopupClass';
import { datapopuop } from 'components/organisms/PopupClass/index.stories';
import PopupEditStudent from 'components/organisms/PopupEditStudent';
import MainLayout from 'components/templates/MainLayout';

export interface DataType {
  userID: string;
  name: string;
  email: string;
  phone: number;
  class: number;
  pay: number;
}

const TablePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [isOpenNoti, setIsOpennoti] = useState(false);

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
  const columns: ColumnsType<DataType> = [
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
      sorter: (a, b) => a.pay - b.pay,
    },
    {
      title: ' ',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button modifiers={['white-edit']} onClick={handleEditUser}>
            <Typography modifiers={['16x21', '400', 'center', 'capitalize']}>edit</Typography>
          </Button>
          <Button onClick={handleDeleteUser} modifiers={['pastel-red']}>
            <Typography modifiers={['16x21', '400', 'center', 'capitalize']}>Delete</Typography>
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      userID: '1',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '2',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 25
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
    },
    {
      userID: '3',
      name: 'John Brown',
      email: 'Eric@gmail.com',
      phone: 9090909,
      class: 1,
      pay: 250000
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
              30&nbsp;Tutor
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
            <Button onClick={handleAdduser}>
              <Icon iconName="round-plus" />
              <Typography modifiers={['16x21', 'white', '500', 'capitalize']}>
                Add new users
              </Typography>
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
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

export default TablePage;
