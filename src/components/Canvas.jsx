import { useRef, useState, useCallback } from 'react';
import FurnitureItem from './FurnitureItem';

const GRID_SIZE = 40; // pixels per meter unit

export default function Canvas({ theme, room, items, onDrop, onSelect, selectedId, onMove, onDelete, onRotate }) {
  const canvasRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const canvasWidth = room.width * GRID_SIZE;
  const canvasHeight = room.height * GRID_SIZE;

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / GRID_SIZE;
    const y = (e.clientY - rect.top) / GRID_SIZE;
    onDrop(e, x, y);
  }, [onDrop]);

  const handleCanvasClick = useCallback((e) => {
    if (e.target === canvasRef.current) {
      onSelect(null);
    }
  }, [onSelect]);

  // Draw grid lines
  const gridLines = [];
  for (let x = 0; x <= room.width; x++) {
    gridLines.push(
      <line
        key={`v${x}`}
        x1={x * GRID_SIZE} y1={0}
        x2={x * GRID_SIZE} y2={canvasHeight}
        stroke={theme.grid}
        strokeWidth={x % 5 === 0 ? 1.5 : 0.5}
        strokeDasharray={x % 5 === 0 ? 'none' : '3,3'}
      />
    );
  }
  for (let y = 0; y <= room.height; y++) {
    gridLines.push(
      <line
        key={`h${y}`}
        x1={0} y1={y * GRID_SIZE}
        x2={canvasWidth} y2={y * GRID_SIZE}
        stroke={theme.grid}
        strokeWidth={y % 5 === 0 ? 1.5 : 0.5}
        strokeDasharray={y % 5 === 0 ? 'none' : '3,3'}
      />
    );
  }

  // Room dimension labels
  const dimLabels = [];
  for (let x = 1; x <= room.width; x += 5) {
    dimLabels.push(
      <text key={`xl${x}`} x={x * GRID_SIZE - GRID_SIZE * 2.5} y={canvasHeight + 18}
        fontSize="11" fill={theme.grid} textAnchor="middle">{x}m</text>
    );
  }
  for (let y = 1; y <= room.height; y += 5) {
    dimLabels.push(
      <text key={`yl${y}`} x={-10} y={y * GRID_SIZE - GRID_SIZE * 2.5 + 4}
        fontSize="11" fill={theme.grid} textAnchor="end">{y}m</text>
    );
  }

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--canvas-bg)',
      padding: '40px',
    }}>
      <div style={{ position: 'relative' }}>
        {/* Room shadow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          borderRadius: '2px',
          pointerEvents: 'none',
        }} />

        {/* Wall border */}
        <div
          style={{
            position: 'relative',
            background: theme.floor,
            border: `8px solid ${theme.wall}`,
            boxShadow: `inset 0 0 0 2px ${theme.grid}`,
            cursor: 'default',
          }}
        >
          <svg
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            style={{
              display: 'block',
              outline: dragOver ? `3px dashed ${theme.accent}` : 'none',
              transition: 'outline 0.1s',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleCanvasClick}
          >
            {/* Floor */}
            <rect width={canvasWidth} height={canvasHeight} fill={theme.floor} />

            {/* Grid */}
            {gridLines}

            {/* Dimension labels */}
            {dimLabels}

            {/* Furniture items */}
            {items.map((item) => (
              <FurnitureItem
                key={item.instanceId}
                item={item}
                gridSize={GRID_SIZE}
                isSelected={item.instanceId === selectedId}
                onSelect={onSelect}
                onMove={onMove}
                onDelete={onDelete}
                onRotate={onRotate}
                canvasRef={canvasRef}
                theme={theme}
              />
            ))}
          </svg>
        </div>

        {/* Room size label */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '12px',
          color: 'var(--text-muted)',
          whiteSpace: 'nowrap',
          fontWeight: 500,
        }}>
          {room.width}m × {room.height}m
        </div>
      </div>
    </div>
  );
}
