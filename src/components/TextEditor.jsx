import React, { useEffect, useRef, useState } from 'react';
import EditorToolbar from './EditorToolbar.jsx';
import { useResizeObserver, useViewportSize } from '@mantine/hooks';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Dialog,
  Group,
  Menu,
  Modal,
  Popover,
  ScrollArea,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { db, deleteNote, selectNote, updateTitle } from '../db.js';
import { VscTrash } from 'react-icons/vsc';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { useNotifications } from '@mantine/notifications';
import { ImKeyboard } from 'react-icons/im';
import KeyboardShortcuts from './KeyboardShortcuts.jsx';
import { RiAB, RiPrinterLine } from 'react-icons/ri';
import { EditorWrapper, StyledEditor } from './styled/EditorStyles.jsx';
import { format, parse } from 'date-fns';
import { createPrintString } from '../../printStyles.js';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiInfoCircle } from 'react-icons/bi';
const appApi = window.app;
const TextEditor = ({
  note,
  handleNewNote,
  editor,
  setNote,
  isFullScreen,
  setIsFullScreen,
  drawerOpened,
  dateModified,
  dateCreated,
  setDateCreated,
  setDateModified,
  title,
  setTitle,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const titleRef = useRef(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [ref, rect] = useResizeObserver();
  const notifications = useNotifications();
  const [noteContent, setNoteContent] = useState('');
  const { height } = useViewportSize();

  const setFullScreenStatus = (e, arg) => {
    console.log(arg);
    setIsFullScreen(arg);
  };
  const getLastNote = async () => {
    const collection = await db.notes.toArray();

    return collection[collection.length - 1];
  };
  const updateNoteContent = async ({ editor }) => {
    const html = editor.getHTML();
    let dateModified = new Date();
    await db.notes.update(note.id, {
      content: html,
      dateModified: dateModified,
    });
    setNoteContent(html);
    setDateModified(dateModified);
  };

  useEffect(() => {
    setTitle(note.title);
    setNoteContent(note.content);
    setDateCreated(note.dateCreated);
    setDateModified(note.dateModified);
    editor.commands.setContent(note.content);
    editor.on('update', updateNoteContent);
    note.title === '' ? titleRef.current.focus() : editor.commands.focus();
    return () => editor.off('update', updateNoteContent);
  }, [editor, note]);

  useEffect(() => {
    appApi.setFullScreenListener(setFullScreenStatus);

    return appApi.removeFullScreenListener(setFullScreenStatus);
  }, []);
  return (
    <>
      <EditorWrapper ref={ref}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextInput
            ref={titleRef}
            size="md"
            value={title}
            variant="unstyled"
            ml={8}
            onChange={(e) => {
              updateTitle(note.id, e.target.value);
              setTitle(e.target.value);
            }}
            placeholder="Note Title"
            sx={(theme) => ({
              padding: '6px',

              zIindex: '800',
              flex: '1 1 auto',
              '& input::placeholder': {
                paddingLeft: '4px',
                color: '#383838',
              },
            })}
          />

          {isFullScreen && (
            <Tooltip color="gray" label="Toggle Fullscreen" position="bottom">
              <ActionIcon
                color="gray"
                onClick={() => {
                  appApi.toggleFullScreen();
                  appApi.isFullScreen();
                }}
              >
                {isFullScreen ? (
                  <AiOutlineFullscreenExit size={25} />
                ) : (
                  <AiOutlineFullscreen size={25} />
                )}
              </ActionIcon>
            </Tooltip>
          )}

          <Menu
            styles={{
              root: { marginRight: '0.5rem' },
              body: {
                background: 'hsl(210, 5.405405405405405%, 13.50980392156863%)',
              },
            }}
          >
            <Menu.Item
              onClick={() => setShowShortcuts(true)}
              icon={
                <ThemeIcon color="gray" radius="lg">
                  <ImKeyboard />
                </ThemeIcon>
              }
            >
              Keyboard Shortcuts
            </Menu.Item>
            <Menu.Item
              icon={
                <ThemeIcon color="gray" radius="lg">
                  <RiPrinterLine />
                </ThemeIcon>
              }
              onClick={() =>
                window.app.printPreview(createPrintString(noteContent, title))
              }
            >
              Print
            </Menu.Item>
            <Menu.Item
              onClick={() => setShowDialog(true)}
              icon={
                <ThemeIcon color="red" radius="lg">
                  <VscTrash />
                </ThemeIcon>
              }
            >
              Delete Note
            </Menu.Item>
          </Menu>
        </div>

        {editor && <EditorToolbar note={note} editor={editor} />}
      </EditorWrapper>

      {editor && note && (
        <ScrollArea style={{ height: height - rect.height - 26 }}>
          <StyledEditor editor={editor} />
        </ScrollArea>
      )}

      <Modal
        opened={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        title="Keyboard Shortcuts"
      >
        <ScrollArea
          style={{
            padding: '6px',
            height: '60vh',
          }}
        >
          <KeyboardShortcuts />
        </ScrollArea>
      </Modal>
      <Dialog
        position={{ top: 20, right: 20 }}
        style={{
          background: 'hsl(210, 5.40%, 13.50%)',
        }}
        opened={showDialog}
        withCloseButton
        onClose={() => setShowDialog(false)}
        shadow="md"
        padding={30}
        radius="sm"
      >
        <Center>
          <Text>Are you should you wish to delete this note?</Text>
        </Center>
        <Center>
          <Button
            color="red"
            onClick={async () => {
              await deleteNote(note.id);
              const lastNote = await getLastNote();
              if (typeof lastNote === 'undefined') {
                setNote(null);
              } else {
                selectNote(lastNote.id);
                setNote(lastNote);
              }

              setShowDialog(false);
            }}
          >
            Yes
          </Button>
          <Button color="gray" m={4} onClick={() => setShowDialog(false)}>
            No
          </Button>
        </Center>
      </Dialog>
    </>
  );
};

export default TextEditor;
