import React from "react";
import { Carousel } from "react-responsive-carousel";

import { AspectRatio } from "@mui/joy";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImgCarousel = ({ stuff }) => {

  return (
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={true}
        showArrows={true}
        interval={6000}
      >
        {stuff.map((item) => (
          <AspectRatio ratio="1" key={item._id}>
            <img src={item.image} alt={item.nickName} />
          </AspectRatio>
        ))}
      </Carousel>
  );
};

export default ImgCarousel;
