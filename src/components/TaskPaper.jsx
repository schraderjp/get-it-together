import { Paper } from '@mantine/core';
import React from 'react';

const TaskPaper = ({ children, onClick, onDoubleClick }) => {
  return (
    <Paper
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[6],
        transition: 'filter 200ms',
        padding: '6px 6px 6px 12px',
        margin: '4px 0',
        display: 'flex',
        '&:hover': {
          filter: 'brightness(1.2)',
        },
      })}
      shadow="xs"
    >
      {children}
    </Paper>
  );
};

export default TaskPaper;
