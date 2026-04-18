export default function NoteList({ notes, onDelete }) {
  if (notes.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-color)', opacity: 0.7 }}>Không có ghi chú nào.</div>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <div className="note-content">
            <span className="note-icon">{note.icon || '📌'}</span>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span className="note-text">{note.text}</span>
              <span className="note-time">{note.time}</span>
            </div>
          </div>
          <button className="btn-delete" onClick={() => onDelete(note.id)}>
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}
