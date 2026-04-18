import { useTheme } from '../context/ThemeContext';

export default function Header({ noteCount }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="header">
      <h1>
        <span style={{ fontSize: '1.2rem' }}>📝</span> Ghi Chú Cá Nhân
      </h1>
      <div className="header-right">
        <span className="note-count">{noteCount} ghi chú</span>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}
