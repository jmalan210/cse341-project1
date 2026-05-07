const { ObjectId } = require('mongodb');

const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId; //primary key that MongoDB creates

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
        res.status(200).json(contacts[0]);
    
    };



module.exports = {
    getAll, 
    getSingle
}
