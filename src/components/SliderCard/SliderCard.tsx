import './SliderCard.css';

interface SliderCardProps {
  name: string;
  img: string;
  history: string;
  className?: string;
}

const SliderCard = ({
  name,
  img,
  history,
  className = '',
}: SliderCardProps): JSX.Element => {
  const { VITE_BACKEND_URL } = import.meta.env;

  return (
    <div className={`SliderCard ${className}`}>
      <img
        alt='Car image'
        className='SliderCard-img'
        src={`${VITE_BACKEND_URL}/assets/images/${img}`}
      />
      <div className='SliderCard-name-history-container'>
        <h2 className='SliderCard-name'>{name}</h2>
        <div className='SliderCard-history'>{history}</div>
      </div>
    </div>
  );
};

export default SliderCard;
