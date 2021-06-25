"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var SlotSchema = new Schema({
//   name: {
//     type: String,
//     required: "Kindly enter the name of the task",
//   },
//   Created_date: {
//     type: Date,
//     default: Date.now,
//   },
//   status: {
//     type: [
//       {
//         type: String,
//         enum: ["pending", "ongoing", "completed"],
//       },
//     ],
//     default: ["pending"],
//   },
// });

// var MemberInSlotSchema = new Schema({
//   memberName: {
//     type: String,
//   },
//   memberId: {
//     type: String,
//   },
// });

// var SlotInDateSchema = new Schema({
//   slotName: {
//     type: String,
//   },
//   slotId: {
//     type: String,
//   },
//   members: MemberInSlotSchema,
// });

// var SlotSchema = new Schema({
//   createdDate: {
//     type: String,
//     required: "Kindly enter date yyyy-mm-dd format!",
//   },
//   slots: SlotInDateSchema,
// });

var MemberSchema = new Schema({
  memberName: {
    type: String,
    required: "Kindly enter the name of the member",
  },
  Created_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: [
      {
        type: String,
        enum: ["active", "inactive"],
      },
    ],
    default: ["active"],
  },
  memberId: {
    type: [
      {
        type: String,
        required: "Kindly enter the member id",
      },
    ],
  },
});

// var SlotConfigSchema = new Schema({
//   config: {
//     type: [Schema.Types.Mixed],
//   },
// });

var SlotConfigSchema = new Schema(
  [
    {
      slotDay: {
        type: Schema.Types.String,
      },
      slots: {
        type: Schema.Types.Array,
      },
    },
  ]
  //   slotDay: [Schema.Types.Mixed],
);

var DayWiseSlotInfoSchema = new Schema({
  //   type: Schema.Types.Mixed,
  slotDay: {
    type: Schema.Types.String,
  },
  slotDate: {
    type: Schema.Types.String,
  },
  slots: {
    type: Schema.Types.Mixed,
  },
});

module.exports = mongoose.model("Members", MemberSchema);
module.exports = mongoose.model("SlotConfig", SlotConfigSchema, "slotconfig");
module.exports = mongoose.model(
  "DayWiseSlotInfo",
  DayWiseSlotInfoSchema,
  "daywiseSlotInfo"
);
