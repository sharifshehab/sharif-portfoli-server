import bcryptjs from "bcryptjs";
import { User } from "../modules/user/user.model";
import { envVars } from "../config/env";
import { IUser, Role } from "../modules/user/user.interface";

export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });

        if (isSuperAdminExist) {
            console.log("Admin Already Exists!");
            return;
        }
        console.log("Trying to create Admin...");

        const hashedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))

        const payload: IUser = {
            name: "Admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            role: Role.ADMIN,
        }
        await User.create(payload);

    } catch (error) {
        console.log(error);
    }
}