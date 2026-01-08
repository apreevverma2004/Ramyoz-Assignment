"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchNotes = async () => {
  const res = await fetch("/api/notes");

  if (!res.ok) {
    console.error("Failed to fetch notes");
    return;
  }

  const data = await res.json();
  setNotes(data);
};


  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async () => {
    if (editId) {
      await fetch(`/api/notes/${editId}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });
      setEditId(null);
    } else {
      await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });
    }
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">📝 Notes App</h1>

        <input
          className="w-full border p-2 mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={saveNote}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Note" : "Add Note"}
        </button>

        {notes.map((note) => (
          <div key={note._id} className="mt-4 border p-3 rounded">
            <h2 className="font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <p className="text-xs text-gray-400">
              {new Date(note.createdAt).toLocaleString()}
            </p>

            <button
              onClick={() => deleteNote(note._id)}
              className="text-red-600 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
