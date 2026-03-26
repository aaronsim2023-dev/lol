import { useRef, useCallback } from 'react';

export default function FurnitureItem({ item, gridSize, isSelected, onSelect, onMove, onDelete, onRotate, canvasRef, theme }) {
  const dragStart = useRef(null);

  const w = item.rotation % 180 === 0 ? item.width * gridSize : item.height * gridSize;
  const h = item.rotation % 180 === 0 ? item.height * gridSize : item.width * gridSize;
  const x = item.x * gridSize;
  const y = item.y * gridSize;

  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();
    onSelect(item.instanceId);

    const svgRect = canvasRef.current.getBoundingClientRect();
    dragStart.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: item.x,
      origY: item.y,
    };

    const handleMouseMove = (ev) => {
      const dx = (ev.clientX - dragStart.current.startX) / gridSize;
      const dy = (ev.clientY - dragStart.current.startY) / gridSize;
      const newX = Math.max(0, dragStart.current.origX + dx);
      const newY = Math.max(0, dragStart.current.origY + dy);
      onMove(item.instanceId, newX, newY);
    };

    const handleMouseUp = () => {
      dragStart.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [item, gridSize, onSelect, onMove, canvasRef]);

  const handleKeyDown = useCallback((e) => {
    if (!isSelected) return;
    const step = e.shiftKey ? 1 : 0.5;
    switch (e.key) {
      case 'ArrowLeft': onMove(item.instanceId, item.x - step, item.y); e.preventDefault(); break;
      case 'ArrowRight': onMove(item.instanceId, item.x + step, item.y); e.preventDefault(); break;
      case 'ArrowUp': onMove(item.instanceId, item.x, item.y - step); e.preventDefault(); break;
      case 'ArrowDown': onMove(item.instanceId, item.x, item.y + step); e.preventDefault(); break;
      case 'r': case 'R': onRotate(item.instanceId); e.preventDefault(); break;
      case 'Delete': case 'Backspace': onDelete(item.instanceId); e.preventDefault(); break;
    }
  }, [isSelected, item, onMove, onRotate, onDelete]);

  const itemColor = item.color || '#8B7355';
  const darkerColor = shadeColor(itemColor, -20);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'grab' }}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      tabIndex={isSelected ? 0 : -1}
    >
      {/* Drop shadow */}
      <rect
        x={3} y={3}
        width={w} height={h}
        rx={4}
        fill="rgba(0,0,0,0.15)"
      />

      {/* Main body */}
      <rect
        width={w} height={h}
        rx={4}
        fill={itemColor}
        stroke={isSelected ? theme.accent : darkerColor}
        strokeWidth={isSelected ? 2.5 : 1}
      />

      {/* Inner highlight */}
      <rect
        x={2} y={2}
        width={w - 4} height={Math.min(8, h / 4)}
        rx={2}
        fill="rgba(255,255,255,0.2)"
      />

      {/* Emoji label */}
      <foreignObject x={0} y={0} width={w} height={h}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <span style={{ fontSize: Math.min(w, h) * 0.4, lineHeight: 1 }}>{item.emoji}</span>
          {(w > 60 && h > 30) && (
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: '2px', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
              {item.label}
            </span>
          )}
        </div>
      </foreignObject>

      {/* Selection handles */}
      {isSelected && (
        <>
          {/* Corner handles */}
          {[[0,0],[w,0],[0,h],[w,h]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={5} fill={theme.accent} stroke="#fff" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
          ))}

          {/* Rotate button */}
          <g
            transform={`translate(${w / 2 - 12}, ${-24})`}
            style={{ cursor: 'pointer' }}
            onMouseDown={(e) => {
              e.stopPropagation();
              onRotate(item.instanceId);
            }}
          >
            <rect width={24} height={20} rx={4} fill={theme.accent} />
            <text x={12} y={14} textAnchor="middle" fontSize={12} fill="#fff">↻</text>
          </g>

          {/* Delete button */}
          <g
            transform={`translate(${w - 12}, ${-24})`}
            style={{ cursor: 'pointer' }}
            onMouseDown={(e) => {
              e.stopPropagation();
              onDelete(item.instanceId);
            }}
          >
            <rect width={20} height={20} rx={4} fill="#E74C3C" />
            <text x={10} y={14} textAnchor="middle" fontSize={12} fill="#fff">×</text>
          </g>
        </>
      )}
    </g>
  );
}

function shadeColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0xff) + percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
