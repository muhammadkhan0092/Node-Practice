const adminModel = require("../models/adminModel");

class adminRepository{
    static async createNewAdmin(admin_email,admin_password) {
        return await adminModel.create({
            admin_email,
            admin_password
        });
    }

    static async getAdminFromEmail(admin_email){
        return await adminModel.findOne({
            where:{admin_email}
        });
    }
}
module.exports = adminRepository