import { Paper } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const NotePaper = ({ onClick, children, selected }) => {
  return (
    <Paper
      onClick={onClick}
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[6],
        transition: 'filter 200ms',
        display: 'flex',
        padding: '6px 6px 6px 12px',
        margin: '4px 0',
        overflow: 'hidden',
        filter: selected ? 'brightness(1.7)' : undefined,
        '&:hover': {
          filter: selected ? 'brightness(1.7)' : 'brightness(1.2)',
        },
      })}
      shadow="xs"
    >
      {children}
    </Paper>
  );
};

export default NotePaper;
