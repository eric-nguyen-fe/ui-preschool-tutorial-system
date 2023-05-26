import { Story, Meta } from '@storybook/react';
import React from 'react';

import FormAddOrEditClass from '.';

export default {
  title: 'Components/organisms/FormAddOrEditClass',
  component: FormAddOrEditClass,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <FormAddOrEditClass />
);
