import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navBarRef = useRef(null);

  useEffect(() => {
    //Setup the Listener for the Navbar
    window.addEventListener("scroll", () => {
      if (window.scrollY > 56) {
        navBarRef.current.classList.add("navbar-scrolled");
      } else {
        navBarRef.current.classList.remove("navbar-scrolled");
      }
    });

    //Make sure to remove the event listener when leaving
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <nav
        id="navbar"
        className="navbar fixed-top navbar-expand-lg p-md-3 navbar-dark"
        ref={navBarRef}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/">
            Four Four Printworks
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="gallery">
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="about">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
