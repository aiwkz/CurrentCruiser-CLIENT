import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCarsStore } from '@/stores/carsStore';
import { INITIAL_CURRENT_CAR_DATA } from '@/constants/constants';

import './CardDetails.css';

type TabKey = 'overview' | 'history' | 'description';

const prettifySpecKey = (key: string): string => {
  const normalized = key.toLowerCase();

  if (normalized === 'mph0to60') return '0–60';
  if (normalized === 'topspeed') return 'Top speed';
  if (normalized === 'horsepower') return 'Power';

  return key
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, c => c.toUpperCase());
};

const CardDetails = (): JSX.Element => {
  const currentCar = useCarsStore(state => state.currentCar);
  const setCurrentCar = useCarsStore(state => state.setCurrentCar);
  const navigate = useNavigate();
  const { VITE_BACKEND_URL } = import.meta.env;

  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  useEffect(() => {
    if (currentCar._id === '') navigate('/');
  }, [currentCar._id, navigate]);

  const handleBackClick = () => {
    navigate('/');
    setCurrentCar(INITIAL_CURRENT_CAR_DATA);
  };

  const specsEntries = useMemo(() => {
    return Object.entries(currentCar.specifications ?? {});
  }, [currentCar.specifications]);

  return (
    <div className='CardDetails'>
      <div className='CardDetails-container'>
        <header className='CardDetails-header'>
          <button
            type='button'
            className='CardDetails-back'
            onClick={handleBackClick}
            aria-label='Go back'
          >
            <span aria-hidden='true'>←</span>
            <span>Back</span>
          </button>

          <h1 className='CardDetails-title'>{currentCar.name}</h1>
        </header>

        <section className='CardDetails-main'>
          <div className='CardDetails-mediaCard'>
            <div className='CardDetails-imageWrap'>
              <img
                alt={`${currentCar.name} image`}
                className='CardDetails-img'
                src={`${VITE_BACKEND_URL}/assets/images/${currentCar.img}`}
              />
            </div>
          </div>

          <aside className='CardDetails-infoCard'>
            <div
              className='CardDetails-tabs'
              role='tablist'
              aria-label='Car details tabs'
            >
              <button
                type='button'
                role='tab'
                aria-selected={activeTab === 'overview'}
                className={`CardDetails-tab ${activeTab === 'overview' ? 'isActive' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>

              <button
                type='button'
                role='tab'
                aria-selected={activeTab === 'history'}
                className={`CardDetails-tab ${activeTab === 'history' ? 'isActive' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                History
              </button>

              <button
                type='button'
                role='tab'
                aria-selected={activeTab === 'description'}
                className={`CardDetails-tab ${activeTab === 'description' ? 'isActive' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
            </div>

            <div className='CardDetails-panel' role='tabpanel'>
              {activeTab === 'overview' && (
                <>
                  <h2 className='CardDetails-panelTitle'>Key specs</h2>
                  <dl className='CardDetails-specsGrid'>
                    {specsEntries.map(([key, value]) => (
                      <div className='CardDetails-specRow' key={key}>
                        <dt className='CardDetails-specKey'>
                          {prettifySpecKey(key)}
                        </dt>
                        <dd className='CardDetails-specValue'>
                          {String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}

              {activeTab === 'history' && (
                <>
                  <h2 className='CardDetails-panelTitle'>History</h2>
                  <p className='CardDetails-text'>
                    {currentCar.history || 'No history available.'}
                  </p>
                </>
              )}

              {activeTab === 'description' && (
                <>
                  <h2 className='CardDetails-panelTitle'>Description</h2>
                  <p className='CardDetails-text'>
                    {currentCar.description || 'No description available.'}
                  </p>
                </>
              )}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default CardDetails;
