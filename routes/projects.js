const express          = require('express');
const ensure           = require('connect-ensure-login');
const projectRouter    = express.Router();
const multer           = require('multer');
const path             = require('path');
const Project         = require('../models/projectmod.js');
const myUploader       = multer ({ dest: path.join(__dirname, '../public/uploads') });

//no need to get the id in the url/form because you have that info in the session
projectRouter.get('/projects/new',
// we need to be logged in to create projects
  ensure.ensureLoggedIn('/login'),

  (req, res, next) => {
    res.render('projects/new-project-view.ejs');

});
// you should use s3 for production

projectRouter.post('/projects',
  ensure.ensureLoggedIn('/login'),

  //<input type="file name ="projectPhoto">
                      //  |
  myUploader.single('jobPhoto'),

  (req, res, next) => {

    console.log('FILE UPLOAD ------');
    console.log(req.file);

    const theProject = new Project ({

      //the key is from the model, and the value is from the input form
      jobYear:        req.body.jobYear,
      jobNumber:      req.body.jobNumber,
      jobName:        req.body.jobName,
      jobClient:      req.body.jobClient,
      jobSubs:        req.body.jobSubs,
      jobType:        req.body.jobType,
      jobFee:         req.body.jobFee,
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
      jobRenderImg:   `/uploads/${req.file.filename}`,
      jobImg:         `/uploads/${req.file.filename}`,
      createdBy:      req.user._id

    });

    theProject.save((err) => {
      if (err) {
        next(err);
        return;
      }

      req.flash('success', 'Your project was saved succesfully');

      res.redirect('/projects');
    });
  }
);


projectRouter.get('/projects',
  ensure.ensureLoggedIn(),

  (req, res, next ) => {
    Project.find({}, //give me all of the projects
    // { owner:    req.user._id },
    (err, projectsList) => {
      if (err) {
        next(err);
        return;
      }
      res.render('projects/project-list-view.ejs', {
        projects:           projectsList,
        successMessage:     req.flash('success')
      });
    }
  );
  }
);

module.exports = projectRouter;
