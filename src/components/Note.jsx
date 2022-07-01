import { ActionIcon, Container, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { RiFileAddLine } from 'react-icons/ri';
import { VscTrash } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import { db, deleteNote, selectNote } from '../db.js';
import TextEditor from './TextEditor.jsx';
import { AiOutlineFullscreen } from 'react-icons/ai';
const appApi = window.app;
const Note = ({
  note,
  editor,
  drawerOpened,
  setNote,
  isFullScreen,
  setIsFullScreen,
  setDateCreated,
  setDateModified,
  dateCreated,
  handleNewNote,
  dateModified,
  title,
  setTitle,
}) => {
  return (
    <>
      {note && (
        <>
          <TextEditor
            editor={editor}
            setTitle={setTitle}
            title={title}
            note={note}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            setNote={setNote}
            handleNewNote={handleNewNote}
            drawerOpened={drawerOpened}
            dateModified={dateModified}
            setDateModified={setDateModified}
            dateCreated={dateCreated}
            setDateCreated={setDateCreated}
          />
        </>
      )}
    </>
  );
};

export default Note;
