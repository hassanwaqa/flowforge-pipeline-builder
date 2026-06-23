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
};

export const NodeField = ({ field, id, data, onChange }) => {
  const value = data?.[field.name] ?? getDefaultValue(field, id) ?? '';
  const handleChange = (event) => onChange(id, field.name, event.target.value);

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
