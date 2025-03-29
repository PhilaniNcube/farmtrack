"use server"

import { stackServerApp } from '@/stack';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInviteToUser(prevState:unknown, formData: FormData) {

    const email = formData.get('email') as string
    const farmId = formData.get('farm_id') as string

    



    try {

        const authUser = await stackServerApp.getUser()
        
        if (!authUser) {
            throw new Error('User not authenticated')
        }

        // get the email address of the user who is logged in
        const userEmail = authUser.primaryEmail

        if (!email || !farmId) {
            throw new Error('Email and farm ID are required')
        }

        // check if the email address is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email address')
        }

        // send the email using Resend
        const response = await resend.emails.send({
            from : "SikunyeAgro <info@sikunyeagro.com>",
            to: [email],
            subject: `Invitation to join farm team from ${userEmail}`,
            html: `
                <h1>Join our farm team!</h1>
                <p>You have been invited to join our farm team. Click the link below to accept the invitation:</p>
                <a href="${process.env.WEBSITE_URL}/accept-invite?email=${email}&farm_id=${farmId}&sender=${userEmail}">Accept Invitation</a>
                `,
            text: `Join our farm team! You have been invited to join our farm team. Click the link below to accept the invitation: ${process.env.WEBSITE_URL}/accept-invite?email=${email}&farm_id=${farmId}&sender=${userEmail}`,
        }) 

        if(response.error) {
            throw new Error(response.error.message)
        }

        console.log('Email sent successfully:', response.data)
        return {
            success: true,
            message: 'Invitation sent successfully!'
        }
        
    } catch (error) {
       console.error('Error sending invite:', error)
       return {
         error: 'Failed to send invite. Please try again later.'
       }
        
    }

    // send an invitation email to the users email address using resnd


}