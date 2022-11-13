import React, { memo, useCallback, useState } from 'react';

type Props = {
  onSubmit: (message: string) => void;
};

export const Input = memo<Props>(({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        const message = trim(value);

        if (message) {
          onSubmit(message);
          setValue('');
        }

        e.preventDefault();
      }
    },
    [value],
  );

  const handleSubmitClick = useCallback(() => {
    const message = trim(value);

    if (message) {
      onSubmit(message);
      setValue('');
    }
  }, [value]);

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение"
        autoFocus
        className="block w-full outline-none p-4 pr-12 resize-none"
        rows={1}
      />
      {value ? (
        <div
          className="absolute right-0 top-0 bottom-0 p-4 cursor-pointer"
          onClick={handleSubmitClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </div>
      ) : null}
    </div>
  );
});

const trim = (str: string) => {
  return str.replace(/^[\s\n]+|[\s\n]+$/g, '');
};
