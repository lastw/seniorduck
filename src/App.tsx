import { useCallback, useState } from 'react';
import { IndexScreen } from './screens';
import { DuckScreen } from './screens/duck';
import { LoadingScreen } from './screens/loading';

function App() {
  const [screen, setScreen] = useState<'index' | 'loading' | 'duck'>('index');

  const handleStartClick = useCallback(() => {
    setScreen('loading');
  }, []);

  const handleLoadingEnd = useCallback(() => {
    setScreen('duck');
  }, []);

  return (
    <div className="grow flex">
      {(() => {
        switch (screen) {
          case 'index':
            return <IndexScreen onStartClick={handleStartClick} />;
          case 'loading':
            return <LoadingScreen onLoadingEnd={handleLoadingEnd} />;
          case 'duck':
            return <DuckScreen />;
        }
      })()}
    </div>
  );
}

export default App;
