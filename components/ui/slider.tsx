import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./slider.css";

type CustomeSliderProps = {
  settings?: object;
  children: React.ReactNode;
};

function CustomeSlider({ settings, children }: CustomeSliderProps) {
  return <Slider {...settings}>{children}</Slider>;
}

export default CustomeSlider;
