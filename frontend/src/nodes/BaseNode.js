import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { NodeField } from './NodeField';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const nodeStyles = {
  container: {
    width: 220,
    minHeight: 92,
    border: '1px solid #1f2937',
    borderRadius: 8,
    background: '#ffffff',
    color: '#111827',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
    fontSize: 12,
    overflow: 'hidden',
  },
  header: {
    padding: '8px 10px',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: 700,
    background: '#f9fafb',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 10,
  },
  description: {
    margin: 0,
    color: '#4b5563',
    lineHeight: 1.4,
  },
};

export const BaseNode = ({ id, data, definition }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const fields = definition.fields || [];
  const handles = definition.handles || [];

  return (
    <div style={nodeStyles.container}>
      {handles.map((handle) => (
        <Handle
          key={`${handle.type}-${handle.id}`}
          type={handle.type}
          position={positionMap[handle.position]}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}

      <div style={nodeStyles.header}>{definition.label}</div>

      <div style={nodeStyles.body}>
        {definition.description && (
          <p style={nodeStyles.description}>{definition.description}</p>
        )}

        {fields.map((field) => (
          <NodeField
            key={field.name}
            field={field}
            id={id}
            data={data}
            onChange={updateNodeField}
          />
        ))}
      </div>
    </div>
  );
};
