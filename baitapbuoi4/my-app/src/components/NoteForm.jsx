import { useState } from 'react';

export default function NoteForm({ onAddNote }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAddNote(text);
    setText('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="note-input"
        placeholder="Nhập ghi chú mới..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn-add">
        + Thêm
      </button>
    </form>
  );
}
