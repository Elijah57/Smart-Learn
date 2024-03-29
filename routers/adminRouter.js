const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth/index");
const { getAllUsers, getUser, blockUser, unBlockUser, deleteUser} = require("../controllers/admin/index")

const adminRouter = express.Router();


// get routes
adminRouter.get("/users", isLoggedIn, isAdmin, getAllUsers); //admin get all users
adminRouter.get("/users/:id", isLoggedIn, isAdmin, getUser); //admin get a specific user, including all their details

// put routes
adminRouter.put("/:id/block", isLoggedIn, isAdmin, blockUser)
adminRouter.put("/:id/unblock", isLoggedIn, isAdmin, unBlockUser)
adminRouter.put("/:id/role-update")


// delete routes
adminRouter.delete("/:id/delete/", isLoggedIn, isAdmin, deleteUser);

module.exports = adminRouter;


