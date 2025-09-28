class authService{
    static sessionIdToAdminMap = new Map()
    static async setAdmin(id,admin_email) {
        return this.sessionIdToAdminMap.set(id,admin_email);
    }

    static async getUser(id,admin_email){
        return this.sessionIdToAdminMap.get(id);
    }
}

module.exports = authService;