import { memo, useEffect, useState } from 'react';
import { Loader } from '../components/loader';

type Props = {
  onLoadingEnd: () => void;
};
export const LoadingScreen = memo<Props>(({ onLoadingEnd }) => {
  const [stage, setStage] = useState<'step1' | 'step2'>('step1');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStage('step2');
    }, 1234);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onLoadingEnd();
    }, 2345);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="grow flex flex-col justify-center items-center p-8">
      <p>{stage === 'step1' ? 'Ищем специалиста…' : 'Соединяем…'}</p>
      <Loader />
    </div>
  );
});
