"use server";

import { db } from "@/lib/db";
import { farmMembers, users } from "@/lib/schema";
import { stackServerApp } from "@/stack";

export async function acceptInvitation(prevState:unknown, formData: FormData) {

   const email = formData.get('email') as string
   const farmId = formData.get('farm_id') as string
   const password = formData.get('password') as string
    const sender = formData.get('sender') as string
    const name = formData.get('name') as string
    
   try {

    if(!email || !farmId || !password || !name || !sender) {
        throw new Error('Email and farm ID are required')
    }

    // check if the user already exists
    const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
    })

    if (existingUser) {
        throw new Error('User already exists')
    }

  

    
   const new_user =  await stackServerApp.createUser({
    primaryEmail: email,
    displayName: name,
    password: password,
    primaryEmailVerified: true,
    serverMetadata: {
        farmId: farmId,
        sender: sender,
    }
})

console.log(new_user)

if (!new_user) {
      throw new Error('User not created')
 }

 console.log('User created successfully:', new_user.serverMetadata)

//create a new user 
const new_db_user  = await db.insert(users).values({
    id: new_user.id,
    email: email,
    name: name,
})     
  
    // add the user to the farm

    const new_farm_member = await db.insert(farmMembers).values({
        user_id: new_user.id,
        farm_id: parseInt(farmId),
    })


    if (!new_farm_member) {
        throw new Error('Farm member not created')
    }

    return {
        success: true,
        message: 'Invitation accepted successfully!'
    }


   } catch (error) {

    console.error('Error accepting invitation:', error)
    return {
        success: false,
        message: 'Error accepting invitation: '
    }
    
   }



}