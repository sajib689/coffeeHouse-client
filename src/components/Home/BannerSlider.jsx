"use client";

import { useState } from "react";

const BannerSlider = () => {
  const slides = [
    {
      image: "https://picsum.photos/seed/coffee1/1200/600", // Placeholder image 1
      title: "Welcome to CoffeeHouse",
      subtitle: "The best coffee in town, made with love and passion.",
    },
    {
      image: "https://picsum.photos/seed/coffee2/1200/600", // Placeholder image 2
      title: "Freshly Brewed Every Day",
      subtitle: "Experience the rich aroma and taste of freshly brewed coffee.",
    },
    {
      image: "https://picsum.photos/seed/coffee3/1200/600", // Placeholder image 3
      title: "Relax and Unwind",
      subtitle: "Find your peace in a cup of coffee. Join us today.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="relative w-full h-96 sm:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2">{slides[currentSlide].title}</h2>
          <p className="text-lg sm:text-xl">{slides[currentSlide].subtitle}</p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-[#6F4F37] hover:text-white transition duration-200"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-[#6F4F37] hover:text-white transition duration-200"
      >
        &#10095;
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full bg-white opacity-60 hover:opacity-100 transition duration-300 ${
              currentSlide === index ? "opacity-100" : ""
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
