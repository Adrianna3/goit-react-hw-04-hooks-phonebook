import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export const ContactForm = ({ newContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newAdd = { name, number };
    newContact(newAdd);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const {
    contactForm__form,
    contactForm__label,
    contactForm__input,
    contactForm__btn,
  } = styles;

  return (
    <form className={contactForm__form} onSubmit={handleSubmit}>
      <label className={contactForm__label}>
        Name
        <input
          className={contactForm__input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={contactForm__label}>
        Number
        <input
          className={contactForm__input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={contactForm__btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  newContact: PropTypes.func.isRequired,
};
