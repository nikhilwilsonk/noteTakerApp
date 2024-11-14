import React, { useState, useEffect } from 'react';
import { executeQuery } from '../utils/database';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await executeQuery('SELECT * FROM Notes');
        setNotes(result);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      {notes.length === 0 ? (
        <p>You haven't created any notes yet.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold">{note.title}</h3>
              <p className="text-gray-600">{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;