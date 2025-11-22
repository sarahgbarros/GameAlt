import type { JSX } from 'react';
import Robo from '../Robo/Robo';
import './Arena.css';

interface ArenaProps {
  robotState: {
    x: number;
    y: number;
    dir: number;
  };
}

const Arena = ({ robotState }: ArenaProps): JSX.Element => {
  return (
    <div className="arena-grid">
      <Robo x={robotState.x} y={robotState.y} dir={robotState.dir} />
    </div>
  );
};

export default Arena;