import { memo } from 'react';
import logo from '../assets/logo.png';

type Props = {
  onStartClick: () => void;
};

export const IndexScreen = memo<Props>(({ onStartClick }) => {
  return (
    <div className="grow flex flex-col justify-center items-center text-center p-8">
      <img src={logo} style={{ width: 64, height: 64 }} className="mb-2 rounded-full" />
      <h1 className="text-xl font-semibold mb-2">Senior Duck</h1>
      <p className="mb-2">Профессиональная помощь консультантов уровня senior и выше</p>
      <p className="mb-8">Первая консультация бесплатна</p>
      <button onClick={onStartClick} className="bg-indigo-500 text-white px-4 py-2 rounded-full">
        Начать
      </button>
    </div>
  );
});
