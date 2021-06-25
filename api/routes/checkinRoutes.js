"use strict";
module.exports = function (app) {
  var slotApis = require("../controllers/checkinController");

  app.route("/slots").get(slotApis.getAllSlotInfo).put(slotApis.updateSlotInfo);

  app.route("/enum/members").get(slotApis.getAllMembers);

  app
    .route("/slots/:slotTime/member/:member/slotDate/:slotDate")
    .put(slotApis.addMemberToSlot)
    .delete(slotApis.removeMemberFromSlot);
};
