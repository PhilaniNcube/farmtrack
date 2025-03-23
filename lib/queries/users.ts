import "server-only";
import { z } from "zod";
import { db } from "@/lib/db";
import { stackServerApp } from "@/stack";
import { cache } from "react";

const getCurrentUser = cache(async () => {
    "use cache"
    // get the current user_id from stack
    const user = await stackServerApp.getUser();
    if (!user) {
        throw new Error("User not found");
    }

    // get the user id from the user object
    const userId = user.id;

    // get the user from the database
    const userFromDb = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userId)         
    });



    return userFromDb;
})

const getUserById = async (id: string) => {
    "use cache"
    // get the user from the database
    const userFromDb = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, id)         
    });

    return userFromDb;
}   

const getUserByEmail = async (email: string) => {
    "use cache"
    // get the user from the database
    const userFromDb = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email)         
    });
    return userFromDb;
}



export {
    getCurrentUser,
    getUserById,
    getUserByEmail
}