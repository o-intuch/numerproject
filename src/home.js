import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

// .carousel-items > img{
//     width: 50% ;
// }


const items = [
  {
    src: 'https://scontent.fbkk12-4.fna.fbcdn.net/v/t1.15752-9/175978501_305883387584155_355807542191286087_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeFyb10wTEiZnABm2fcE5X0yTAl32KDNum1MCXfYoM26bYmgY_6bjm9qLSe-gRIZv9zzjbPnSjfoRb5AFHLnhExn&_nc_ohc=7wF37_DlaEgAX9MxmkQ&_nc_ht=scontent.fbkk12-4.fna&oh=4230fda5789336c34cd0b3677a2ccd12&oe=60A46E26',
    altText: 'Slide 1',
    caption2: 'Project Numer'
  },
  {
    src: 'https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.6435-9/86697340_200696017970968_3233910228412006400_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=730e14&_nc_eui2=AeF0TUm3rPcpGV8-bmlvByywx0ZJCUfQcAjHRkkJR9BwCHYjjwtPmj7cYDXt_INcpusegMK5LvhvGI0sUGxi8p9p&_nc_ohc=0EibTHyrjV0AX9QJJpJ&_nc_ht=scontent.fbkk12-2.fna&oh=6cdf7eef83816bd3abb43270abd22828&oe=60A574E9',
    altText: 'Slide 2',
    caption: '6104062636181',
    caption2: 'Intuch chairaksirikul'
  }
];

const Homepage = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} style={{width: "100%"}} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption2} />
      </CarouselItem>
    );
  });

  return (
    <div className="container">
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    </div>
  );
}

export default Homepage;