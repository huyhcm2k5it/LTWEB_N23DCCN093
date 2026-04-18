import { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [
      { id: 1, text: 'Học useState để quản lý state trong component', time: '17/04/2026, 20:00' },
      { id: 2, text: 'Tìm hiểu useEffect xử lý side effects', time: '17/04/2026, 20:05' },
      { id: 3, text: 'Thực hành Context API chia sẻ dữ liệu', time: '17/04/2026, 20:10' },
      { id: 4, text: 'Thêm chức năng Dark / Light mode', time: '17/04/2026, 20:15' },
      { id: 5, text: 'Lưu dữ liệu vào localStorage bằng useEffect', time: '17/04/2026, 20:20' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const now = new Date();
    const timeString = now.toLocaleDateString('vi-VN') + ', ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    
    const newNote = {
      id: Date.now(),
      text,
      time: timeString
    };
    
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <ThemeProvider>
      <div className="container">
        <Header noteCount={notes.length} />
        <NoteForm onAddNote={addNote} />
        <NoteList notes={notes} onDelete={deleteNote} />
      </div>
    </ThemeProvider>
  );
}

export default App;
