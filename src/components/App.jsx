import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { Section } from './Section/Section';

export const App = () => {
  const initiateContacts = () =>
    JSON.parse(localStorage.getItem('LOCALSTORAGE_KEY')) || [];

  const [contacts, setContacts] = useState(initiateContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const initiateContacts = JSON.stringify(contacts);
      localStorage.setItem('LOCALSTORAGE_KEY', initiateContacts);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts.find(cont => cont.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(oldCont => [...oldCont, { name, number, id: nanoid() }]);
    }
  };

  const findByName = e => {
    setFilter(() => e.target.value.toLowerCase());
  };

  const filteredContacts = () => {
    return contacts.filter(cont => cont.name.toLowerCase().includes(filter));
  };

  const deleteContact = id => {
    setContacts(() => contacts.filter(cont => cont.id !== id));
  };

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm newContact={addContact} />
      </Section>

      <Section title="Contacts">
        <SearchFilter findByName={findByName} />
        <ContactsList
          contacts={filteredContacts()}
          deleteItem={deleteContact}
        />
      </Section>
    </div>
  );
};
