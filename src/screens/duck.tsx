import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '../components/input';
import { Message } from '../components/message';

export const DuckScreen = () => {
  const [log, setLog] = useState<Array<{ type: 'from' | 'to'; text: string }>>([]);
  // const [isTyping, setIsTyping] = useState(false);

  const timeoutRef = useRef<any>();

  const handleSubmit = useCallback((message: string) => {
    setLog((log) => [...log, { text: message, type: 'from' }]);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setLog((log) => [...log, { text: getSeniorMessage(), type: 'to' }]);
    }, 1000 + Math.floor(Math.random() * 3000));
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="grow flex flex-col">
      <div className="grow overflow-auto flex flex-col justify-end p-4 gap-4">
        {log.length ? (
          log.map(({ text, type }, index) => (
            <Message text={text} type={type} key={`${text}-${index}`} />
          ))
        ) : (
          <p>Сформулируйте проблему максимально подробно и точно</p>
        )}
      </div>
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
