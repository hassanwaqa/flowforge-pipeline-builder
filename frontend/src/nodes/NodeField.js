import { useLayoutEffect, useRef } from 'react';
import { getDefaultValue } from './nodeRegistry';

const labelClassName = 'flex flex-col gap-1 text-xs font-semibold text-slate-600';
const controlClassName = 'w-full rounded-md border border-slate-300 bg-white px-2.5 py-2 text-xs text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

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
      <label className={labelClassName}>
        {field.label}
        <select value={value} onChange={handleChange} className={controlClassName}>
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
      <label className={labelClassName}>
        {field.label}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={`${controlClassName} min-h-16 resize-none overflow-hidden leading-5`}
        />
      </label>
    );
  }

  return (
    <label className={labelClassName}>
      {field.label}
      <input
        type={field.inputType || 'text'}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        className={controlClassName}
      />
    </label>
  );
};
