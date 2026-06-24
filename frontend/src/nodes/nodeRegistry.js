const textOptions = [
  { value: 'Text', label: 'Text' },
  { value: 'File', label: 'File' },
];

const operationOptions = [
  { value: 'Map', label: 'Map' },
  { value: 'Normalize', label: 'Normalize' },
  { value: 'Summarize', label: 'Summarize' },
];

const variablePattern = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;
const textNodeDefaultValue = '{{input}}';

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const getTextNodeValue = (data) => {
  return data?.text ?? textNodeDefaultValue;
};

const getTextNodeVariables = (text) => {
  const variables = [];
  const seenVariables = new Set();

  for (const match of text.matchAll(variablePattern)) {
    const variableName = match[1];

    if (!seenVariables.has(variableName)) {
      seenVariables.add(variableName);
      variables.push(variableName);
    }
  }

  return variables;
};

const getTextNodeWidth = (text) => {
  const textNodeMinWidth = 220;
  const textNodeMaxWidth = 520;
  const longestLineLength = text
    .split('\n')
    .reduce((longest, line) => Math.max(longest, line.length), 0);

  return clamp(180 + longestLineLength * 8, textNodeMinWidth, textNodeMaxWidth);
};

export const nodeDefinitions = [
  {
    type: 'customInput',
    label: 'Input',
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: (id) => id.replace('customInput-', 'input_'),
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: textOptions,
      },
    ],
    handles: [{ type: 'source', position: 'right', id: 'value' }],
  },
  {
    type: 'llm',
    label: 'LLM',
    description: 'Generates a response from system and prompt inputs.',
    handles: [
      {
        type: 'target',
        position: 'left',
        id: 'system',
        style: { top: `${100 / 3}%` },
      },
      {
        type: 'target',
        position: 'left',
        id: 'prompt',
        style: { top: `${200 / 3}%` },
      },
      { type: 'source', position: 'right', id: 'response' },
    ],
  },
  {
    type: 'customOutput',
    label: 'Output',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: (id) => id.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' },
        ],
      },
    ],
    handles: [{ type: 'target', position: 'left', id: 'value' }],
  },
  {
    type: 'text',
    label: 'Text',
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: textNodeDefaultValue,
        autoResize: true,
      },
    ],
    handles: [{ type: 'source', position: 'right', id: 'output' }],
    getNodeStyle: ({ data }) => ({
      width: getTextNodeWidth(getTextNodeValue(data)),
    }),
    getDynamicHandles: ({ data }) => {
      const variables = getTextNodeVariables(getTextNodeValue(data));

      return variables.map((variableName, index) => ({
        type: 'target',
        position: 'left',
        id: `variable-${variableName}`,
        style: {
          top: `${((index + 1) * 100) / (variables.length + 1)}%`,
        },
      }));
    },
  },
  {
    type: 'transform',
    label: 'Transform',
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'Map',
        options: operationOptions,
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'input' },
      { type: 'source', position: 'right', id: 'output' },
    ],
  },
  {
    type: 'filter',
    label: 'Filter',
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'text',
        defaultValue: 'status === "active"',
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'input' },
      { type: 'source', position: 'right', id: 'passed' },
    ],
  },
  {
    type: 'api',
    label: 'API',
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' },
        ],
      },
      {
        name: 'endpoint',
        label: 'Endpoint',
        type: 'text',
        defaultValue: '/api/resource',
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'request' },
      { type: 'source', position: 'right', id: 'response' },
    ],
  },
  {
    type: 'database',
    label: 'Database',
    fields: [
      {
        name: 'table',
        label: 'Table',
        type: 'text',
        defaultValue: 'users',
      },
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'Select',
        options: [
          { value: 'Select', label: 'Select' },
          { value: 'Insert', label: 'Insert' },
          { value: 'Update', label: 'Update' },
        ],
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'query' },
      { type: 'source', position: 'right', id: 'rows' },
    ],
  },
  {
    type: 'condition',
    label: 'Condition',
    fields: [
      {
        name: 'expression',
        label: 'Expression',
        type: 'text',
        defaultValue: 'score > 0.8',
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'input' },
      {
        type: 'source',
        position: 'right',
        id: 'true',
        style: { top: '40%' },
      },
      {
        type: 'source',
        position: 'right',
        id: 'false',
        style: { top: '65%' },
      },
    ],
  },
];

export const getDefaultValue = (field, nodeId) => {
  if (typeof field.defaultValue === 'function') {
    return field.defaultValue(nodeId);
  }

  return field.defaultValue;
};

export const getNodeDefaultData = (type, nodeId) => {
  const definition = nodeDefinitions.find((node) => node.type === type);
  const fieldDefaults = {};

  definition?.fields?.forEach((field) => {
    const defaultValue = getDefaultValue(field, nodeId);

    if (defaultValue !== undefined) {
      fieldDefaults[field.name] = defaultValue;
    }
  });

  return {
    id: nodeId,
    nodeType: type,
    ...fieldDefaults,
  };
};
