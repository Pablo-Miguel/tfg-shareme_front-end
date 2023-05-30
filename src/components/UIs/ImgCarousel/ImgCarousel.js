import { AspectRatio } from "@mui/joy";
import React from "react";
import { Carousel } from "react-responsive-carousel";
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
        {stuff.map((item, index) => (
          <AspectRatio ratio="1" key={item._id}>
            <img src={item.image} alt="" />
          </AspectRatio>
        ))}
      </Carousel>
  );
};

export default ImgCarousel;