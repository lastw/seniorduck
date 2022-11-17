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
      <p className="font-semibold mb-4">Бесплатные консультации с ведущими разработчиками онлайн</p>
      <p className="mb-6">Регулярные сессии с опытными разработчиками повышают качество кода</p>
      <ul className="mb-8 list-disc text-left p-4 pl-10 bg-gray-100 rounded-xl">
        <li>Наладить гармоничные отношения с другими разработчиками</li>
        <li>Справиться с тревогой и почувствовать спокойствие</li>
        <li>Принять себя и повысить свою самооценку</li>
        <li>Получить заряд энергии и перестать прокрастинировать</li>
        <li>Найти своё призвание и начать заниматься любимым делом</li>
        <li>Научиться говорить «Нет» и отстаивать свои границы</li>
      </ul>

      <button onClick={onStartClick} className="bg-indigo-500 text-white px-4 py-2 rounded-full">
        Хочу обсудить свою ситуацию
      </button>
    </div>
  );
});
