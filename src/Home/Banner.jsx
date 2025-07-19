import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { Link } from "react-router";

// Slides with image + content
const slides = [
  {
    title: "Reduce Food Waste",
    subtitle: "Turn surplus into support. Join the movement today.",
    image: "https://i.ibb.co/4wHpTNsz/12banner.jpg"
  },
  {
    title: "Empower Local Communities",
    subtitle: "Help feed families and make an impact together.",
    image: "https://i.ibb.co/wFWpzBgP/Empower-Local-Communities.jpg"
  },
  {
    title: "Serve with Purpose",
    subtitle: "Donate food, share kindness, create change.",
    image: "https://i.ibb.co/nNsLcCwQ/banner2.jpg"
  }
];

const Banner = () => {
  return (
    <div className="w-full mt-12 ">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1000}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative  w-full h-[80vh]">
              <img
                src={slide.image}
                alt="Mission Banner"
                className="w-full rounded-2xl h-full object-cover brightness-75"
              />
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6"
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 max-w-2xl drop-shadow">
                  {slide.subtitle}
                </p>
               <Link to='/dashboard/request_charity'>
               <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-full text-white font-medium text-lg shadow-lg">
                  Get Involved
                </button>
               </Link> 
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
