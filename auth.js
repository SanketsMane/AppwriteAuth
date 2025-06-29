import { use } from 'react';
import conf from '../config/conf.js';
import {Client, Account, ID } from 'appwrite';

export class AuthService {

    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite Project ID
        this.account = new Account(this.client)
    }

//createAccount for the user
    async createAccount(email,password,name){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount)
            {
                // call another methood - after account created go to login page !
                this.login(email,password); // Automatically log in the user after account creation
               
                //OR Else you can return the user account details

                // console.log("Account created successfully:", userAccount);
                // return userAccount; // Return the user account details
            }
            else{
                console.error("Account creation failed: No user account returned");
                throw new Error("Account creation failed");
            }

        }
        catch (error){
            console.error("Error creating account:", error);
            throw error; // Re-throw the error for further handling 
        }
    }


//Login for the user
    async login(email,password){
        try{
            return await this.account.createEmailSession(email,password);
            console.log("User Logged in successfully ..");

        }
        catch(error)
        {
            throw error; // Re-throw the error for further handling
        }
    }

//Get the current user
    async getCurrecntUser() {
        try{
                return await this.account.get();
                
        }
        catch(error)
        {
            console.error("Error getting current user:", error);
            throw error; // Re-throw the error for further handling
        }

        return null; // Return null if no user is logged in
    }

//Logout the user
    async logout() {
        try{

            await this.account.deleteSession(); // Deletes the current session
            console.log("User logged out successfully.");
            return true; // Return true to indicate successful logout

        }
        catch(error)
        {
            console.error("Error logging out:", error);
            throw error; // Re-throw the error for further handling
        }
    }
}

const authservice = new authservice();
export default AuthService
