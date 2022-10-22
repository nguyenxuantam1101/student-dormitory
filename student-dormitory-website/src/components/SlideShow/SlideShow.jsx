import './slideShow.scss';
import { SlideData } from './SlideData';
import BtnSlide from './BtnSlide';
import { useState, useEffect } from 'react';

function SlideShow() {
  const [slideIndex, setSlideIndex] = useState(1);

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    if (slideIndex !== SlideData.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === SlideData.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(SlideData.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }
  useEffect(() => {
    setSlideIndex(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [slideIndex]);

  return (
    <div className="container-slider">
      {SlideData.map((slide, index) => {
        return (
          <div key={index} className={slideIndex === index + 1 ? 'slide active-anim' : 'slide'}>
            <img src={slide.image} alt="slideShow" />
          </div>
        );
      })}
      <BtnSlide moveSlide={nextSlide} direction={'next'} />
      <BtnSlide moveSlide={prevSlide} direction={'prev'} />

      <div className="container-dots">
        {Array.from({ length: SlideData.length }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? 'dot active' : 'dot'}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SlideShow;
