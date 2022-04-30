import React from 'react';
import { connect } from "react-redux";

import Hero from "../Hero";
import Categories from "../Categories";
import Featured from "../Featured";
import Footer from "../Footer";

import "./Home.scss";

export const Home = (props) => {
  return (
    <div className="home">
      <Hero />
      <Categories />
      <Featured />
      <Footer />
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
