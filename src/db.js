import Dexie from 'dexie';

export const db = new Dexie('database');
db.version(1).stores({
  tasks: '++id, name, age', // Primary key and indexed props
  notes: '++id, description, dueDate, complete',
});
db.version(2).stores({
  tasks: '++id, description, dueDate, complete', // Primary key and indexed props
  notes: '++id, title, content',
});

db.version(3).stores({
  tasks: '++id, description, dueDate, complete', // Primary key and indexed props
  notes: '++id, title, content, selected',
});
db.version(4).stores({
  tasks: '++id, description, dueDate, complete', // Primary key and indexed props
  notes: '++id, title, content, selected, dateCreated, dateModified, tags',
});

export const updateContent = async (id, html) => {
  db.notes.update(id, { content: html });
};

export const updateTitle = async (id, updatedTitle) => {
  db.notes.update(id, { title: updatedTitle });
};

export const updateTags = async (id, updatedTags) => {
  db.notes.update(id, { tags: updatedTags });
};

export const createNote = async () => {
  const id = await db.notes.add({
    title: '',
    content: '',
    dateCreated: new Date(),
    dateModified: new Date(),
    tags: [],
  });
  return id;
};

export const selectNote = async (id) => {
  db.notes.toCollection().modify((n) => {
    if (n.id !== id) {
      n.selected = false;
    } else {
      n.selected = true;
    }
  });
};

export const setAllNotesUnselected = async () => {
  await db.notes.toCollection().modify({ selected: false });
};

export const deleteNote = async (id) => {
  await db.notes.delete(id);
};
