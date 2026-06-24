// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeDefinitions } from './nodes/nodeRegistry';

export const PipelineToolbar = () => {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex flex-wrap gap-3">
        {nodeDefinitions.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
          />
        ))}
      </div>
    </div>
  );
};
