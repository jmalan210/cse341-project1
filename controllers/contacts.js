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



module.exports = {
    getAll, 
    getSingle
}
