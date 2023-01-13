const { adminModel } = require('./../../model/adminModel')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken');
const key = 'mysecretkey'

async function signup(req, res) {
    userData = req.body
    userData.created_at = new Date()
    if (!userData.email || !userData.password) {
        res.status(400).send("Username and Password are mandatory")
        return
    }
    let userNameResult = await adminModel.find({ "username": userData.email })
    if (userNameResult.length) {
        res.status(400).send(`email already exist`)
        return
    }
    let hashPassword = await passwordEncyption(userData.password)
    userData.password = hashPassword
    const createResult = await adminModel.create(userData);
    console.log(createResult)
    if (createResult) {
        res.status(200).send(`created`)
    } else {
        res.status(500).send(`Something went wrong`)
    }



}
const signin = async (req, res) => {
    var userData = req.body
    console.log(userData.email, userData.password)
    if (!userData.email || !userData.password) {
        res.status(400).send("Username and Password are mandatory")
        return
    }
    let userNameResult = await adminModel.find({ "email": userData.email })
    // console.log(userNameResult)
    if (userNameResult.length) {
        try {

            let passwordCompareresult = await passwordCompare(userData.password, userNameResult[0].password)
            if (passwordCompareresult) {
                var token = jwt.sign({ id: userNameResult[0].id, role: userNameResult[0].role }, key);
                res.status(200).json({
                    success: true,
                    token: token
                })

            }
        }
        catch (e) {
            console.log(e)
            res.status(400).send(`wrong password`)
        }
    } else {
        res.status(400).send(`wrong user name`)

    }


}


const passwordEncyption = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        });
    })
}

const passwordCompare = (password, hash) => {
    // console.log(`password and hash::`,password,hash)
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (result) {
                resolve(result)
            }
            else if (err) {
                reject(err)
            }
            else {
                reject("password not matched")
            }
        });
    })
}

module.exports = {
    signup, signin
}