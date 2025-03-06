import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./db.js"; // Ensure correct import
import cors from "cors";
import nodemailer from 'nodemailer';
 // Allow all origins
dotenv.config({ path: "./src/.env" });
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || "your_secret_key"; // Use a strong secret key
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

// Middleware to verify token
// Middleware to verify token
const verifyToken = (req, res, next) => {
    console.log(req.header)
    const token = req.header("Authorization"); // Get token from request header

    if (!token) {
        console.log("Token not send");
        
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret); // Verify token
        req.user = decoded; 
        console.log("Verified",req.user);
        // Store decoded user data
        next(); // Proceed to next middleware or route
    } catch (error) {
        console.log("error ",error);
        
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function verifyEmail(email) {
    // const API_KEY = 8331ba30b969fa4b03bc4d4199755c28; // Replace with your actual API key
    const url = `
    https://apilayer.net/api/check
    ? access_key = 4bc460798b5e188ef03cf50ad3aa601e
    & email = ${email}
    & smtp = 0
    & format = 1
    `;

    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        // Check if the email is valid and exists
        if (data.format_valid && data.smtp_check) {
            console.log("mail exist");
            
            return true; // Email is valid
        } else {
            console.log("mail not exist");
            
            return false; // Email is invalid or does not exist
        }
    } catch (error) {
        console.error("Email verification failed:", error);
        return false;
    }
}

async function startServer() {
    const db = await connectDB(); // Wait for DB connection
    const User_collection = db.collection("users");

    // Token verification endpoint
    app.get("/api/verify-token", verifyToken, (req, res) => {
    res.status(200).json({ message: "Token is valid", user: req.user });
    });

    app.post("/api/register", async(req, res) => {
        try{
            //recevie data from client
            const {username,password} = req.body;
            const user = await User_collection.findOne({username})
            //find the user who has same email
            if(user){
                //if user exist return 401 error
                console.log("user already exist from server 401 res");
                return res.status(401).json({ message: "User already exists from server" });    
            }
            // Is all OKey Hash password and store in DB
            const hashedPassword = await bcrypt.hash(password, 10);
            await User_collection.insertOne({username,password:hashedPassword});
            console.log("user registered successfully");
            return res.status(201).json({ message: "User registered successfully" });
            //res 200 or 201 success message
            
        }
        catch(err){
            //return server error
            console.error("Error in /register:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    });

    app.post("/api/login",async(req,res)=>{
        //get data from user
      try{
        const {username,password}=req.body;
        //find user from DB
        const user = await User_collection.findOne({username});

        if(!user){
        //not found , user not exist
            return res.status(401).json({ message: "User does not exist" });
        }
        console.log(user);
        //compare hash password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            //If not match password was incorrect
            return res.status(401).json({ message: "Invalid credentials" });
        }
        //is all okey sign the JWT with needed data from user as js object 
        const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });

      }
      catch(error){
        console.log("Error in /login route,",error);
        res.status(500).json({ message: "Internal server error" });
      }


    })

    // Forgot Password Route
    app.post('/api/forgot-password', async (req, res) => {
    const { username } = req.body;
    console.log(username);
    try {

        const user = await User_collection.findOne({username});

        console.log(user);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        // try {
        //     await transporter.verify();
        //     console.log("SMTP Connected Successfully!");
        // } catch (error) {
        //     console.error("SMTP Connection Error:", error);
        // }
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '15m' });
        console.log(token);
        
        // Reset password link
        const resetLink = `http://localhost:3000/forgot-password/${token}`;

        // Send email
        await transporter.sendMail({
           from: `"vijayalayan" <${process.env.EMAIL_USER}>`,
            to: user.username,
            subject: "Reset Your Password",
            html: `<p><a href=${resetLink}>Click to reset your password.</a> This link expires in 15 minutes.</p>`,
        });
        console.log("Email send successfull")
        res.status(200).json({ message: "Verification email sent!" ,token});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
    });

    app.post("/api/send-otp",async(req,res)=>{
        const {username} = req.body;
        // console.log(username);
        const user = await User_collection.findOne({username});
        console.log(user);
        if(!user) return res.status(401).json({message:"User not found!!"})

        //(Real time Email existance)
        // const isEmailValid = await verifyEmail(user.username);

        // if (!isEmailValid) {
        //     console.log("Mail id not exist");
            
        //     return res.status(400).json({ message: "Invalid email address. Please enter a real email!" });
        // }

        const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '15m' });
        // console.log(token);  

        const gen_OTP = Math. floor(Math. random() * (999999 - 100000 + 1)) + 100000
        console.log(gen_OTP);

      try{
          // Check if the mail server is valid
          await transporter.verify();

            await transporter.sendMail({
            from: `"vijayalayan" <${process.env.EMAIL_USER}>`,
             to: user.username,
             subject: "Verify OTP",
             html: `<p>Verify your mail id , using OTP ${gen_OTP} ,This link expires in 15 minutes.</p>`,
         });
         console.log("Email send successfully");
         
         res.status(200).json({ message: `OTP Send to ${user.username}`, gen_OTP ,token});
      }
      catch(err){
        console.log("server error",err);
        
        res.sendStatus(500).json({message:"Server error"})
      }

    }) 

    app.post("/api/reset-password",async(req,res)=>{
        try{
            const {password,username} = req.body;
        // console.log(username,password);

        const hashedPassword = await bcrypt.hash(password, 10);

        await User_collection.updateOne({username:username},{$set:{password : hashedPassword}});

        const user = await User_collection.findOne({username});

        res.status(200).json({message:`Password rested to ${username}`});
        }
        catch(err){ 
            res.status(500).json({message:"Server error !!"});
        }
    })

    app.listen(port, () => {
        console.log(`Server is connected to the database and running on port ${port}`);
    });
}

(async () => {
    await startServer();
})(); // Start server after DB is connected
