import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './ContactList/Filter/Filter';
import styles from './App.module.css';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

//* localstorage key
const STORAGE_KEY = 'phonebookContacts';

const initialState = {
  contacts: initialContacts,
  filter: '',
  name: '',
  number: '',
};

export default function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const storedContacts = localStorage.getItem(STORAGE_KEY);
    if (storedContacts) {
      setState(prevState => ({
        ...prevState,
        contacts: JSON.parse(storedContacts),
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.contacts));
  }, [state.contacts]);

  const handleAddContact = newContact => {
    const isNameAlreadyExist = state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isNameAlreadyExist) {
      alert(`Contact with the name '${newContact.name}' already exists.`);
    } else {
      setState(prevState => ({
        ...prevState,
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  const handleDeleteContact = contactId => {
    const updatedContacts = state.contacts.filter(
      contact => contact.id !== contactId
    );
    setState({ ...state, contacts: updatedContacts });
  };

  return (
    <div className="App">
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />
      </div>

      <div className={styles.contacts}>
        <h2>Contacts</h2>
        <Filter
          value={state.filter}
          onChange={value => setState({ ...state, filter: value })}
        />

        <ContactList
          contacts={state.contacts}
          filter={state.filter}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
}

// *No need for PropTypes in this component.

// * end of App.
