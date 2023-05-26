/* eslint-disable react-hooks/rules-of-hooks */
import { Story, Meta } from '@storybook/react';
import React from 'react';

import Header from '.';

export default {
  title: 'Components/templates/Header',
  component: Header,
  argTypes: {},
} as Meta;

export const optionsLanguage = [
  {
    id: 1, name: 'VietNamese', acronym: 'VN', IconName: 'VietNam'
  },
  {
    id: 2, name: 'England', acronym: 'EN', IconName: 'England'
  },
  {
    id: 3, name: 'Korea', acronym: 'KO', IconName: 'Korea'
  },
];
export const optionsProfile = [
  {
    id: 0,
    name: 'my profiles',
  },
  {
    id: 1,
    name: 'log out',
  }
];

export const normal: Story = () => (
  <div style={{ height: '100vh' }}>
    <Header
      optionsProfile={optionsProfile}
      nameUser="eric"
      deptBtn=""
    />
  </div>
);
