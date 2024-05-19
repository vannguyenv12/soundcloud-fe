"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button } from "@mui/material";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import Link from "next/link";

interface IProps {
  data: ITrackTop[];
}

const MainSlider = (props: IProps) => {
  const { data } = props;

  const NextArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 0,
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightOutlined />
      </Button>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          left: 0,
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftOutlined />
      </Button>
    );
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      sx={{
        margin: "0 50px",
        ".track": {
          padding: "0 10px",

          img: {
            width: 150,
            height: 150,
          },
        },
      }}
    >
      <h2>Ballad</h2>
      <Slider {...settings}>
        {data.map((track) => (
          <div className="track" key={track.id}>
            <img src={track.imgUrl} />
            <Link href={`/track/${track.id}?audio=${track.trackUrl}`}>
              <h4>{track.title}</h4>
            </Link>
            <h5>{track.description}</h5>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default MainSlider;
