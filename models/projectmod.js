const mongoose = require('mongoose');

const User = require('./usermod.js');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  { //need to add validations later
    jobYear:        String,
    jobNumber:      String,
    jobName:        String,
    jobClient:      String,
    jobSubs:        String,
    jobType:        String,
    jobFee:         String,
    jobAddress:     String,
    jobMasterperm:  String,
    jobPlbperm:     String,
    jobMechperm:    String,
    jobGasperm:     String,
    jobElecperm:    String,
    jobOtherPerm:   String,
    jobChangeorder: String,
    jobReimburse:   String,
    jobPayroll:     String,
    jobSubExp:      String,
    jobAmtInv:      String,
    jobAmtRec:      String,
    jobAmtDue:      String,
    jobAmtRem:      String,
    jobProfit:      String,
    jobCurrProfit:  String,
    jobMaterialExp: String,
    jobImgName:     String,
    jobImg:         String,

    // along with all of the usual validators max/min you could also specify whether the
    // field is required...duh, but you can also manipulate strings lowercase: true, trim: true
    // you could also use enum: to specify set of allowed values, match: to match a regular expression. 
    // maxlength and minlength can be used on strings too 

    //reference the id of the user
    createdBy:          { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy:          { type: Schema.Types.ObjectId, ref: 'User'},
    updated:            { type: Date, default: Date.now }

    // this is the way I would write it if I wanted to make the user a subdoc
    // owner:          { type: User.schema }
  },
  {
    timestamps: true
  }

);

projectSchema.index(
    { 
        jobYear: "text",
        jobNumber: "text",
        jobName: "text",
        jobClient: "text",
        jobSubs: "text",
        jobType: "text"
    }
);            

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
