import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '../components/input';
import { Message } from '../components/message';

export const DuckScreen = () => {
  const [log, setLog] = useState<Array<{ type: 'from' | 'to'; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);

  const typingTimeoutRef = useRef<any>();
  const messageTimeoutRef = useRef<any>();

  const startTyping = () => {
    setIsTyping(true);

    clearTimeout(messageTimeoutRef.current);

    // интервал между началом печати и отправкой ответа
    messageTimeoutRef.current = setTimeout(() => {
      sendResponse();
    }, 1000 + Math.floor(Math.random() * 3000));
  };

  const sendResponse = () => {
    setIsTyping(false);
    setLog((log) => [...log, { text: getSeniorMessage(), type: 'to' }]);
  };

  const handleSubmit = useCallback((message: string) => {
    setLog((log) => [...log, { text: message, type: 'from' }]);

    // отправка сообщения начинает все таймеры заново
    clearTimeout(typingTimeoutRef.current);
    clearTimeout(messageTimeoutRef.current);

    // интервал между отправкой сообщения и началом печати ответа
    typingTimeoutRef.current = setTimeout(() => {
      startTyping();
    }, 500 + Math.floor(Math.random() * 1500));
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
          Мы подобрали вам специалиста. Его зовут <b>Егор</b>. Сформулируйте проблему максимально
          подробно и точно. Не переживайте, всё строго конфиденциально.
        </p>

        {log.map(({ text, type }, index) => (
          <Message text={text} type={type} key={`${text}-${index}`} />
        ))}
      </div>
      {isTyping && <div className="text-xs text-gray-400 px-4 pb-2">Егор набирает сообщение…</div>}
      <div className="border-t-2">
        <Input onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

const getSeniorMessage = () => {
  if (Math.random() >= 0.5) {
    return 'индид';
  }

  return 'какую проблему решаем?';
};
