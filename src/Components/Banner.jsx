import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";
import slide1 from "../assets/images/slide1.jpg";
import slide2 from "../assets/images/slide2.jpg";
import slide3 from "../assets/images/slide3.jpg";

const slides = [
  {
    title: "Welcome to BuildNest",
    text: "Smart living made simple. Manage your building life effortlessly.",
    img: slide1,
    button: "Explore Apartments",
    link: "/apartments"
  },
  {
    title: "Live Smart, Live Better",
    text: "Announcements, payments, and maintenance — all in one place.",
    img: slide2,
    button: "Get Started",
    link: "/dashboard"
  },
  {
    title: "Comfort Meets Convenience",
    text: "Track dues, communicate with management, and stay informed.",
    img: slide3,
    button: "Login Now",
    link: "/login"
  },
];

const Banner = () => {
  return (
    <div className="h-[75vh] my-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/70 flex flex-col justify-center items-start px-6 md:px-20 text-slate-200 space-y-4 rounded-2xl">
                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-xl">{slide.title}</h1>
                <p className="text-lg max-w-xl drop-shadow-lg">{slide.text}</p>
                <Link to={slide.link} className="btn btn-primary slider">{slide.button}</Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
