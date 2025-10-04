const adminService = require("../services/adminService");

class adminController{
    static async createNewAdmin(req,res){
        console.log("In Create Admin")
        const {admin_email,admin_password} = req.body;
        const result = await adminService.createNewAdmin(admin_email,admin_password);
        return res.status(result.status).send(result.message);
    }

    static async loginAdminWithSessionId(req,res){
        const {admin_email,admin_password} = req.body;
        const result = await adminService.loginAdminStatefull(admin_email,admin_password);
        return res.status(result.status).send(result.message);
    }
     static async loginAdminWithToken(req,res){
        const {admin_email,admin_password} = req.body;
        const result = await adminService.loginAdminStateless(admin_email,admin_password);
        return res.status(result.status).send(result.message);
    }

}

module.exports = adminController;