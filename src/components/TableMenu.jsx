import { ActionIcon, Button, Menu, Text, Tooltip } from '@mantine/core';
import React from 'react';
import {
  AiOutlineDeleteColumn,
  AiOutlineDeleteRow,
  AiOutlineInsertRowAbove,
  AiOutlineInsertRowBelow,
  AiOutlineInsertRowLeft,
  AiOutlineInsertRowRight,
  AiOutlineMergeCells,
  AiOutlineSplitCells,
  AiOutlineTable,
} from 'react-icons/ai';
import { BiFontSize, BiHeading, BiParagraph, BiTable } from 'react-icons/bi';
import { RiH1, RiH2 } from 'react-icons/ri';

const TableMenu = ({ editor }) => {
  return (
    <Tooltip label="Table">
      <Menu
        style={{ background: 'hsl(210, 5.40%, 13.50%)' }}
        control={
          <ActionIcon>
            <BiTable size={22} />
          </ActionIcon>
        }
      >
        <Menu.Item
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          icon={<AiOutlineTable size={18} />}
        >
          Insert Table
        </Menu.Item>
        <Menu.Item
          onClick={() => editor.chain().focus().addRowBefore().run()}
          icon={<AiOutlineInsertRowAbove size={18} />}
        >
          Insert Row Above
        </Menu.Item>
        <Menu.Item
          onClick={() => editor.chain().focus().addRowAfter().run()}
          icon={<AiOutlineInsertRowBelow size={18} />}
        >
          Insert Row Below
        </Menu.Item>
        <Menu.Item
          onClick={() => editor.chain().focus().deleteRow().run()}
          icon={<AiOutlineDeleteRow size={18} />}
        >
          Delete Row
        </Menu.Item>
        <Menu.Item
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          icon={<AiOutlineInsertRowLeft size={18} />}
        >
          Insert Column Before
        </Menu.Item>
        <Menu.Item
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          icon={<AiOutlineInsertRowRight size={18} />}
        >
          Insert Column After
        </Menu.Item>
        <Menu.Item
          onClick={() => editor.chain().focus().deleteColumn().run()}
          icon={<AiOutlineDeleteColumn size={18} />}
        >
          Delete Column
        </Menu.Item>
        <Menu.Item
          onClick={() => editor.chain().focus().mergeCells().run()}
          icon={<AiOutlineMergeCells size={18} />}
        >
          Merge Cells
        </Menu.Item>
        <Menu.Item
          onClick={() => editor.chain().focus().splitCell().run()}
          icon={<AiOutlineSplitCells size={18} />}
        >
          Split Cell
        </Menu.Item>
      </Menu>
    </Tooltip>
  );
};

export default TableMenu;
