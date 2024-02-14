    // app.js or index.js
    const mongoose = require('mongoose');
    require('dotenv').config();

    // Connect to MongoDB using Mongoose
    mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    // Define the Person Schema
    const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] },
    });

    // Create the Person Model
    const Person = mongoose.model('Person', personSchema);

    // Example: Create and Save a Record
    const newPerson = new Person({
    name: 'Rasheed Oladele',
    age: 20,
    favoriteFoods: ['Pizza', 'Burger'],
    });

    newPerson.save((err, data) => {
    if (err) return console.error(err);
    console.log('Record saved successfully:', data);
    });

    // Example: Create Many Records with model.create()
    const arrayOfPeople = [
    { name: 'ikongba', age: 25, favoriteFoods: ['Pasta', 'Ice Cream'] },
    { name: 'Boobyy, age: 35, favoriteFoods: ['Steak', 'Salad'] }
    // Add more people as needed
    ];

    Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log('Multiple records saved successfully:', people);
    });

    // Example: Use model.find() to Search Your Database
    Person.find({ name: 'Rasheed Oladele' }, (err, people) => {
    if (err) return console.error(err);
    console.log('People with name "John Doe":', people);

    // Example: Use model.findOne() to Return a Single Matching Document
    const foodToSearch = 'Pizza';

    Person.findOne({ favoriteFoods: foodToSearch }, (err, person) => {
    if (err) return console.error(err);
    console.log(`Person with favorite food "${foodToSearch}":`, person);
    });
    // Example: Use model.findById() to Search By _id
    const personIdToSearch = 'your_person_id'; // Replace with a valid _id

    Person.findById(personIdToSearch, (err, person) => {
    if (err) return console.error(err);
    console.log(`Person with _id "${personIdToSearch}":`, person);
    });

    // Example: Classic Update by Running Find, Edit, then Save
    const personIdToUpdate = 'your_person_id'; // Replace with a valid _id

    Person.findById(personIdToUpdate, (err, person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push('Hamburger');
    person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        console.log('Person updated:', updatedPerson);
    });

    // Example: New Updates on a Document Using model.findOneAndUpdate()
    const personNameToUpdate = 'Rasheed Oladele';

    Person.findOneAndUpdate(
    { name: personNameToUpdate },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
        if (err) return console.error(err);
        console.log('Person updated:', updatedPerson);
    }
    // Example: Delete One Document Using model.findByIdAndRemove
    const personIdToDelete = 'your_person_id'; // Replace with a valid _idaass

    Person.findByIdAndRemove(personIdToDelete, (err, deletedPerson) => {
    if (err) return console.error(err);
    console.log('Person deleted:', deletedPerson);
    });
    // Example: Chain Search Query Helpers
    Person.find({ favoriteFoods: 'Burrito' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
        if (err) return console.error(err);
        console.log('People who like burritos:', data);
    });



    );

    });

