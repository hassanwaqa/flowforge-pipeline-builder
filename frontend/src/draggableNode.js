// draggableNode.js

import {
  Bot,
  Braces,
  Code2,
  Database,
  FileInput,
  FileOutput,
  Filter,
  GitBranch,
  Split,
  TextCursorInput,
} from 'lucide-react';

const nodeIcons = {
  customInput: FileInput,
  llm: Bot,
  customOutput: FileOutput,
  text: TextCursorInput,
  transform: Split,
  filter: Filter,
  api: Code2,
  database: Database,
  condition: GitBranch,
};

export const DraggableNode = ({ type, label }) => {
  const Icon = nodeIcons[type] || Braces;

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="flex h-24 w-28 cursor-grab flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-indigo-300"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
      draggable
    >
      <Icon size={24} strokeWidth={1.8} className="text-slate-900" />
      <span className="text-sm font-medium leading-none">{label}</span>
    </div>
  );
};
