import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import logo from "../Images/logo1.png";
const Footer = () => {
  return (
    <>
      <div style={{ marginTop: "150px" }}>
        <footer
          className="text-white text-center text-lg-start pt-5 pb-5 "
          style={{ backgroundColor: "rgb(295, 150, 0)" }}
        >
          <div className="container p-4 w-100">
            <div className="row mt-4">
              <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                <h4 className=" mb-4 fw-bold">
                  {" "}
                  <img src={logo} alt="fresco" width="150px" height="80px" />
                </h4>
                <p className="fs-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur sit repellat modi. Nesciunt, magnam architecto.
                </p>

                <div className="mt-4">
                  <a type="button">
                    {" "}
                    <FacebookIcon className="fs-1 text-black" />
                  </a>
                  <a type="button">
                    <TwitterIcon className="fs-1 text-black" />
                  </a>
                  <a type="button">
                    <InstagramIcon className="fs-1 text-black" />
                  </a>
                  <a type="button">
                    <LinkedInIcon className="fs-1 text-black" />
                  </a>
                </div>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h4 className="text-uppercase mb-4 mt-2 pb-1 text-black jacques-francois-shadow-regular">
                  Search something
                </h4>
                <div className="form-outline form-white mb-4">
                  <input
                    type="text"
                    id="formControlLg"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="formControlLg">
                    Search
                  </label>
                </div>
                <ul
                  className="fa-ul list-unstyled"
                  style={{ marginLeft: "1.1em", fontSize: "20px" }}
                >
                  <li className="mb-3">
                    <span className="fa-li">
                      <HomeIcon className="text-black fs-3" />
                    </span>
                    <span className="ms-2">Warsaw, 00-967, Italy</span>
                  </li>
                  <li className="mb-3">
                    <span className="fa-li">
                      <MailIcon className="text-black fs-3" />
                    </span>
                    <span className="ms-2">contact@example.com</span>
                  </li>
                  <li className="mb-3">
                    <span className="fa-li">
                      <CallIcon className="text-black fs-3" />
                    </span>
                    <span className="ms-2">+ 48 234 567 88</span>
                  </li>
                </ul>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h4 className="text-uppercase mb-4 mt-2 pb-1 text-black jacques-francois-shadow-regular">
                  Opening hours
                </h4>
                <table className="table text-center text-white">
                  <tbody className="fw-normal">
                    <tr>
                      <td>Mon - Thu:</td>
                      <td>8am - 9pm</td>
                    </tr>
                    <tr>
                      <td>Fri - Sat:</td>
                      <td>8am - 1am</td>
                    </tr>
                    <tr>
                      <td>Sunday:</td>
                      <td>9am - 10pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
