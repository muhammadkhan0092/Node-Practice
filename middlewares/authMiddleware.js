const authService = require("../services/authService");
function isLoggedIn(req,res,next){
    const sessionId = req.body?.sessionId;
    if(!sessionId){
        res.send("Not Logged In");
    }
    else
    {
        next();
    }
}
module.exports = isLoggedIn;