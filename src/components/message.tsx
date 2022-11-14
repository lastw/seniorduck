import { memo } from 'react';

type Props = {
  text: string;
  type: 'from' | 'to';
};

export const Message = memo<Props>(({ text, type }) => {
  return (
    <div
      className={`whitespace-pre-line ${type === 'from' ? 'bg-indigo-100' : 'bg-gray-100'} ${
        type === 'from' ? 'self-end md:self-start' : ''
      } w-fit p-2 rounded-xl`}
    >
      <p className="text-xs text-gray-500 font-semibold">{type === 'from' ? 'Вы' : 'Егор'}</p>
      <p>{text}</p>
    </div>
  );
});
