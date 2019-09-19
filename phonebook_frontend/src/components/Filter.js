import React from "react";
import Delete from "./Delete.js";
const Filter = ({ persons, newFilter, setPersons, setConfMessage }) => {
  const filteredList = persons.filter(
    person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
  );
  return (
    <div className="container">
      <h3 className="display-4">Numbers</h3>
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr className="d-flex">
            <th className="col-4">Name</th>
            <th className="col-4">Number</th>
            <th className="col-4">Delete?</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map(person => (
            <tr key={person.id} className="d-flex">
              <td className="col-4">{person.name} </td>
              <td className="col-4">{person.number}</td>
              <td className="col-4 ">
                <Delete
                  person={person}
                  persons={persons}
                  setPersons={setPersons}
                  setConfMessage={setConfMessage}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Filter;
