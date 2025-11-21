import { type JSX } from 'react';
import './Robo.css';

interface RoboProps {
  x: number;
  y: number;
  dir: number;
}

const Robo = ({ x, y, dir }: RoboProps): JSX.Element => {

  const style: React.CSSProperties = {
    top: `${y * 10}%`,   
    left: `${x * 10}%`,  
    transform: `rotate(${dir}deg)`,
    width: '10%',        
    height: '10%',
  };

  return (
    <div className="robo" style={style}>
      ▲
    </div>
  );
};

export default Robo;