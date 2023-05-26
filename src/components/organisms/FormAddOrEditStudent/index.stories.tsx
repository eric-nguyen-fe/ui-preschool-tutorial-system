import { Story, Meta } from '@storybook/react';
import React from 'react';

import FormAddOrEditStudent from '.';

export default {
  title: 'Components/organisms/FormAddOrEditStudent',
  component: FormAddOrEditStudent,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <FormAddOrEditStudent />
);
