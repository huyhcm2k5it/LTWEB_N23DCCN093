import { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes_v2');
    return savedNotes ? JSON.parse(savedNotes) : [
      { id: 1, text: 'Học useState để quản lý state trong component', time: '17/04/2026, 20:00', icon: '📚' },
      { id: 2, text: 'Tìm hiểu useEffect xử lý side effects', time: '17/04/2026, 20:05', icon: '⚡' },
      { id: 3, text: 'Thực hành Context API chia sẻ dữ liệu', time: '17/04/2026, 20:10', icon: '🔗' },
      { id: 4, text: 'Thêm chức năng Dark / Light mode', time: '17/04/2026, 20:15', icon: '🌙' },
      { id: 5, text: 'Lưu dữ liệu vào localStorage bằng useEffect', time: '17/04/2026, 20:20', icon: '💾' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('notes_v2', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const now = new Date();
    const timeString = now.toLocaleDateString('vi-VN') + ', ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    
    const newNote = {
      id: Date.now(),
      text,
      time: timeString,
      icon: '📌'
    };
    
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <Header noteCount={notes.length} />
        <div className="container">
          <NoteForm onAddNote={addNote} />
          <NoteList notes={notes} onDelete={deleteNote} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
