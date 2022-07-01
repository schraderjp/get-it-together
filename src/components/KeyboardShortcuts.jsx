import React from 'react';
import { Kbd, Table, Text } from '@mantine/core';

const shortcuts = [
  {
    name: <Text weight="bold">H1</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Alt</Kbd>+<Kbd>1</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">H2</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Alt</Kbd>+<Kbd>1</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">H3</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Alt</Kbd>+<Kbd>1</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Bold</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>B</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Italic</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>I</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Underline</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>U</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Strike</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>X</Kbd>
      </>
    ),
  },

  {
    name: <Text weight="bold">Inline Code</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>E</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Code Block</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Alt</Kbd>+<Kbd>C</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Align Left</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>L</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Align Center</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>E</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Align Right</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>R</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Align Justify</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>J</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Quote Block</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>B</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Bullet List</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>8</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Numbered List</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>7</Kbd>
      </>
    ),
  },
  {
    name: <Text weight="bold">Checklist</Text>,
    keys: (
      <>
        <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>9</Kbd>
      </>
    ),
  },
];

const KeyboardShortcuts = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Shorcut</th>
        </tr>
      </thead>
      <tbody>
        {shortcuts.map((shortcut, index) => (
          <tr key={index}>
            <td>{shortcut.name}</td>
            <td>{shortcut.keys}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default KeyboardShortcuts;
