import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Banner1 from "../../images/banner1.png";
import Banner2 from "../../images/banner2.png";
import Banner3 from "../../images/banner3.png";
import Banner4 from "../../images/banner4.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView="auto"
        navigation
        spaceBetween={300}
        pagination={{ clickable: true }}
        loop={true}
      >
        <SwiperSlide>
          <img src={Banner1} alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner2} alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner3} alt="banner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner4} alt="banner" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Banner;
