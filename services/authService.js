const jwt = require("jsonwebtoken");
const secretKey = "Minimis$13khan12";
class authService{
    static sessionIdToAdminMap = new Map()
    static async setAdmin(id,admin_email) {
        return this.sessionIdToAdminMap.set(id,admin_email);
    }

    static async getUser(id,admin_email){
        return this.sessionIdToAdminMap.get(id);
    }

  static async createAdminToken(email) {
  return jwt.sign({
    role:"User",
    email:"email" 
    }, secretKey, { expiresIn: "1h" });
}

static async verifyAdminToken(token) {
  try {
    return jwt.verify(token, secretKey); // returns decoded payload if valid
  } catch (err) {
    // handle errors gracefully
    if (err.name === "TokenExpiredError") {
        return null;
    }
  }
}


}

module.exports = authService;