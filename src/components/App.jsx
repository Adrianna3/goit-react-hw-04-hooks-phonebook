import React, { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { Section } from './Section/Section';

export const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount = () => {
    if (localStorage.getItem('contacts') !== null) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
      });
    }
  };

  componentDidUpdate = () => {
    try {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.find(cont => cont.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState({
        contacts: [...contacts, { name, number, id: nanoid() }],
      });
    }
  };

  findByName = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  viewContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(cont => cont.name.toLowerCase().includes(filter));
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(cont => cont.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm addContact={this.addContact} />
        </Section>

        <Section title="Contacts">
          <SearchFilter findByName={this.findByName} />
          <ContactsList
            contacts={this.viewContacts()}
            deleteItem={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
