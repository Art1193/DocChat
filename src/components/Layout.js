import { Button } from "primereact/button";
import { Link, Outlet } from "react-router-dom";
import { Zoom, Fade } from "react-reveal";
import Menu from "./assets/Menu";

function Layout() {
  return (
    <div style={{ height: "100vh" }}>
      <div className="grid-nogutter grid" style={{ height: "100%" }}>
        <Fade left duration={"1000"}>
          <div
            className="grid grid-nogutter col-12 md:col-3 "
            style={{
              backgroundColor: "#989eaa",
              height: "100vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="col-12 grid-nogutter grid mt-3">
              {" "}
              {/* Name */}
              <div
                className="col-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src="/../images/logo.png" height={50} />
                </div>
              </div>
              <div className="col-8 pl-3">
                <h1 className="text-start ">Doc Chat</h1>
              </div>
            </div>
            <div
              className="col-12"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div className="justify-content-center align-items-center flex">
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <Button
                    className="justify-content-center align-items-center flex"
                    size="lg"
                    icon="pi pi-user"
                    rounded
                    outlined
                    severity="info"
                    aria-label="User"
                  />
                </Link>
              </div>
              <div className="p-1 justify-content-center align-items-center flex pt-4">
                <Link
                  to="/room/6417305cfcc2bf321b4b3753"
                  style={{ textDecoration: "none" }}
                >
                  <Button label="Room 1" outlined rounded />
                </Link>
              </div>
              <div className="p-1 justify-content-center align-items-center flex">
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <Button label="Room 2" outlined rounded />
                </Link>
              </div>
              <div className="p-1 justify-content-center align-items-center flex">
                <Link to="/room/647bjd" style={{ textDecoration: "none" }}>
                  <Button label="Room 3" outlined rounded />
                </Link>
              </div>
              <div className="p-1 justify-content-center align-items-center flex">
                <Link to="/ro" style={{ textDecoration: "none" }}>
                  <Button label="Room 4" outlined rounded />
                </Link>
              </div>
              <div className="p-1 justify-content-center align-items-center flex">
                <Link to="/room/bjcjsg" style={{ textDecoration: "none" }}>
                  <Button label="Room 5" outlined rounded />
                </Link>
              </div>

              <div className="col-12 pt-3 justify-content-center align-items-center flex">
                <Button label="view more ..." text />
              </div>
            </div>
          </div>
        </Fade>
        <div
          id="menu"
          className="col-0.5"
          style={{
            display: "flex",
            position: "relative",
            left: "-32px",
            alignItems: "center",
          }}
        >
          <Menu />
        </div>
        <div className="col-12 md:col-9 " style={{ height: "100%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
