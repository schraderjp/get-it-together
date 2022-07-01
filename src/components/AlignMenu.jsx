import { ActionIcon, Button, Menu, Tooltip } from '@mantine/core';
import React from 'react';
import {
  BiAlignJustify,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
} from 'react-icons/bi';

const AlignMenu = ({ editor }) => {
  return (
    <Tooltip label="Align">
      <Menu
        style={{ background: 'hsl(210, 5.40%, 13.50%)' }}
        size={'xs'}
        control={
          <ActionIcon>
            {editor.isActive({ textAlign: 'left' }) ? (
              <BiAlignLeft size={22} />
            ) : editor.isActive({ textAlign: 'center' }) ? (
              <BiAlignMiddle size={22} />
            ) : editor.isActive({ textAlign: 'right' }) ? (
              <BiAlignRight size={22} />
            ) : (
              <BiAlignJustify size={22} />
            )}
          </ActionIcon>
        }
      >
        <Menu.Item icon={<BiAlignLeft size={22} />}>Left</Menu.Item>
        <Menu.Item icon={<BiAlignMiddle size={22} />}>Right</Menu.Item>
        <Menu.Item icon={<BiAlignRight size={22} />}>Center</Menu.Item>
        <Menu.Item icon={<BiAlignJustify size={22} />}>Justify</Menu.Item>
      </Menu>
    </Tooltip>
  );
};

export default AlignMenu;
