import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '../components/input';
import { Message } from '../components/message';
import { draw } from '../lib/random';
import { experts } from '../data/experts';

export const DuckScreen = () => {
  const [log, setLog] = useState<Array<{ type: 'from' | 'to'; text: string; name: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [expert] = useState(() => draw(experts));

  const typingTimeoutRef = useRef<any>();
  const messageTimeoutRef = useRef<any>();

  const startTyping = () => {
    setIsTyping(true);

    clearTimeout(messageTimeoutRef.current);

    // интервал между началом печати и отправкой ответа
    messageTimeoutRef.current = setTimeout(
      () => {
        sendResponse();
      },
      1000 + Math.floor(Math.random() * 3000),
    );
  };

  const sendResponse = () => {
    setIsTyping(false);
    setLog((log) => [...log, { text: draw(expert.messages), type: 'to', name: expert.name }]);
  };

  const handleSubmit = useCallback((message: string) => {
    setLog((log) => [...log, { text: message, type: 'from', name: 'Вы' }]);

    // отправка сообщения начинает все таймеры заново
    clearTimeout(typingTimeoutRef.current);
    clearTimeout(messageTimeoutRef.current);

    // интервал между отправкой сообщения и началом печати ответа
    typingTimeoutRef.current = setTimeout(
      () => {
        startTyping();
      },
      500 + Math.floor(Math.random() * 1500),
    );
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeoutRef.current);
      clearTimeout(messageTimeoutRef.current);
    };
  }, []);

  return (
    <div className="grow flex flex-col">
      <div className="grow overflow-auto flex flex-col justify-end p-4 gap-4">
        <p className="px-3 py-2 bg-gray-100 rounded-xl text-sm self-center">
          Мы подобрали вам специалиста. Его зовут <b>{expert.name}</b>. Сформулируйте проблему
          максимально подробно и точно. Не переживайте, всё строго конфиденциально.
        </p>

        {log.map(({ text, type, name }, index) => (
          <Message text={text} type={type} name={name} key={`${text}-${index}`} />
        ))}
      </div>
      {isTyping && (
        <div className="text-xs text-gray-400 px-4 pb-2">{expert.name} набирает сообщение…</div>
      )}
      <div className="border-t-2">
        <Input onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
