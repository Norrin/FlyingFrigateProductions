const Hero = (props) => {
  return (
    <header className="bg-dark text-white p-5">
      <h1>{props.text}</h1>
    </header>
  );
};

export default Hero;
