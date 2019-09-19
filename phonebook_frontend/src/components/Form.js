import React from "react";
import personService from "../services/persons";

const Form = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  persons,
  setPersons,
  setConfMessage
}) => {
  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const AddPerson = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };

    const newPerson = persons.find(person => person.name === nameObject.name);

    if (newPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, would you like to replace their number with a new one?`
        )
      ) {
        personService
          .update(newPerson.id, nameObject)
          .then(response =>
            setPersons(
              persons.map(person =>
                person.id !== newPerson.id ? person : response.data
              )
            )
          );

        setConfMessage(`Added new number to ${nameObject.name}`);
      }
      return;
    }

    personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setConfMessage(`Added ${nameObject.name}`);
      })
      .catch(error => {
        setConfMessage(String(error.response.data.error));
      });

    setNewName("");
    setNewNumber("");
  };

  return (
    <div className="container">
      <h2 className="display-4">Add To Phonebook</h2>
      <form className="form-group" onSubmit={AddPerson}>
        <div>
          Name:{" "}
          <input
            className="input-group mb-3 max-width: 567px"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number:{" "}
          <input
            className="input-group mb-3"
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Add Person
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
