import { useLayoutEffect, useRef } from 'react';
import { getDefaultValue } from './nodeRegistry';

const fieldStyles = {
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    color: '#374151',
    fontWeight: 600,
  },
  control: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '6px 8px',
    fontSize: 12,
    color: '#111827',
    background: '#ffffff',
  },
  textarea: {
    minHeight: 64,
    lineHeight: 1.4,
    resize: 'none',
    overflow: 'hidden',
  },
};

export const NodeField = ({ field, id, data, onChange }) => {
  const textareaRef = useRef(null);
  const value = data?.[field.name] ?? getDefaultValue(field, id) ?? '';
  const handleChange = (event) => onChange(id, field.name, event.target.value);

  useLayoutEffect(() => {
    if (!field.autoResize || field.type !== 'textarea' || !textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [field.autoResize, field.type, value]);

  if (field.type === 'select') {
    return (
      <label style={fieldStyles.label}>
        {field.label}
        <select value={value} onChange={handleChange} style={fieldStyles.control}>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label style={fieldStyles.label}>
        {field.label}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder={field.placeholder}
          style={{ ...fieldStyles.control, ...fieldStyles.textarea }}
        />
      </label>
    );
  }

  return (
    <label style={fieldStyles.label}>
      {field.label}
      <input
        type={field.inputType || 'text'}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        style={fieldStyles.control}
      />
    </label>
  );
};
