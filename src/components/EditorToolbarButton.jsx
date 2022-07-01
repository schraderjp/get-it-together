import React from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';

const EditorToolbarButton = ({
  editor,
  icon,
  tooltipLabel,
  activeString,
  command,
}) => {
  return (
    <Tooltip color="gray" label={tooltipLabel || null}>
      <ActionIcon
        my="1px"
        size="md"
        mx="0px"
        onClick={command}
        variant={
          activeString !== '' && editor.isActive(activeString)
            ? 'filled'
            : undefined
        }
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};

export default EditorToolbarButton;
