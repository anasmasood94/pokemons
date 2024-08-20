import "./style.css";

const Loader = () => {
  return (
    <div
      className="spinner-container d-flex justify-content-center align-items-center"
      data-testid="loader"
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
