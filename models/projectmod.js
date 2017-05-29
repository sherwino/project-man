const mongoose = require('mongoose');

// const User = require('./user-model.js');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    jobNumber:      String,
    jobName:        String,
    jobClient:      String,
    jobSubs:        String,
    jobType:        String,
    jobFee:         Number,
    jobAddress:     String,
    jobMasterperm:  String,
    jobPlbperm:     String,
    jobMechperm:    String,
    jobGasperm:     String,
    jobElecperm:    String,
    jobOtherPerm:   String,
    

    //reference the id of the user
    createdBy:          { type: Schema.Types.ObjectId }

    // this is the way I would write it if I wanted to make the user a subdoc
    // owner:          { type: User.schema }
  },
  {
    timestamps: true
  }

);

const Project = mongoose.model('Project', projectSchema);

module.exports = Room;
