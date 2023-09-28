const express = require('express');
const app = express();
const authUtil = require("../util/authentication")
const validation = require("../util/validation")
const sessionFlash = require("../middlewares/session-flash")
// const expressSession = require("express-session");

// const createSessionConfig = require("../config/session");
// const sessionConfig = createSessionConfig(); 
app.use(express.urlencoded({ extended: false }));
// app.use(expressSession(sessionConfig));
// const csrf = require("csurf");

// app.use(csrf());
// const csrfProtection = csrf({cookie:true});
// app.use(csrfProtection);

const User = require("../models/user.model");
const userDetailsAreValid = require('../util/validation');
function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res,next) {
  const enteredData = {
    email: req.body.email,
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
  if (existsAlready) {
    sessionFlash.flashDataToSession(req,{
      errorMessage:"User Exists Already! Try Logging in Instead",
      ...enteredData
    },function(){
      res.redirect("/signup") // ........

    })
    return
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
  res.render("customer/auth/login");

}

// const sessionErrorData = 
async function login(req, res) {
  const user = new User(req.body.email, req.body.password)
  const existingUser = await user.getUserWithSameEmail()
  if (!existingUser) {
    sessionFlash.flashDataToSession(req,{
      errorMessage:"Invalid Credentials! Please Double-Check Yourv Password",
      email:user.email,
      password:user.password
    },function(){
      res.redirect("/login")

    })
    return
  }
  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password)
  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req,{
      errorMessage:"Invalid Credentials! Please Double-Check Yourv Password",
      email:user.email,
      password:user.password
    },function(){
      res.redirect("/login")
    }) 
    return
  }
  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/")
  })
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login
};
