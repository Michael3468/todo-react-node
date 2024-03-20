import React, { FC } from 'react';
import { Dropdown } from 'react-bootstrap';

type RDropdownProps = {
  variable: string;
  setVariable: (value: string) => void;
  toggleText: string;
  itemsArray: string[];
  disabled?: boolean;
};

const RDropdown: FC<RDropdownProps> = ({
  variable,
  setVariable,
  toggleText,
  itemsArray,
  disabled = false,
}) => (
  <Dropdown className="mt-2 mb-2">
    <Dropdown.Toggle className="w-100" disabled={disabled}>
      {variable ? `${toggleText}: ${variable}` : `Choose ${toggleText}`}
    </Dropdown.Toggle>
    <Dropdown.Menu className="w-100">
      {itemsArray.map((pr, index) => (
        <Dropdown.Item
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={() => setVariable(pr)}
          className="d-flex justify-content-center"
        >
          {pr}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

RDropdown.defaultProps = {
  disabled: false,
};

export default RDropdown;
