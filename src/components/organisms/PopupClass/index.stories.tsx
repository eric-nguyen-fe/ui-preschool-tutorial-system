/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/button-has-type */
import { Story, Meta } from '@storybook/react';
import React, { useState } from 'react';

import PopupClass from '.';

export default {
  title: 'Components/organisms/PopupClass',
  component: PopupClass,
  argTypes: {},
} as Meta;
export const datapopuop = [
  {
    classname: 'English for Children 2023',
    tutor: 'Brooklyn Simmons',
    current: 3,
    endClass: 20,
    dateCreated: 'May 12th , 2023'
  },
    {
    classname: 'English for Children 2023',
    tutor: 'Brooklyn Simmons',
    current: 9,
    endClass: 20,
    dateCreated: 'May 12th , 2023'
  },
    {
    classname: 'English for Children 2023',
    tutor: 'Brooklyn Simmons',
    current: 3,
    endClass: 20,
    dateCreated: 'May 12th , 2023'
  },
    {
    classname: 'English for Children 2023',
    tutor: 'Brooklyn Simmons',
    current: 6,
    endClass: 20,
    dateCreated: 'May 12th , 2023'
  },
    {
    classname: 'English for Children 2023',
    tutor: 'Brooklyn Simmons',
    current: 8,
    endClass: 20,
    dateCreated: 'May 12th , 2023'
  },
    {
    classname: 'English for Children 2023',
    tutor: 'Brooklyn Simmons',
    current: 3,
    endClass: 20,
    dateCreated: 'May 12th , 2023'
  },
    {
    classname: 'English for Children 2023',
    tutor: 'Brooklyn Simmons',
    current: 3,
    endClass: 20,
    dateCreated: 'May 12th , 2023'
  }
];
export const normal: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
const handleClose = () => {
  setIsOpen(false);
};
  return (
    <div>
      <button onClick={() => setIsOpen(true)}> click me!!!</button>
      <PopupClass
        isOpen={isOpen}
        handleClose={handleClose}
        title="hihihi"
        data={datapopuop}
      />
    </div>
);
};
