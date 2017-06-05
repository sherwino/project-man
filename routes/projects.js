const express          = require('express');
const ensure           = require('connect-ensure-login');
const projectRouter    = express.Router();
const multer           = require('multer');
const path             = require('path');
const Project          = require('../models/projectmod.js');
const myUploader       = multer ({ dest: path.join(__dirname, '../public/uploads') });
const year             = new Date().getFullYear();

//no need to get the id in the url/form because you have that info in the session

// CREATE NEW PROJECT ROUTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// This route and layout shows the form and everything needed to create project
projectRouter.get('/projects/new',
// we need to be logged in to create projects
  ensure.ensureLoggedIn('/login'),

  (req, res, next) => {
    res.render('projects/new-project-view.ejs', {
      title:    'Project Man - Add a project',
      layout:   'layouts/list-layout',
      currYear:  year
    });

});

// POST/SEND NEW PROJECT TO DB ROUTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
projectRouter.post('/projects',
  ensure.ensureLoggedIn('/login'),

  //<input type="file name ="projectPhoto">
                      //  |
  myUploader.single('jobImg'),

  (req, res, next) => {

    console.log('FILE UPLOAD ------');
    console.log(req.file);
    // res.status(204).end();
    const theProject = new Project ({

      //the key is from the model, and the value is from the input form
      jobYear:        req.body.jobYear,
      jobNumber:      req.body.jobNumber,
      jobName:        req.body.jobName,
      jobClient:      req.body.jobClient,
      jobSubs:        req.body.jobSubs,
      jobType:        req.body.jobType,
      jobFee:         req.body.jobFee,
      jobImg:         `/uploads/${req.file.filename}`,
      // jobRenderImg:   `/uploads/${req.body.picName}`,
      jobAddress:     req.body.jobAddress,
      jobMasterperm:  req.body.jobMasterperm,
      jobPlbperm:     req.body.jobPlbperm,
      jobMechperm:    req.body.jobMechperm,
      jobGasperm:     req.body.jobGasperm,
      jobElecperm:    req.body.jobElecperm,
      jobOtherPerm:   req.body.jobOtherPerm,
      jobChangeorder: req.body.jobChangeorder,
      jobReimburse:   req.body.jobReimburse,
      jobPayroll:     req.body.jobPayroll,
      jobSubExp:      req.body.jobSubExp,
      jobAmtInv:      req.body.jobAmtInv,
      jobAmtRec:      req.body.jobAmtRec,
      jobAmtDue:      req.body.jobAmtDue,
      jobAmtRem:      req.body.jobAmtRem,
      jobProfit:      req.body.jobProfit,
      jobCurrProfit:  req.body.jobCurrProfit,
      jobMaterialExp: req.body.jobMaterialExp,
      createdBy:      req.user._id

    });

    theProject.save((err) => {
      console.log('attempted to post form into DB');
      if (err) {
        next(err);
        return;
      }

      req.flash('success', 'Your project was saved succesfully');

      res.redirect('/projects');
    });
  }
);

// LIST OF PROJECTS ROUTE  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
projectRouter.get('/projects',
  ensure.ensureLoggedIn('/login'),

  (req, res, next ) => {
    //give me all of the projects, but sort them
    // { owner:    req.user._id },
    Project
    .find()
    .sort( { jobNumber: 1})
    .exec((err, projectsList) => {
      if (err) {
        next(err);
        return;
      }
      res.render('projects/project-list-view.ejs', {
        title:              'Project Man - Project Log',
        layout:             'layouts/list-layout',
        projects:           projectsList,
        successMessage:     req.flash('success'),
        user:               req.user
      });
    });
  });

// SINGLE PROJECT PAGE ROUTE  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

projectRouter.get('/projects/:id/',
  ensure.ensureLoggedIn('/login'),

  (req, res, next ) => {

  const projectID = req.params.id;

  Project.findById(projectID, (err, theProject) => {
    if(err) {
      next(err);
      return;
    }
    res.render('projects/project-detail-view.ejs', {
      title:  `Project Man ${theProject.jobNumber}`,
      layout: 'layouts/detail-layout',
      job:    theProject,
      errors: theProject.errors
    });
  });
});


module.exports = projectRouter;
