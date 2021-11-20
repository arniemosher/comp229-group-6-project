//initialize router
let express = require('express');
let router = express.Router();

//initialize mongoose
let mongoose = require('mongoose');

//intialize passport
let passport = require('passport');


//connect router to record model
//let record = require('../models/record');

let recordController = require('../controllers/record');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//GET route for records page - READ
router.get('/', recordController.showSurveys);

//GET route for ADD page - CREATE
router.get('/add', requireAuth,  recordController.showAddSurvey);

//POST route for records page - CREATE
router.post('/add',  requireAuth, recordController.updateAddSurvey);

//GET route for TAKE page - CREATE
router.get('/take/:id',  recordController.showTakeSurvey);

//GET route for records page - UPDATE
router.get('/edit/:id',  requireAuth,  recordController.showEditSurvey);

//POST route for records page - UPDATE
router.post('/edit/:id',  requireAuth, recordController.updateEditSurvey);

//GET route for records page - DELETE
router.get('/remove/:id', requireAuth,  recordController.deleteSurvey);

//always export the router
module.exports = router;