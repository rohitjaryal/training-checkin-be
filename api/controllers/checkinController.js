"use strict";

var moment = require("moment");

// var mongoose = require("mongoose"),
//   Slot = mongoose.model("Slots");

var mongoose = require("mongoose"),
  Member = mongoose.model("Members");

var mongoose = require("mongoose"),
  Slotconfig = mongoose.model("SlotConfig");

var mongoose = require("mongoose"),
  DayWiseSlotInfo = mongoose.model("DayWiseSlotInfo");

exports.getAllMembers = function (req, res) {
  Member.find({}, function (err, member) {
    // console.log("Member:>>", member);
    if (err) res.send(err);
    res.json(member);
  });
};

exports.getAllSlotInfo = function (req, res) {
  const consecutiveDays = [];

  consecutiveDays.push({
    currentDate: moment().format("YYYY-MM-DD"),
    currentDayName: moment().format("dddd").toLocaleUpperCase(),
  });
  consecutiveDays.push({
    currentDate: moment().add(1, "day").format("YYYY-MM-DD"),
    currentDayName: moment().add(1, "day").format("dddd").toLocaleUpperCase(),
  });
  consecutiveDays.push({
    currentDate: moment().add(2, "day").format("YYYY-MM-DD"),
    currentDayName: moment().add(2, "day").format("dddd").toLocaleUpperCase(),
  });

  for (const individualDay of consecutiveDays) {
    DayWiseSlotInfo.find(
      { slotDate: individualDay.currentDate },
      function (err, slot) {
        if (err) {
          res.send(err);
        }
        if (!slot.length) {
          // get all slots
          Slotconfig.find(
            { slotDay: individualDay.currentDayName },
            function (err, slotInfo) {
              if (slotInfo.length) {
                const slots = slotInfo[0].slots;
                const newDayWiseData = [
                  {
                    slotDay: individualDay.currentDayName,
                    slotDate: individualDay.currentDate,
                    slots,
                  },
                ];
                DayWiseSlotInfo.create(newDayWiseData, function (error, docs) {
                  if (error) {
                    console.log("issue in DayWise Slot info:", error);
                  } else {
                    // console.log("Success in DayWise Slot info:", docs);
                    // res.json(docs);
                  }
                });
              }
            }
          );
        }
      }
    );
  }

  DayWiseSlotInfo.find(
    {
      $or: [
        { slotDate: consecutiveDays[0].currentDate },
        { slotDate: consecutiveDays[1].currentDate },
        { slotDate: consecutiveDays[2].currentDate },
      ],
    },
    function (err, slot) {
      if (err) {
        res.send(err);
      }
      res.json(slot);
    }
  );
};

exports.updateSlotInfo = function (req, res) {
  console.log("update data called:>", req?.body);

  const slotDate = req?.body?.slotDate;

  DayWiseSlotInfo.updateMany(
    { slotDate: slotDate },
    { $set: { slots: req?.body?.slots } },
    function (error, docs) {
      if (error) {
        console.log("issue in DayWise Slot info:", error);
      } else {
        // console.log("Success in DayWise Slot info:", docs);
        // res.json(docs);
      }
    }
  );

  res.json({ success: true });
};

exports.addSlot = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.addMemberToSlot = function (req, res) {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function (err, task) {
      if (err) res.send(err);
      res.json({ message: "Member added successfully in Slot!" });
    }
  );
};

exports.removeMemberFromSlot = function (req, res) {
  Task.remove(
    {
      _id: req.params.taskId,
    },
    function (err, task) {
      if (err) res.send(err);
      res.json({ message: "Member removed from Slot successfully!" });
    }
  );
};

// exports.list_all_tasks = function (req, res) {
//   Task.find({}, function (err, task) {
//     if (err) res.send(err);
//     res.json(task);
//   });
// };

// exports.create_a_task = function (req, res) {
//   var new_task = new Task(req.body);
//   new_task.save(function (err, task) {
//     if (err) res.send(err);
//     res.json(task);
//   });
// };

// exports.read_a_task = function (req, res) {
//   Task.findById(req.params.taskId, function (err, task) {
//     if (err) res.send(err);
//     res.json(task);
//   });
// };

// exports.update_a_task = function (req, res) {
//   Task.findOneAndUpdate(
//     { _id: req.params.taskId },
//     req.body,
//     { new: true },
//     function (err, task) {
//       if (err) res.send(err);
//       res.json(task);
//     }
//   );
// };

// exports.delete_a_task = function (req, res) {
//   Task.remove(
//     {
//       _id: req.params.taskId,
//     },
//     function (err, task) {
//       if (err) res.send(err);
//       res.json({ message: "Task successfully deleted" });
//     }
//   );
// };
