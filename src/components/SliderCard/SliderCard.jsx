import './SliderCard.css';

const SliderCard = ({ name, img, history }) => {
  const { VITE_BACKEND_URL } = import.meta.env;

  return (
    <div className='SliderCard'>
      <img alt='Car image' className='SliderCard-img' src={`${VITE_BACKEND_URL}/${img}`} />
      <div className='SliderCard-name-history-container'>
        <h2 className='SliderCard-name'>{name}</h2>
        <div className='SliderCard-history'>{history}</div>
      </div>
    </div>
  )
};

export default SliderCard;
