import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Attachment } from "@/types/attachment.type";
import { useState } from "react";
import { AnhSANPham } from "@/types/product.type";

interface IThumbsGallery {
  images: AnhSANPham[];
}

export const ThumbsGallery = ({ images }: IThumbsGallery) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mb-2 h-[600px]'>
        {images?.map((image) => (
          <SwiperSlide key={image?.ma_anh_san_pham}>
            <img src={image?.url_anh} className='object-cover w-full h-full rounded-md' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}>
        {images?.map((image) => (
          <SwiperSlide key={image?.ma_anh_san_pham}>
            <img src={image?.url_anh} className='object-cover w-full rounded-md' />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
