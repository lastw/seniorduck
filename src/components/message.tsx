import { memo } from 'react';

type Props = {
  text: string;
  type: 'from' | 'to';
};

export const Message = memo<Props>(({ text, type }) => {
  return (
    <p
      className={`whitespace-pre-line ${
        type === 'from' ? 'bg-indigo-100' : 'bg-gray-100'
      } w-fit p-2 rounded-xl`}
    >
      {text}
    </p>
  );
});
