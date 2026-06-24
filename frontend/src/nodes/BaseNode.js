import { useEffect } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import { NodeField } from './NodeField';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const BaseNode = ({ id, data, definition }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const updateNodeField = useStore((state) => state.updateNodeField);
  const fields = definition.fields || [];
  const staticHandles = definition.handles || [];
  const dynamicHandles = definition.getDynamicHandles?.({ id, data }) || [];
  const handles = [...staticHandles, ...dynamicHandles];
  const dynamicNodeStyles = definition.getNodeStyle?.({ id, data }) || {};
  const dynamicNodeStyleSignature = JSON.stringify(dynamicNodeStyles);
  const nodeDataSignature = JSON.stringify(data || {});
  const handleSignature = handles
    .map((handle) => `${handle.type}:${handle.position}:${handle.id}:${handle.style?.top || ''}`)
    .join('|');

  useEffect(() => {
    updateNodeInternals(id);
  }, [
    dynamicNodeStyleSignature,
    handleSignature,
    id,
    nodeDataSignature,
    updateNodeInternals,
  ]);

  return (
    <div
      className="min-h-[92px] w-[220px] overflow-visible rounded-lg border border-slate-300 bg-white text-xs text-slate-900 shadow-sm"
      style={dynamicNodeStyles}
    >
      {handles.map((handle) => (
        <Handle
          key={`${handle.type}-${handle.id}`}
          type={handle.type}
          position={positionMap[handle.position]}
          id={`${id}-${handle.id}`}
          className="!h-2.5 !w-2.5 !border-2 !border-white !bg-indigo-500"
          style={handle.style}
        />
      ))}

      <div className="rounded-t-[7px] border-b border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
        {definition.label}
      </div>

      <div className="flex flex-col gap-2.5 p-3">
        {definition.description && (
          <p className="m-0 text-xs leading-5 text-slate-500">
            {definition.description}
          </p>
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
