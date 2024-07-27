import { useEffect, useRef, useState } from "react";
// import swal from "sweetalert";
import { Zoom } from "react-reveal";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { Link, useNavigate, useRouteError } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const toast = useRef(null);

  const showSticky = (severity, summary, Message) => {
    console.log("inside toast");
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: Message,
      sticky: true,
    });
  };
  const navigate = useNavigate();
  let [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     if (session.data.user.role === "admin") router.push("/admin");
  //     else router.push("/");
  //   }
  // }, [session]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(username, password);
    e.preventDefault();
    let res = await fetch(
      "https://docchat-backend.onrender.com/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    console.log({ data });
    if (res.status == 200) {
      console.log("Sucuss");

      showSticky("success", "Successfully Logged In", "Welcome Back 🤩🤩");

      setLoading(false);
      localStorage.setItem("token", JSON.stringify(data.token.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(-1);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } else {
      console.log("errorr");
      showSticky("error", data, "");
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <div>
        <div
          className="text-center pt-8"
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Zoom duration={"1200"}>
            <img
              src="/./images/logo.png"
              alt="hyper"
              height={90}
              className=""
            />
          </Zoom>
        </div>
        <Zoom duration={"1200"} delay={600}>
          <form
            method="post"
            // onSubmit={handleSubmit}
            className="sign-in-form"
            style={{ height: "70vh" }}
          >
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                onChange={({ target }) => setUsername(target.value)}
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
                label="Sign In"
                className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
                loading={loading}
                onClick={handleSubmit}
              />
            </Link>
            <p className="social-text">Or{""}</p>
            {/* <a href="http://localhost:3000/signup">
          <p style={{ color: "black", textDecoration: "none" }}></p>
        </a> */}
            <Link
              to={"/signup"}
              className="font-medium no-underline ml-2 mb-3 text-blue-500 cursor-pointer"
            >
              Sign Up
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
    </>
  );
}
