import { type JSX } from 'react';
import './Robo.css';

interface RoboProps {
  x: number;
  y: number;
  dir: number;
}

const Robo = ({ x, y, dir }: RoboProps): JSX.Element => {
  const tileSize = 50; 

  const style: React.CSSProperties = {
    top: `${y * tileSize}px`,
    left: `${x * tileSize}px`,
    transform: `rotate(${dir}deg)`,
  };

  return (
    <div className="robo" style={style}>
      ▲
    </div>
  );
};

export default Robo;