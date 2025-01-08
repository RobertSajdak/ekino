import { db } from "@/server/providers/db"
import { eq, or } from "drizzle-orm";
import { usersTable } from "../schemas";
import { TUserRegistrationValidator } from "@/validators/user-validator";

const UserRepository = {

    async firstByEmail(email: string) {
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, email)
        });

        return user;
    },
    async firstById(id: string) {
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, id)
        });

        return user;
    },
    async firstByName(name: string) {
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.name, name)
        });

        return user;
    },
    async isExist(email: string, name: string) {
        const user = await db.query.usersTable.findFirst({
            where: or(eq(usersTable.email, email), eq(usersTable.name, name)),
        });

        return !!user;
    },
    async insert(email: string, name: string, password: string) {
        await db.insert(usersTable).values({
            name,
            email,
            password
        });
    },
    async update(id: string, user: TUserRegistrationValidator) {
        await db.update(usersTable).set(user).where(eq(usersTable.id, id))
    }
}

export default UserRepository;
