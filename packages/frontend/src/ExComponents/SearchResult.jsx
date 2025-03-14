import "./SearchResult.css";
import PropTypes from "prop-types";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={() => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};

SearchResult.propTypes = {
  result: PropTypes.shape({
    // define the shape if you like, or just .any
  })
};
