function authorizationMiddleware(roles = []){
    return function(req,res,next){
        console.log("in other middleware")
        const adminToken = req.body?.adminToken;
    const role = adminToken.role;
    if(roles.includes(role)){
        next()
    }
    else
    {
        res.send("Unauthorized To Check Users")
    }
    }

}
module.exports = authorizationMiddleware;