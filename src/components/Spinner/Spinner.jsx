import Spinner from "react-bootstrap/Spinner";

function MySpinner() {
  return (
    <Spinner animation="border" role="status" className="mt-3">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default MySpinner;
