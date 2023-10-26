const db = require("../data/databse")
const mongodb = require("mongodb")
const bcrypt = require("bcryptjs")
const { mongo } = require("mongoose")
class user{
    constructor(email,password,fullname,street,postal,city){
        this.email = email
        this.password = password
        this.fullname = fullname
        this.address = {
            street:street,
            postal:postal,
            city:city
        }
    }

    static async findbyId(userId){
        const uid = new mongodb.ObjectId(userId)
        return db.getDb().collection("users").findOne({_id:uid},{projection:{password:0}})
    }

    getUserWithSameEmail(){
    return db.getDb().collection("users").findOne({email:this.email})
    }
    async existsAlready(){
        const existingUSer = await this.getUserWithSameEmail()
        if (existingUSer) {
            return true
        }
        return false
    }
    async signup(){
        const hashPassword = await bcrypt.hash(this.password,12)
       const result =  await db.getDb().collection("users").insertOne({
            email:this.email,
            password:hashPassword,
            fullname:this.fullname,
            address:this.address
        })


    }
    hasMatchingPassword(hashPassword){
       return bcrypt.compare(this.password,hashPassword)
    }
}
module.exports = user