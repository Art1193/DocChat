import { Button } from "primereact/button";
import React from "react";
import { Zoom } from "react-reveal";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ position: "absolute", top: "0%" }}>
        <img
          src={require("../wave2.svg").default}
          alt="mySvgImage"
          style={{ width: "100%" }}
        />
      </div>

      <div className="grid grid-nogutter surface-0 text-800  pt-8">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center pt-8 ">
          <section>
            <span className="block text-6xl font-bold mb-1">
              Create the screens
            </span>
            <div className="text-6xl text-primary font-bold mb-3">
              your visitors deserve to see
            </div>
            <Zoom duration={"1200"} delay={600}>
              <p className="mt-0 mb-4 text-700 line-height-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Zoom>
            <Zoom duration={"1200"} delay={800}>
              <p className="mt-0 mb-4 text-700 line-height-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Zoom>
            <Zoom duration={"1200"} delay={1000}>
              <p className="mt-0 mb-4 text-700 line-height-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Zoom>
            <Link
              to={"/"}
              className="font-medium no-underline ml-2 mb-3 text-blue-500 cursor-pointer"
            >
              <Button
                label="Get Started"
                className="mr-3 p-button-raised"
                outlined
                rounded
              />
            </Link>
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden pt-8">
          <Zoom duration={"1200"}>
            <img
              src="/./images/hero.jpg"
              alt="hero-1"
              // className="md:ml-auto block md:h-full"
              height={400}
            />
          </Zoom>
        </div>
      </div>

      <div style={{ position: "absolute", top: "58%" }}>
        <img
          src={require("../wave1.svg").default}
          alt="mySvgImage"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Hero;
