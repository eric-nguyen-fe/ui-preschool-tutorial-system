import { Story, Meta } from '@storybook/react';
import React from 'react';

import CSelect from '.';

export default {
  title: 'Components/organisms/CSelect',
  component: CSelect,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <CSelect optionData={[]} />
);
