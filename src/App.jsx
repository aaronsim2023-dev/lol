import { useState, useCallback, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import RightPanel from './components/RightPanel';
import Toolbar from './components/Toolbar';
import { STYLE_THEMES, ROOM_PRESETS } from './data/furniture';

let instanceCounter = 0;

const MAX_HISTORY = 50;

export default function App() {
  const [theme, setTheme] = useState(STYLE_THEMES[0]);
  const [room, setRoom] = useState({ width: ROOM_PRESETS[0].width, height: ROOM_PRESETS[0].height, name: ROOM_PRESETS[0].label });
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const dragItemRef = useRef(null);

  // CSS variables for theming
  const isDark = theme.id === 'industrial' || theme.id === 'luxury';
  const cssVars = {
    '--bg': isDark ? '#1a1a1a' : '#f8f7f5',
    '--panel-bg': isDark ? '#242424' : '#ffffff',
    '--border': isDark ? '#333' : '#e8e3dc',
    '--text': isDark ? '#e8e8e8' : '#1a1612',
    '--text-muted': isDark ? '#888' : '#9a9189',
    '--accent': theme.accent,
    '--canvas-bg': isDark ? '#111' : '#ece9e4',
  };

  const pushHistory = useCallback((newItems) => {
    setHistory((h) => {
      const newHistory = h.slice(0, historyIndex + 1);
      newHistory.push(newItems);
      if (newHistory.length > MAX_HISTORY) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex((i) => Math.min(i + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  const updateItems = useCallback((newItems) => {
    setItems(newItems);
    pushHistory(newItems);
  }, [pushHistory]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((i) => i - 1);
      setItems(history[historyIndex - 1]);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((i) => i + 1);
      setItems(history[historyIndex + 1]);
    }
  }, [historyIndex, history]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') { e.preventDefault(); handleUndo(); }
        if (e.key === 'y' || (e.shiftKey && e.key === 'z')) { e.preventDefault(); handleRedo(); }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleUndo, handleRedo]);

  const handleDragStart = useCallback((e, item) => {
    dragItemRef.current = item;
    e.dataTransfer.effectAllowed = 'copy';
  }, []);

  const handleDrop = useCallback((e, x, y) => {
    const item = dragItemRef.current;
    if (!item) return;
    dragItemRef.current = null;
    const newItem = {
      ...item,
      instanceId: `${item.id}-${++instanceCounter}`,
      x: Math.max(0, x - item.width / 2),
      y: Math.max(0, y - item.height / 2),
      rotation: 0,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    pushHistory(newItems);
    setSelectedId(newItem.instanceId);
  }, [items, pushHistory]);

  const handleMove = useCallback((instanceId, x, y) => {
    setItems((prev) => prev.map((item) =>
      item.instanceId === instanceId ? { ...item, x: Math.max(0, x), y: Math.max(0, y) } : item
    ));
  }, []);

  const handleDelete = useCallback((instanceId) => {
    const newItems = items.filter((i) => i.instanceId !== instanceId);
    updateItems(newItems);
    setSelectedId(null);
  }, [items, updateItems]);

  const handleRotate = useCallback((instanceId) => {
    const newItems = items.map((item) =>
      item.instanceId === instanceId
        ? { ...item, rotation: ((item.rotation || 0) + 90) % 360 }
        : item
    );
    updateItems(newItems);
  }, [items, updateItems]);

  const handleClear = useCallback(() => {
    if (items.length === 0) return;
    if (confirm('Clear all furniture from the room?')) {
      updateItems([]);
      setSelectedId(null);
    }
  }, [items, updateItems]);

  const handleColorChange = useCallback((color) => {
    if (!selectedId) return;
    const newItems = items.map((item) =>
      item.instanceId === selectedId ? { ...item, color } : item
    );
    updateItems(newItems);
  }, [selectedId, items, updateItems]);

  const handleExport = useCallback(() => {
    alert('Export feature: Use browser Print (Ctrl+P) → Save as PDF, or take a screenshot!');
  }, []);

  const [shareStatus, setShareStatus] = useState(null);

  const handleShareToTelegram = useCallback(async () => {
    const agentUrl = import.meta.env.VITE_TELEGRAM_AGENT_URL || 'http://localhost:3001';
    setShareStatus('sending');
    try {
      const res = await fetch(`${agentUrl}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room, items, theme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setShareStatus('ok');
      setTimeout(() => setShareStatus(null), 3000);
    } catch (err) {
      console.error('Share to Telegram error:', err.message);
      setShareStatus('err');
      setTimeout(() => setShareStatus(null), 4000);
    }
  }, [room, items, theme]);

  const selectedItem = items.find((i) => i.instanceId === selectedId);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        ...cssVars,
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <Toolbar
        room={room}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onExport={handleExport}
        onShareToTelegram={handleShareToTelegram}
        shareStatus={shareStatus}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar onDragStart={handleDragStart} />
        <Canvas
          theme={theme}
          room={room}
          items={items}
          onDrop={handleDrop}
          onSelect={setSelectedId}
          selectedId={selectedId}
          onMove={handleMove}
          onDelete={handleDelete}
          onRotate={handleRotate}
        />
        <RightPanel
          theme={theme}
          setTheme={setTheme}
          room={room}
          setRoom={setRoom}
          items={items}
          onClear={handleClear}
          selectedItem={selectedItem}
          onColorChange={handleColorChange}
        />
      </div>
    </div>
  );
}
