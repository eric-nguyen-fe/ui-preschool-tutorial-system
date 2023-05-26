import { Select } from 'antd';
import React from 'react';

import { OptionType } from 'components/molecules/PullDown';

interface CSelectProps {
  optionData: OptionType[];
  handleOnChange?: (item: OptionType) => void;
}

const CSelect: React.FC<CSelectProps> = ({ optionData, handleOnChange }) => (
  <Select
    defaultValue={optionData[0]}
    style={{
      width: 100, height: 60, display: 'flex', alignItems: 'center'
    }}
    onChange={handleOnChange}
    options={optionData}
  />
);

CSelect.defaultProps = {
};

export default CSelect;
