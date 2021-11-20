let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect router to record model
let record = require('../models/record');

module.exports.showSurveys = (req,res,next)=>{
    record.find((err,listRecords)=>{
        if (err) 
        {
            return console.error(err);
        }
        else
        {
            //console.log(listRecords);

            res.render('record/records', {title: 'List of Surveys', ListRecords: listRecords, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.showAddSurvey = (req,res,next)=>{
    res.render('record/add', {title: 'Add a Survey', displayName: req.user ? req.user.displayName : ''});
};

module.exports.updateAddSurvey = (req,res,next)=>{
    let newRecord = record({
        "name": req.body.name,
        "phoneNo": req.body.phoneNo,
        "email": req.body.email,
        "date": req.body.date,
        "description": req.body.desc
    });

    record.create(newRecord,(err,record)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/list-surveys');
            //console.log('Contact Added');
        }
    });

};

module.exports.showTakeSurvey = (req,res,next)=> {
    res.render('record/take', {title: 'Add a Survey', displayName: req.user ? req.user.displayName : ''})
}

module.exports.showEditSurvey = (req,res,next)=>{
    let id = req.params.id;

    record.findById(id, (err, recordEdit)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.render('record/edit', {title: 'Edit Survey', Record: recordEdit, displayName: req.user ? req.user.displayName : ''});
            //console.log('Editing Contact..');
        }
    })
};

module.exports.updateEditSurvey = (req,res,next)=>{
    let id = req.params.id;
    let updatedRecord = record({
        "_id":id,//made an error here, supposed to be "_id"
        "name": req.body.name,
        "phoneNo": req.body.phoneNo,
        "email": req.body.email,
        "date": req.body.date,
        "description": req.body.desc
    });
    record.updateOne({_id:id},updatedRecord,(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/list-surveys');
            //console.log('Contact Updated');
        }
    });
};

module.exports.deleteSurvey = (req,res,next)=>{
    let id = req.params.id;

    record.remove({_id:id}, (err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/list-surveys');
            //console.log('Contact Removed');
        }
    })
};