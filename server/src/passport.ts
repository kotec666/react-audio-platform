import { UserInstance } from './models/interfaces'
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GithubStrategy = require('passport-github2').Strategy
import passport from 'passport'
import { User } from './models/models'
import userService from './service/userService'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './../.env') })


passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "/api/user/auth/google/callback" },
  async function (accessToken:string, refreshToken:string, profile:any, done:any) {
    try {
      const foundUser = await User.findOne({ where: { email: profile.emails[0].value } })
      if (!foundUser) {
        const userData = await userService.registration(`${profile.displayName}`, `${profile.emails[0].value}${process.env.JWT_ACCESS_SECRET}`, `${profile.emails[0].value}`)
        done(null, userData, accessToken, refreshToken)
      } else {
        done(null, foundUser, accessToken, refreshToken)
      }
    } catch (e) {
      console.log(e)
    }

  }))

passport.use(new GithubStrategy({
    clientID: `e506041b69fe9707bf49`,
    clientSecret: `6cfb9ebbf59a0969ebb13389c161fa0462ecfe19`,
    callbackURL: "/api/user/auth/github/callback" },
  async function (accessToken:string, refreshToken:string, profile:any, done:any) {
    try {
      const foundUser = await User.findOne({ where: { login: profile.username } })
      if (!foundUser) {
        const userData = await userService.registration(`${profile.username}`, `${profile.username}${process.env.JWT_ACCESS_SECRET}`, `${profile._json.email}`)
        done(null, userData, accessToken, refreshToken)
      } else {
        done(null, foundUser, accessToken, refreshToken)
      }
    } catch (e) {
      console.log(e)
    }
  }))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user: UserInstance, done) => {
  done(null, user)
})

export default passport
