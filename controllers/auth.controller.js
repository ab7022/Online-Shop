const express = require('express');
const app = express();
const authUtil = require("../util/authentication")
const validation = require("../util/validation")
const sessionFlash = require("../middlewares/session-flash")
const expressSession = require("express-session");

const createSessionConfig = require("../config/session");
const sessionConfig = createSessionConfig(); 
app.use(express.urlencoded({ extended: false }));
app.use(expressSession(sessionConfig));
const csrf = require("csurf");

app.use(csrf());
const csrfProtection = csrf({cookie:true});
app.use(csrfProtection);

const User = require("../models/user.model");
const userDetailsAreValid = require('../util/validation');

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req)
  if(!sessionData){
    sessionData = {
      email:"",
      confirmEmail:"",
      password:"",
      fullname:"",
      street:"",
      postal:"",
      city:""
    }

  }
  res.render("customer/auth/signup",{inputData:sessionData});
}

async function signup(req, res,next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail:req.body["confirm-email"],
    password:req.body.password,
    fullname:req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city
  }

  if (!validation.userDetailsAreValid(req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city) || !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])) {
      sessionFlash.flashDataToSession(req,{
        errorMessage:"Please check Your Input - It Must Be 6 Characters Long",...enteredData
      },function(){
        res.redirect("/signup")
 
      })
    return
  }


  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );
  
  const existsAlready = await user.existsAlready()
  console.log("existsAlready:", existsAlready); // Add this line for debugging
  if (existsAlready) {
    console.log("User exists already."); // Add this line for debugging
    sessionFlash.flashDataToSession(req, {
      errorMessage: "User Exists Already! Try Logging in Instead",
      ...enteredData,
    }, function () {
      res.redirect("/signup");
    });
    return;
  }
  


  try {
    await user.signup()

  } catch (error) {
    next(error)
    return
  }
  // if (req.csrfToken() !== req.body._csrf) {
  //   return res.status(403).send('Invalid CSRF token');
  // }
  console.log(user)
  res.redirect("/login")
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req)
  if(!sessionData){
    sessionData = {
      email:"",
      password:"",
      
    }

  }
  res.render("customer/auth/login",{inputData:sessionData});

}
async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, {
      errorMessage: "Invalid Credentials! Please Double-Check Your Password",
      email: user.email,
      password: user.password,
    }, function () {
      res.redirect("/login");
    });
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, {
      errorMessage: "Invalid Credentials! Please Double-Check Your Password",
      email: user.email,
      password: user.password,
    }, function () {
      res.redirect("/login");
    });
    return;
  }

  // Determine the user's role (isAdmin) based on the database information
  const isAdmin = existingUser.isAdmin || false; // Default to false if not set

  req.session.isAdmin = isAdmin;

  // Initialize the session with the user's ID
  req.session.uid = existingUser._id.toString(); // Assuming _id is the user's ID field

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req,res){
  authUtil.destroyUserAuthSession(req)
  res.redirect("/login")
}
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout:logout
};
