import React from "react";
import personService from "../services/persons";

const Delete = ({ person, persons, setPersons, setConfMessage }) => {
  const handleDeleteClick = () => {
    const ID = person.id;
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(response => {})
        .catch(error => {
          console.log(error);
          setConfMessage(
            `${person.name} has already been deleted from the server`
          );
        });

      const newList = persons.filter(person => person.id !== ID);
      setPersons(newList);
    }
  };

  return (
    <>
      <button className="btn btn-danger btn-sm " onClick={handleDeleteClick}>
        Delete
      </button>
    </>
  );
};

export default Delete;
