import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import "./checkout.css";
import gsap from "gsap";

export const Checkout = ({ history }: any) => {
  let state = {
    num: 60,
    vw: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    vh: Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    ),
  };
  let starryNight = () => {
    anime({
      targets: ["#sky .star"],
      opacity: [
        {
          duration: 700,
          value: "0",
        },
        {
          duration: 700,
          value: "1",
        },
      ],
      easing: "linear",
      loop: true,
      delay: (el, i) => 50 * i,
    });
  };
  let shootingStars = () => {
    anime({
      targets: ["#shootingstars .wish"],
      easing: "linear",
      loop: true,
      delay: (el, i) => 1000 * i,
      opacity: [
        {
          duration: 700,
          value: "1",
        },
      ],
      width: [
        {
          value: "150px",
        },
        {
          value: "0px",
        },
      ],
      translateX: 350,
    });
  };
  let randomRadius = () => {
    return Math.random() * 0.7 + 0.6;
  };
  let getRandomX = () => {
    return Math.floor(Math.random() * Math.floor(state.vw)).toString();
  };
  let getRandomY = () => {
    return Math.floor(Math.random() * Math.floor(state.vh)).toString();
  };

  //   componentDidMount() {
  //     this.starryNight();
  //     this.shootingStars();
  //   }

  const { num } = state;
  useEffect(() => {
    starryNight();
    shootingStars();
    circle.play();
    setTimeout(() => {
      history.push("/");
    }, 4000);
  }, []);

  var circle = anime({
    targets: [".loader"],
    rotate: 180,
    duration: 1600,
    loop: true,
    elasticity: 600,
    easing: "easeOutElastic",
    delay: function (el, index) {
      return index * 80;
    },
  });
  return (
    <div id="App" className="main-container-animation">
      <svg id="sky">
        {[...Array(num)].map((x, y) => (
          <circle
            cx={getRandomX()}
            cy={getRandomY()}
            r={randomRadius()}
            stroke="none"
            strokeWidth="0"
            fill="white"
            key={y}
            className="star"
          />
        ))}
      </svg>
      <div id="shootingstars">
        {[...Array(60)].map((x, y) => (
          <div
            key={y}
            className="wish"
            style={{
              left: `${getRandomY()}px`,
              top: `${getRandomX()}px`,
            }}
          />
        ))}
      </div>
      <div className="center">
        <div className="loader blur">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
      </div>
    </div>
  );
};
