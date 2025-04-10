const userDB = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const bcrypt = require('bcryptjs');

const handleLogin = async (req, res)=>{
    const {username,password} = req.body
    if(!username||!password)
        res.status(400).json({message:"username and password required"})
    const foundUser = userDB.users.find(user=>user.username===username)
    if(!foundUser)
        return res.status(401)
    const match = await bcrypt.compare(password,foundUser.password)
    if(match)
        res.status(202).json({message:"Logged in"})
    else
    res.sendStatus(401)
}

module.exports = {handleLogin}