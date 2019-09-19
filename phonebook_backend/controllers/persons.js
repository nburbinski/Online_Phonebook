const personsRouter = require("express").Router();
const Person = require("../models/person");

personsRouter.get("/info", (request, response) => {
  Person.count().then(numOfPeople => {
    response.send(`<p>Phonebook has info for ${numOfPeople} people</p>
                      <p> ${new Date().toISOString()}</p>`);
  });
});

personsRouter.get("/", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});

personsRouter.get("/:id", (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

personsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date()
  });

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

personsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
    date: new Date()
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true }).then(
    updated => {
      response.json(updated.toJSON());
    }
  );
});

personsRouter.delete("/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = personsRouter;
