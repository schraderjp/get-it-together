import { ActionIcon, Button, Menu, Text, Tooltip } from '@mantine/core';
import React from 'react';
import { AiOutlineFontSize } from 'react-icons/ai';
import { BiFont } from 'react-icons/bi';
import { BsFonts } from 'react-icons/bs';

const fonts = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Times New Roman', label: 'Times New Roman' },
];

const FontMenu = ({ editor }) => {
  return (
    <Tooltip label="Font">
      <Menu
        style={{ background: 'hsl(210, 5.40%, 13.50%)' }}
        size="md"
        control={
          <ActionIcon>
            <BiFont size={22} />
          </ActionIcon>
        }
      >
        {fonts.map((font) => (
          <Menu.Item
            key={font.value}
            onClick={() =>
              editor.chain().focus().setFontFamily(font.value).run()
            }
          >
            <Text
              style={{
                color: editor.isActive(
                  ('textStyle', { fontFamily: font.value })
                )
                  ? '#4495f8'
                  : undefined,
              }}
            >
              {font.label}
            </Text>
          </Menu.Item>
        ))}
      </Menu>
    </Tooltip>
  );
};

export default FontMenu;

{
  /* <Select
              onChange={(value) => {
                setFontValue(value);
                editor.chain().focus().setFontFamily(value).run();
              }}
              size="xs"
              value={fontValue}
              placeholder="Choose font"
              data={[
                { value: 'Arial', label: 'Arial' },
                { value: 'Lato', label: 'Lato' },
                { value: 'Times New Roman', label: 'Times New Roman' },
              ]}
            /> */
}
