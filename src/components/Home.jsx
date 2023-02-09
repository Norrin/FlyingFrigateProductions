import PressImg from "../images/PrintingPress.png";

const MainSection = () => {
  return (
    <div id="main-section" className="container-fluid pt-5">
      <div className="h-50 m-5 d-flex justify-content-center align-items-center">
        <div className="">
          <h1 id="welcome-heading">Welcome to Four Four Printworks</h1>
        </div>
      </div>
    </div>
  );
};

const MidSection = () => {
  return (
    <div
      id="mid-section"
      className="container-fluid w-100 pt-5 pb-5 d-flex justify-content-center align-items-between"
    >
      {/* Actual content area */}
      <div className="container text-white w-75">
        <div className="row align-items-center">
          <div className="col" style={{ minWidth: "400px" }}>
            <div className="row">
              <div className="mid-line-1 col">Welcome to our site.</div>
            </div>
            <div className="row">
              <div className="mid-line-2 col mb-4">
                The future home of custom printing designs
              </div>
            </div>
          </div>
          <div className="container d-flex justify-content-start col p-2">
            <img
              className="img-fluid mx-auto rounded-circle border border-5 border-white"
              style={{ minWidth: "150px" }}
              alt="printing press"
              src={PressImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <div className="g-0 d-flex flex-column">
        <MainSection />
        <MidSection />
      </div>
    </>
  );
};

export default Home;
