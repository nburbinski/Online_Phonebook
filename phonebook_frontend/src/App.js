import React, { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import Form from "./components/Form.js";
import personService from "./services/persons";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [confMessage, setConfMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Notification message={confMessage} setMessage={setConfMessage} />
      <h1 className="display-3 text-center">Phonebook</h1>

      <Form
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setConfMessage={setConfMessage}
      />
      <div className="container ">
        Filter: <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <Filter
        persons={persons}
        newFilter={newFilter}
        setPersons={setPersons}
        setConfMessage={setConfMessage}
      />
    </div>
  );
};

export default App;
