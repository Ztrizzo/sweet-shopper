import React from "react";

import "./Hero.scss";

export default () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <img className="hero-img" src="./hero-img.png" />
        <div className="hero-title-container">
          <div className="hero-title">EAT SWEETS</div>
          <div className="hero-title">BE HAPPY</div>
        </div>
      </div>
    </div>
  );
};
