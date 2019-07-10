const {mongoose} = require('./db/mongoose');
const {Person} = require('./models/person');

// CREATE DOCUMENT 

// var person = new Person({
//     name: "Alonzo Church",
//     age: 116,
//     isFun: false
// });

// person.save();


// READ / FIND DOCUMENTS
// const findDocs = async () =>{

//     console.log("Finding Documents in Database");

//     const results = await Person.findOne({age: {$lt: 100}});  

//     console.log(results); 
// }

// findDocs();

// UPDATE DOCUMENTS
// const updateDocs = async ()=>{

//     console.log("Updating Documents in Database");

//     // const results = await Person.updateMany({isFun: true}, {isFun: false}); 

//     const results = await Person.findOneAndUpdate({isFun: false}, {isFun: true});

//     console.log(results); 
// }

// updateDocs(); 

//DELETE DOCUMENTS
const deleteDocs = async ()=>{
    console.log("Deleting Documents in Database");

    await Person.findOneAndDelete({isFun: true});
}

deleteDocs(); 

