import React from "react";
import "./loader.css"

const AnimatedBoxes = () => {
  return (
    <main className="main">
      <div className="container">
        <div className="box box1" style={{ borderColor: "#F59E0B" }}></div>
        <div className="box box2" style={{ borderColor: "#EF4444" }}></div>
        <div className="box box3" style={{ borderColor: "#6366F1" }}></div>
      </div>
    </main>
  );
};

export default AnimatedBoxes;
