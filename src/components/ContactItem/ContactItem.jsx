import PropTypes from 'prop-types';
import styles from './ContactItem.module.css';

export const ContactItem = ({ id, name, number, deleteItem }) => {
  const { contactItem__btn } = styles;
  return (
    <li>
      <span>
        {name}: {number}
        <button
          type="button"
          className={contactItem__btn}
          onClick={() => {
            deleteItem(id);
          }}
        >
          Delete
        </button>
      </span>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
