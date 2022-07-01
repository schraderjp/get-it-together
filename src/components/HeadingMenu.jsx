import { ActionIcon, Button, Menu, Text, Tooltip } from '@mantine/core';
import React from 'react';
import { BiFontSize, BiHeading, BiParagraph } from 'react-icons/bi';
import { RiH1, RiH2 } from 'react-icons/ri';

const HeadingMenu = ({ editor }) => {
  return (
    <Tooltip label="Text Size">
      <Menu
        style={{ background: 'hsl(210, 5.40%, 13.50%)' }}
        control={
          <ActionIcon>
            <BiFontSize size={22} />
          </ActionIcon>
        }
      >
        <Menu.Item
          onClick={() => editor.chain().focus().setParagraph().run()}
          icon={
            <BiParagraph
              size={18}
              color={editor.isActive('paragraph') ? '#4495f8' : undefined}
            />
          }
        >
          <Text
            style={{
              color: editor.isActive('paragraph') ? '#4495f8' : undefined,
            }}
          >
            Paragraph
          </Text>
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          icon={
            <RiH1
              size={18}
              color={
                editor.isActive(('heading', { level: 1 }))
                  ? '#4495f8'
                  : undefined
              }
            />
          }
        >
          <Text
            style={{
              color: editor.isActive(('heading', { level: 1 }))
                ? '#4495f8'
                : undefined,
            }}
          >
            Heading 1
          </Text>
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          icon={
            <RiH2
              size={18}
              color={
                editor.isActive(('heading', { level: 2 }))
                  ? '#4495f8'
                  : undefined
              }
            />
          }
        >
          <Text
            style={{
              color: editor.isActive(('heading', { level: 2 }))
                ? '#4495f8'
                : undefined,
            }}
          >
            Heading 2
          </Text>
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          icon={
            <RiH2
              size={18}
              color={
                editor.isActive(('heading', { level: 3 }))
                  ? '#4495f8'
                  : undefined
              }
            />
          }
        >
          <Text
            style={{
              color: editor.isActive(('heading', { level: 3 }))
                ? '#4495f8'
                : undefined,
            }}
          >
            Heading 3
          </Text>
        </Menu.Item>
      </Menu>
    </Tooltip>
  );
};

export default HeadingMenu;
