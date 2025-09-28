const adminService = require("../services/adminService");

class adminController{
    static async createNewAdmin(req,res){
        const {admin_email,admin_password} = req.body;
        const result = await adminService.createNewAdmin(admin_email,admin_password);
        return res.status(result.status).send(result.message);
    }

    static async loginAdmin(req,res){
        const {admin_email,admin_password} = req.body;
        const result = await adminService.loginAdmin(admin_email,admin_password);
        return res.status(result.status).send(result.message);
    }
}

module.exports = adminController;