import { memo } from 'react';
import './loader.css';

export const Loader = memo(() => {
  return (
    <div className="ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
});
