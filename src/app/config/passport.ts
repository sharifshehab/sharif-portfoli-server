/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";

// Import your application's User model and role enum
import { User } from "../modules/user/user.model";


// Login user with email and password  
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email: string, password: string, done) => {
            try {
                // Step 1: Find user by email
                const isUserExist = await User.findOne({ email });

                if (!isUserExist) {
                    // If user not found in DB, return an error message
                    return done("User does not exist")
                }


                // Step 3: Check submitted password with the password sotred in Database
                const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);

                if (!isPasswordMatched) {
                    // If password does not match, return error message
                    return done(null, false, { message: "Password does not match" });
                    // Note: done(error, user-data, info). Here, `user-data = false`, and info has the message
                }

                // Step 4: All checks passed — return the user to Passport
                return done(null, isUserExist);
            } catch (error) {
                // Catch and handle any unexpected errors (e.g., DB issues)
                console.log(error);
                done(error);
            }
        }
    )
);

// This function tells Passport how to store user data in the session (during login)
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    // Only the user's unique identifier (MongoDB _id) is saved in the session
    // This keeps the session lightweight instead of storing the whole user object
    done(null, user._id);
});

// This function is used by Passport to retrieve full user details from the session on each request
passport.deserializeUser(async (id: string, done: any) => {
    try {
        // Fetch the full user object from the database using the ID stored in session
        const user = await User.findById(id);

        // Attach the user object to the request (req.user)
        done(null, user);   /* Like in the JWT:  req.user = verifyToken */
    } catch (error) {
        // If an error occurs during DB lookup, handle it gracefully
        console.log(error);
        done(error);
    }
});