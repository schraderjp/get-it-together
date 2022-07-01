import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../db.js';
import {
  ActionIcon,
  Button,
  Checkbox,
  Container,
  Drawer,
  Group,
  Input,
  Modal,
  SegmentedControl,
  Text,
  TextInput,
  useAccordionState,
} from '@mantine/core';
import { VscTrash } from 'react-icons/vsc';
import TaskPaper from './TaskPaper.jsx';
import { useLiveQuery } from 'dexie-react-hooks';

const Flex = styled.div`
  display: flex;
  padding: 16px 4px;
`;

const Tasks = () => {
  const [newTask, setNewTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskComplete, setSelectedTaskComplete] = useState(false);
  const myTasks = useLiveQuery(() => db.tasks.toArray());

  const handleChange = async (id, checkedValue) => {
    await db.tasks.update(id, { complete: checkedValue });
  };

  const handleAddTask = async () => {
    const taskToAdd = {
      description: newTask,
      dueDate: null,
      complete: false,
    };
    const id = await db.tasks.add(taskToAdd);
  };

  const handleDeleteTask = async (task) => {
    await db.tasks.delete(task.id);
  };

  const handleUpdateTaskDescription = async (id, newDescription) => {
    await db.tasks.update(id, { description: newDescription });
  };

  return (
    <>
      {myTasks?.map((task) => (
        <TaskPaper
          key={task.id}
          onClick={(e) => {
            console.log(e.target.nodeName);
            if (
              e.target.nodeName !== 'INPUT' &&
              e.target.nodeName !== 'BUTTON' &&
              e.target.nodeName !== 'svg' &&
              e.target.nodeName !== 'path'
            ) {
              setSelectedTask(task);
              setSelectedTaskComplete(task.complete);
              setShowModal(true);
            }
          }}
        >
          <Checkbox
            label={task.description}
            checked={task.complete}
            size="xs"
            styles={{
              label: {
                pointerEvents: 'none',
                userSelect: 'none',
                textDecoration: task.complete ? 'line-through' : undefined,
                color: task.complete ? '#555' : undefined,
              },
            }}
            onChange={(e) => handleChange(task.id, e.target.checked)}
          />
          <ActionIcon
            color="red"
            size="xs"
            ml="auto"
            onClick={() => {
              handleDeleteTask(task);
            }}
          >
            <VscTrash size={20} />
          </ActionIcon>
        </TaskPaper>
      ))}
      {selectedTask && (
        <Modal
          sx={(theme) => ({
            root: {
              zIndex: '1500',
            },
            inner: {
              zIndex: '1500',
            },
          })}
          opened={showModal}
          onClose={() => setShowModal(false)}
          title="Edit Task"
        >
          <Text mt="8px" mb="4px" size="sm">
            Description:
          </Text>
          <TextInput
            defaultValue={selectedTask.description}
            onChange={(e) => {
              handleUpdateTaskDescription(
                selectedTask.id,
                e.currentTarget.value
              );
            }}
            style={{ flexGrow: '1' }}
            mr="sm"
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '16px',
            }}
          >
            <Text mr="sm" size="sm">
              Completion Status:
            </Text>
            <Checkbox
              checked={selectedTaskComplete}
              onChange={(e) => {
                handleChange(selectedTask.id, e.target.checked);
                setSelectedTaskComplete(e.target.checked);
              }}
            />
          </div>

          <Flex>
            <ActionIcon
              color="red"
              onClick={() => {
                handleDeleteTask(selectedTask);
                setModalShown(false);
              }}
            >
              <VscTrash size={30} />
            </ActionIcon>
          </Flex>
        </Modal>
      )}
    </>
  );
};

export default Tasks;
