import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./banner.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Banner = () => {
  return (
    <div className="banner">
        
    </div>
  )
}

export default Banner;