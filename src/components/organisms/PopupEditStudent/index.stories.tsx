/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/rules-of-hooks */
import { Story, Meta } from '@storybook/react';
import React, { useState } from 'react';

import PopupEditStudent from '.';

export default {
  title: 'Components/organisms/PopupEditStudent',
  component: PopupEditStudent,
  argTypes: {},
} as Meta;

export const normal: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
const handleClose = () => {
  setIsOpen(false);
};
  return (
    <div>
      <button onClick={() => setIsOpen(true)}> click me!!!</button>
      <PopupEditStudent isOpen={isOpen} handleClose={handleClose} title="hii" />
    </div>
);
};
