// import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Zoom } from "react-reveal";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

export default function Registration() {
  const navigate = useNavigate();

  // let router = useRouter();
  let [loading, setLoading] = useState(false);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  useEffect(() => {
    console.log("helo");
  }, []);

  async function handleSubmit(e) {
    console.log(loading, username, password, email);
    setLoading(true);
    e.preventDefault();
    let res = await fetch(
      "https://docchat-backend.onrender.com/api/auth/register",
      {
        method: "POST",
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    console.log({ data });
    if (data) {
      console.log("sucuss");
      navigate("/signin");
    } else {
      console.log("error ocurred");
    }
    setLoading(false);
  }
  return (
    <div className="sign_up_back">
      <div className="text-center pt-7">
        <Zoom duration={"1200"}>
          <img src="/./images/logo.png" alt="hyper" height={90} className="" />
        </Zoom>
      </div>
      <Zoom duration={"1200"} delay={600}>
        <form
          method="post"
          // onSubmit={handleSubmit}
          className="sign-up-form"
          style={{ height: "75vh" }}
        >
          <h2 className="title">Sign up</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <br />
          <Link
            to={"/"}
            className="font-medium no-underline ml-2 mb-3 text-blue-500 cursor-pointer"
          >
            <Button
              label="Sign Up"
              loading={loading}
              className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
              onClick={handleSubmit}
            />
          </Link>
          <p className="social-text">Or{""}</p>
          <Link
            to={"/signin"}
            className="font-medium no-underline ml-2 mb-3 text-blue-500 cursor-pointer"
          >
            Sign In
          </Link>
          <div className="social-media">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </form>
      </Zoom>
    </div>
  );
}
