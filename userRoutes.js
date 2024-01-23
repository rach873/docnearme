const express = require("express");
const {
   registerController,
  loginController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  bookAppointmentController,
  getAllDoctorsController,
  userAppointmentController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
//const { getAllDoctorsController } = require("../controllers/adminCtrl");

//router object
const router = express.Router();

//router
//LOGIN || POST
//const loginController = require("../controllers/loginController");
router.post("/login", loginController);
//Register || post
router.post("/register", registerController);
//Auth || post
router.post("/getUserData", authMiddleware, authController);
//Apply doctor || post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

router.post("/book-appointment", authMiddleware, bookAppointmentController);

//router.post"/booking-availability",authMiddleware,bookingAvailabilityController);
router.get("/user-appointment", authMiddleware, userAppointmentController);
//router.post("/updateProfile", authMiddleware,updateProfileController);

module.exports = router;
