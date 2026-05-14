const { ObjectId } = require('mongodb'); //primary key MongoDB creates

const mongodb = require('../data/database');

const getAll = async (req, res) => {
    const result = await mongodb
        .getDatabase()
        .collection('contacts')
        .find();
    
    const contacts = await result.toArray();
   
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    
    };



const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id)
    const result = await mongodb
        .getDatabase()
        .collection('contacts')
        .findOne({ _id: contactId });
    
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    
};
    
const createContact = async (req, res) => {
     
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthdate: req.body.birthdate
    };
    const response = await mongodb
        .getDatabase()
        .collection('contacts')
        .insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json({
            message: "Contact created successfully",
            id: response.insertedId
        });
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthdate: req.body.birthdate
    };
    const response = await mongodb
        .getDatabase()
        .collection('contacts')
        .replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
         res.status(201).json({
            message: "Contact updated successfully",
            id: response.insertedId
        });
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .collection('contacts')
        .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(201).json({
            message: "Contact deleted successfully",
           
        });
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};
 


module.exports = {
    getAll, 
    getSingle, 
    createContact, 
    updateContact, 
    deleteContact
}
