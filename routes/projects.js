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
    res.render('projects/new-project-view.ejs', {
      title:    'Project Man - Add a project',
      layout:   'layouts/list-layout'
    });

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
      jobYear:        req.body.f4,
      jobNumber:      req.body.f7,
      jobName:        req.body.f5,
      jobClient:      req.body.f8,
      jobSubs:        req.body.f9,
      jobType:        req.body.f10,
      jobFee:         req.body.f14,
      jobImg:         `/uploads/${req.file.filename}`,
      // jobRenderImg:   `/uploads/${req.file.filename}`,
      jobAddress:     req.body.f15,
      jobMasterperm:  req.body.f16,
      jobPlbperm:     req.body.f17,
      jobMechperm:    req.body.f18,
      jobGasperm:     req.body.f19,
      jobElecperm:    req.body.f20,
      jobOtherPerm:   req.body.f21,
      jobChangeorder: req.body.f22,
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
  ensure.ensureLoggedIn('/login'),

  (req, res, next ) => {
    Project.find({}, //give me all of the projects
    // { owner:    req.user._id },
    (err, projectsList) => {
      if (err) {
        next(err);
        return;
      }
      res.render('projects/project-list-view.ejs', {
        title:    'Project Man - Project Log',
        layout:   'layouts/list-layout',
        projects:           projectsList,
        successMessage:     req.flash('success')
      });
    }
  );
  }
);

module.exports = projectRouter;
