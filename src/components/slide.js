// Inpired by: https://codepen.io/popmotion/pen/xWrbNm?editors=0010

import React from "react";
import ReactDOM from "react-dom";
import { useSpring, animated, interpolate } from "react-spring";
import { useGesture } from "react-with-gesture";
import { Like } from "./styles";

export default function Slider({ children, onClick, onSlide }) {
  const [bind, { delta, down }] = useGesture();
  const { x, bg, size } = useSpring({
    x: down ? (delta[0] < 0 ? delta[0] : 0) : 0,
    // bg: `linear-gradient(120deg, ${
    //   delta[0] < 0 ? "#f093fb 0%, #f5576c" : "#96fbc4 0%, #f9f586"
    // } 100%)`,
    size: down ? 1.1 : 1,
    immediate: name => down && name === "x"
  });
  if(delta[0] < -75) {
    onSlide(delta[0]);
  }
  // const avSize = x.interpolate({
  //   map: Math.abs,
  //   range: [50, 300],
  //   output: ["scale(0.5)", "scale(1)"],
  //   extrapolate: "clamp"
  // });
  return (
    <animated.div
      onClick={(e) => {
        if(!delta[0]) {
          onClick();
        }
      }}
      {...bind()}
      class="item"
      style={{ width: "100%" }}
    >
      <Like>
        <i className="icon ion-md-heart" />
      </Like>
      <animated.div
        class="fg"
        style={{
          transform: interpolate([x, size], (x, s) => {
            return `translate3d(${x}px,0,0) scale(${1})`;
          })
        }}
      >
        {children}
      </animated.div>
    </animated.div>
  );
}
