import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import MenuBar from './MenuBar.jsx';
import {
  ActionIcon,
  Burger,
  Button,
  Center,
  Drawer,
  Group,
  Loader,
  MantineProvider,
  Text,
} from '@mantine/core';

import { createNote, db, selectNote } from '../db.js';
import Notes from './Notes.jsx';
import Note from './Note.jsx';
import styled from 'styled-components';
import { Link } from '@tiptap/extension-link';
import { useMediaQuery } from '@mantine/hooks';
import { Sidebar } from './styled/Sidebar.jsx';
import { Main } from './styled/Main.jsx';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CharacterCount from '@tiptap/extension-character-count';
import { useLiveQuery } from 'dexie-react-hooks';

import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import lowlight from 'lowlight';
import TextAlign from '@tiptap/extension-text-align';

import Placeholder from '@tiptap/extension-placeholder';

import { NotificationsProvider } from '@mantine/notifications';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import useEditorSelection from '../hooks/useEditorSelection.js';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
const StyledBurger = styled(Burger)`
  position: relative;
  top: 0;
  left: 0;
  z-index: 190;
  -webkit-app-region: no-drag;
  margin-left: auto;
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  height: 32px;
  top: 32px;
  left: 4px;
  width: max-content;
  align-items: center;
  justify-content: center;
`;

const ActionWrapper = styled.div`
  display: flex;
  padding-right: 4px;
  width: 100%;
  position: relative;
`;

const App = () => {
  const largeWidth = useMediaQuery('(min-width: 600px)');
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [dateModified, setDateModified] = useState();
  const [dateCreated, setDateCreated] = useState();
  const [title, setTitle] = useState('');
  const notes = useLiveQuery(() => db.notes.toArray());
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [note, setNote] = useState();
  const handleNewNote = async () => {
    const newId = await createNote();
    const newNote = await db.notes.get(newId);
    setNote(newNote);
    selectNote(newId);
    setDrawerOpened(false);
  };
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),

      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      TaskList.configure({
        itemTypeName: 'taskItem',
        HTMLAttributes: {
          class: 'tt-tasklist',
        },
      }),
      TaskItem.configure({
        nested: true,
      }),
      CharacterCount,
      Underline,
      Subscript,
      Typography,
      Highlight.configure({ multicolor: true }),
      Superscript,
      FontFamily,
      Color,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: "What's the note?",
      }),
      Link,
    ],
    content: '',
    onUpdate({ editor }) {
      const html = editor.getHTML();
      //updateContent(note, html);
    },
  });

  const getSelectedNote = async () => {
    const selectedNote = await db.notes
      .filter((note) => {
        return note.selected === true;
      })
      .first();
    if (selectedNote) setNote(selectedNote);
    setLoading(false);
  };

  useEffect(() => {
    if (!note) {
      setLoading(true);
      getSelectedNote();
    }
  }, [note]);

  {
    if (!note && loading)
      return (
        <Center style={{ height: 'calc(100vh - 36px)' }}>
          <Loader />
        </Center>
      );
  }

  return (
    <>
      <HashRouter>
        <MantineProvider theme={{ colorScheme: 'dark' }}>
          <NotificationsProvider
            containerWidth={250}
            position="top-right"
            zIndex={875}
            autoClose={3000}
          >
            <MenuBar
              drawerOpened={drawerOpened}
              setDrawerOpened={setDrawerOpened}
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
              setIsFullScreen={setIsFullScreen}
              isFullScreen={isFullScreen}
            />

            <Drawer
              opened={drawerOpened}
              title="Notes"
              onClose={() => setDrawerOpened(false)}
              padding="xs"
              size="md"
              styles={{
                closeButton: {
                  WebkitAppRegion: 'no-drag',
                },
              }}
            >
              <Notes
                handleNewNote={handleNewNote}
                setDrawerOpened={setDrawerOpened}
                note={note}
                title={title}
                dateModified={dateModified}
                setDateModified={setDateModified}
                dateCreated={dateCreated}
                setDateCreated={setDateCreated}
                largeWidth={largeWidth}
                setNote={setNote}
                notes={notes}
                note={note}
              />
            </Drawer>

            {
              <Main isFullScreen={isFullScreen}>
                {note && (
                  <Note
                    setIsFullScreen={setIsFullScreen}
                    setTitle={setTitle}
                    title={title}
                    isFullScreen={isFullScreen}
                    handleNewNote={handleNewNote}
                    note={note}
                    setNote={setNote}
                    editor={editor}
                    notes={notes}
                    drawerOpened={drawerOpened}
                    dateModified={dateModified}
                    setDateModified={setDateModified}
                    dateCreated={dateCreated}
                    setDateCreated={setDateCreated}
                  />
                )}
                {!note && (
                  <Group direction="column" position="center">
                    <Text size="xl" m="16px">
                      No notes found. Click below to create a new note!
                    </Text>
                    <Button onClick={handleNewNote}>New Note</Button>
                  </Group>
                )}
              </Main>
            }
          </NotificationsProvider>
        </MantineProvider>
      </HashRouter>
    </>
  );
};

export default App;
