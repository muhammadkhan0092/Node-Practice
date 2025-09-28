const adminRepository = require("../repositories/adminRepository");
const authService  =  require("../services/authService");
const {v4 : uuid} = require("uuid");
class adminService{
    static async createNewAdmin(admin_email,admin_password){
        const isExistingEmail = await adminRepository.getAdminFromEmail(admin_email);
        if(isExistingEmail){
            return {
                status:400,
                message:"Email Already Exists"
            }
        }
        const adminCreationResult = await adminRepository.createNewAdmin(admin_email,admin_password);
        if(!adminCreationResult){
            return {
                status:500,
                message:"Admin Creation Error"
            }
        }
        else
        {
            return {
                status:200,
                message:"Admin Created Successfully"
            }
        }
    }

    static async loginAdmin(admin_email,admin_password){
        const doesUserExist = await adminRepository.getAdminFromEmail(admin_email);
        if(!doesUserExist){
            return {
                status:400,
                message:"Email Invalid"
            }
        }
        else
        {
            const dbPassword = doesUserExist.admin_password;
            if(dbPassword===admin_password){
                const uniqueSessionId = uuid();
                authService.setAdmin(uniqueSessionId,admin_email);
                return{
                    status:200,
                    message:"Login Successfull " + uniqueSessionId
                }
            }
            else
            {
                return{
                    status:400,
                    message:"Invalid Password"
                }
            }
        }
    }
}

module.exports = adminService;