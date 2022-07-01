import React, { useCallback, useEffect, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  CloseButton,
  Collapse,
  ColorInput,
  ColorPicker,
  Group,
  Input,
  Menu,
  MultiSelect,
  Paper,
  Popover,
  Select,
  Tabs,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';

import styled from 'styled-components';
import {
  BiBold,
  BiDownArrow,
  BiFontColor,
  BiHeading,
  BiHighlight,
  BiLink,
  BiListUl,
  BiPlus,
  BiStrikethrough,
  BiTable,
} from 'react-icons/bi';
import { GrBlockQuote } from 'react-icons/gr';
import EditorToolbarButton from './EditorToolbarButton.jsx';

import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiBold,
  RiCheckboxLine,
  RiCodeBoxLine,
  RiCodeFill,
  RiContactsBookLine,
  RiDeleteColumn,
  RiDeleteRow,
  RiH1,
  RiH2,
  RiH3,
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiInsertRowBottom,
  RiInsertRowTop,
  RiItalic,
  RiLink,
  RiListOrdered,
  RiListUnordered,
  RiMergeCellsHorizontal,
  RiNeteaseCloudMusicLine,
  RiSeparator,
  RiSplitCellsHorizontal,
  RiStrikethrough,
  RiSubscript,
  RiSuperscript,
  RiTable2,
  RiUnderline,
} from 'react-icons/ri';
import { VscChecklist } from 'react-icons/vsc';
import { db, updateTags } from '../db.js';
import { ImCross } from 'react-icons/im';
import HeadingMenu from './HeadingMenu.jsx';
import FontMenu from './FontMenu.jsx';
import AlignMenu from './AlignMenu.jsx';
import TableMenu from './TableMenu.jsx';

const ToolbarWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const StyledColorPicker = styled(Input)`
  & input[type='color'] {
    -webkit-appearance: none;
    width: 30px;
    height: 30px !important;
    border: 0;
    border-radius: 50%;
    transform: scale(0.7);
    padding: 0 !important;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    &::-webkit-color-swatch {
      border: none;
    }
  }
`;

const EditorToolbar = ({ editor, note }) => {
  const [linkText, setLinkText] = useState('');
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const removeButton = (
    <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
      <ImCross style={{ width: 10, height: 10 }} />
    </ActionIcon>
  );
  const [linkUrl, setLinkUrl] = useState('');
  const [selection, setSelection] = useState(null);
  const [opened, setOpened] = useState(false);
  const setLink = () => {
    editor.chain().focus().setTextSelection(selection).run();
    // empty
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setOpened(false);
      return;
    }

    // editor.commands.setLink({ href: linkUrl });

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl })
      .run();
    setOpened(false);
  };

  return (
    <>
      <Group
        mx={16}
        spacing={'xs'}
        position="center"
        style={{
          padding: '4px 4px',
          background: 'hsl(210, 5.405405405405405%, 14.50980392156863%)',
          borderRadius: '5px',
        }}
      >
        <FontMenu editor={editor} />
        <HeadingMenu editor={editor} />
        <Tooltip label="Text Color">
          <ActionIcon>
            <StyledColorPicker
              mx="0"
              size="xs"
              type="color"
              onInput={(event) =>
                editor.chain().focus().setColor(event.target.value).run()
              }
            />
          </ActionIcon>
        </Tooltip>
        <EditorToolbarButton
          tooltipLabel="Bold"
          editor={editor}
          command={() => editor.chain().focus().toggleBold().run()}
          activeString="bold"
          icon={<BiBold size={22} />}
        />
        <EditorToolbarButton
          tooltipLabel="Italic"
          editor={editor}
          command={() => editor.chain().focus().toggleItalic().run()}
          activeString="italic"
          icon={<RiItalic size={22} />}
        />
        <EditorToolbarButton
          tooltipLabel="Underline"
          editor={editor}
          command={() => editor.chain().focus().toggleUnderline().run()}
          activeString="underline"
          icon={<RiUnderline size={22} />}
        />
        <EditorToolbarButton
          tooltipLabel="Strike"
          editor={editor}
          command={() => editor.chain().focus().toggleStrike().run()}
          activeString="strike"
          icon={<RiStrikethrough size={22} />}
        />
        <EditorToolbarButton
          tooltipLabel="Highlight"
          editor={editor}
          command={() =>
            editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()
          }
          activeString="highlight"
          icon={<BiHighlight size={22} />}
        />
        <AlignMenu editor={editor} />
        <EditorToolbarButton
          tooltipLabel="Bullet List"
          command={() => editor.chain().focus().toggleBulletList().run()}
          editor={editor}
          activeString={'bulletList'}
          icon={<RiListUnordered size={22} />}
        />
        <EditorToolbarButton
          tooltipLabel="Numbered List"
          command={() => editor.chain().focus().toggleOrderedList().run()}
          editor={editor}
          activeString={'orderedList'}
          icon={<RiListOrdered size={22} />}
        />
        <EditorToolbarButton
          tooltipLabel="Checklist"
          command={() => editor.chain().focus().toggleTaskList().run()}
          editor={editor}
          activeString={'taskList'}
          icon={<VscChecklist size={22} />}
        />
        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          styles={{
            body: { background: '#30353b' },
            arrow: { background: '#30353b' },
          }}
          target={
            <Tooltip color="gray" label="Insert Link">
              <ActionIcon
                my={0}
                onClick={() => {
                  const previousUrl = editor.getAttributes('link').href;
                  const selectedText = {
                    to: editor.view.state.selection.to,
                    from: editor.view.state.selection.from,
                  };
                  if (selectedText.to === selectedText.from) return;
                  if (previousUrl) setLinkUrl(previousUrl);
                  const textContent = document.getSelection().toString();
                  setSelection(selectedText);
                  setLinkText(textContent);
                  setOpened(true);
                }}
                size="md"
                mr="3px"
              >
                <BiLink size={18} />
              </ActionIcon>
            </Tooltip>
          }
          position="bottom"
          withArrow
        >
          <Text>{linkText}</Text>
          <form
            action="submit"
            onSubmit={(e) => {
              e.preventDefault();
              setLink();
            }}
          >
            <TextInput
              label="URL"
              value={linkUrl}
              style={{ marginTop: '12px' }}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <Button
              style={{ width: '100%', marginTop: '12px' }}
              type="submit"
              color="dark"
            >
              Set Link
            </Button>
          </form>
        </Popover>
        <EditorToolbarButton
          tooltipLabel="Inline Code"
          editor={editor}
          command={() => editor.chain().focus().toggleCode().run()}
          activeString="code"
          icon={<RiCodeFill size={18} />}
        />
        <EditorToolbarButton
          tooltipLabel="Code Block"
          editor={editor}
          command={() => editor.chain().focus().toggleCodeBlock().run()}
          activeString="codeBlock"
          icon={<RiCodeBoxLine size={18} />}
        />
        <EditorToolbarButton
          tooltipLabel="Block Quote"
          command={() => editor.chain().focus().toggleBlockquote().run()}
          editor={editor}
          activeString={'blockquote'}
          icon={<GrBlockQuote size={18} />}
        />
        <EditorToolbarButton
          tooltipLabel="Horizontal Rule"
          editor={editor}
          command={() => editor.chain().focus().setHorizontalRule().run()}
          activeString={''}
          icon={<RiSeparator size={18} />}
        />
        <TableMenu editor={editor} />
      </Group>
    </>
  );
};

export default EditorToolbar;
