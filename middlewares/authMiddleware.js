const authService = require("../services/authService");
async function isLoggedIn(req,res,next){
    console.log("In Middle WARE AUTH")
    const sessionId = req.body?.sessionId;
    const adminToken = req.body?.adminToken;
    if(!sessionId && !adminToken){
        res.send("Unauthorized");
    }
    else if(sessionId){
        const isAdminVerified = await authService.getUser(sessionId);
        console.log("ADMIN VERIFIED RESULT IN SESSION ",isAdminVerified);
        if(!isAdminVerified){
             res.send("Unauthorized User");
        }
        else
        {
            next();
        }
    }
    else if(adminToken){
        const isAdminVerified = await authService.verifyAdminToken(adminToken)
         console.log("ADMIN VERIFIED RESULT IN TOKEN ",isAdminVerified);;
        if(!isAdminVerified){
             res.send("Unauthorized User");
        }
        else
        {
            next();
        }
    }
}
module.exports = isLoggedIn;