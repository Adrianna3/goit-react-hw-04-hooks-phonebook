import PropTypes from 'prop-types';
import styles from './SearchFilter.module.css';

export const SearchFilter = ({ findByName }) => {
  const {
    searchFilter,   
    searchFilter__input } =
    styles;
  return (
    <div className={searchFilter}>
      <label>
        Find contacts by name
        <input
          className={searchFilter__input}
          type="text"
          onChange={findByName}
        />
      </label>
    </div>
  );
};

SearchFilter.propTypes = {
  findByName: PropTypes.func.isRequired,
};
