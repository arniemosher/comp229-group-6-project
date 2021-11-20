let mongoose = require('mongoose');

//create a record for our business contacts
let recordEntry = mongoose.Schema({
    name: String,
    phoneNo: Number,
    email: String,

    questions:
    {
        question: String,
        answers:
        {
            answer: String
        }
    }
},
{
    collection: "incidents"
}
);

module.exports = mongoose.model('Record',recordEntry);