const Page = ({ children }) => {
  return (
    <div className="container-fluid g-0" style={{ minHeight: "840px" }}>
      <div className="top-bar"></div>
      {children}
    </div>
  );
};

export default Page;
