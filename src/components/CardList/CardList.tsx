import { Car } from '@/types';
import Card from '@/components/Card/Card';

import './CardList.css';

interface CardListProps {
  cars: Car[];
}

const CardList = ({ cars }: CardListProps) => {
  return (
    <div className='CardList'>
      {cars.map(car => (
        <Card
          key={car._id}
          id={car._id}
          img={car.img}
          name={`${car.name}`}
          description={car.description}
        />
      ))}
    </div>
  );
};

export default CardList;
