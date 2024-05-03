import Card from '@/components/Card/Card';

import './CardList.css';

const CardList = ({ cars }) => {
  return (
    <div className='CardList'>
      {cars.map(car => <Card key={car._id} {...car} />)}
    </div>
  );
};

export default CardList;
