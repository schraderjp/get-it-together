import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Container,
  Drawer,
  Text,
  TextInput,
  Title,
  Transition,
  MediaQuery,
  Accordion,
  useAccordionState,
  Modal,
  Group,
  Badge,
  Center,
  Divider,
} from '@mantine/core';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { VscAdd, VscNote, VscTable, VscTrash } from 'react-icons/vsc';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  MdOutlinePostAdd,
  MdOutlineAddTask,
  MdEditNote,
  MdAddTask,
  MdHdrPlus,
} from 'react-icons/md';
import {
  db,
  createNote,
  deleteNote,
  updateContent,
  selectNote,
  setAllNotesUnselected,
} from '../db.js';
import NotePaper from './NotePaper.jsx';
import TextEditor from './TextEditor.jsx';
import { Sidebar } from './styled/Sidebar.jsx';
import { Main } from './styled/Main.jsx';
import { useMediaQuery } from '@mantine/hooks';
import {
  RiCheckboxBlankLine,
  RiFileAddLine,
  RiMenu2Fill,
  RiMenuFill,
} from 'react-icons/ri';
import { useNotifications } from '@mantine/notifications';
import Tasks from './Tasks.jsx';
import { BiCheckSquare, BiPlus } from 'react-icons/bi';
import { AiFillFileAdd } from 'react-icons/ai';
import { DatePicker } from '@mantine/dates';
import { format } from 'date-fns';

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  margin: 12px 0 0 0;
  padding-left: 16px;
`;

const Notes = ({
  handleNewNote,
  setNote,
  setDrawerOpened,
  notes,
  note,
  dateCreated,
  dateModified,
  setDateCreated,
  setDateModified,
  title,
}) => {
  const notifications = useNotifications();
  const [newTask, setNewTask] = useState('');
  const [taskModalshown, setTaskModalShown] = useState(false);
  const largeWidth = useMediaQuery('(min-width: 450px)');

  const handleNoteClick = (note) => {
    setNote(note);
    selectNote(note.id);
  };

  //useEffect(() => setAllNotesUnselected(), []);

  return (
    <>
      <Container>
        {note && (
          <>
            <Title
              mb="sm"
              style={{ textAlign: 'center', color: '#86bdff' }}
              order={5}
            >
              Active Note Details
            </Title>
            <Group my="xs">
              <Text color={'blue'} size="sm" weight={'bold'}>
                Title:
              </Text>
              <Text size="sm">{title}</Text>
            </Group>
            <Group my="xs">
              <Text color={'blue'} size="sm" weight={'bold'}>
                Created:
              </Text>
              <Text size="sm">
                {dateCreated && format(dateCreated, 'M-d-yyyy h:mm a')}
              </Text>
            </Group>
            <Group my="xs">
              <Text color={'blue'} size="sm" weight={'bold'}>
                Modified:
              </Text>
              <Text size="sm">
                {dateModified && format(dateModified, 'M-d-yyyy h:mm a')}
              </Text>
            </Group>
          </>
        )}
        <Divider my="md" />
        <Button
          variant="subtle"
          leftIcon={<BiPlus size={22} />}
          compact
          onClick={() => {
            handleNewNote();
            notifications.showNotification({
              message: 'New Note Created',
              color: 'green',
            });
          }}
          size="sm"
          style={{ width: '100%', marginTop: '0px' }}
        >
          New Note
        </Button>
        {notes &&
          notes.map((n) => (
            <NotePaper
              selected={n.selected}
              key={n.id}
              onClick={(e) => {
                if (e.target.nodeName === 'BUTTON') return;
                if (e.target.nodeName === 'svg') return;
                if (e.target.nodeName === 'path') return;
                handleNoteClick(n);
                setDrawerOpened(false);
              }}
            >
              <Group direction="column" spacing="xs">
                <Text
                  color={n.title === '' ? 'gray' : undefined}
                  style={{
                    fontStyle: n.title === '' ? 'italic' : undefined,
                    userSelect: 'none',
                    fontSize: '14px',
                    color: '#9c9a9a',
                  }}
                >
                  {n.title !== '' ? n.title : 'Untitled Note'}
                </Text>

                {n.tags && n.tags[0] && (
                  <Group spacing="xs" mb="4px" direction="row">
                    {n.tags.map((tag) => (
                      <Badge key={tag} size="sm">
                        {tag}
                      </Badge>
                    ))}
                    {n.selected && (
                      <ActionIcon size="sm" onClick={(e) => e.preventDefault()}>
                        <BiPlus />
                      </ActionIcon>
                    )}
                  </Group>
                )}
              </Group>
            </NotePaper>
          ))}
      </Container>
    </>
  );
};

export default Notes;
