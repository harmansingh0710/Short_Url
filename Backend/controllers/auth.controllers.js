import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../config/token.js";
import uploadOnCloudinary from "../config/cloudinary.js";

/* ================= SIGNUP ================= */
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ message: "Fill all details" });
    }

let profileImage;
if(req.file){
 profileImage = await uploadOnCloudinary(req.file.path)
}

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      profileImage,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user: {
        firstName,
        lastName,
        userName,
        email,
        profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, existUser.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(existUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      user: {
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        userName: existUser.userName,
        email: existUser.email,
        profileImage:existUser.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

    /* ================= USER ================= */


export const getUserData = async(req,res)=>{
try {
  let userId=req.userId;
  if(!userId){
    return res.status(400).json({message:"User id is not found"})
  }
  let user = await User.findById(userId)
  if(!user){
    return res.status(400).json({message:"User  not found"})
  }
  return res.status(200).json(user)
} catch (error) {
    
  return res.status(500).json({message:"internal server error"})
 
}
}











// import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
// import generateToken from "../config/token.js";

// // /* ================= SIGNUP ================= */

// export const signUp = async(req,res)=>{
//     try {
//         const {firstName,lastName,userName,email,password} = req.body;
//         if(!firstName || !lastName || !userName || !email || !password){
//         return res.status(400).json({message : "fill all details "})
//         }
//        let existUser = await User.findOne({email});
//        if(existUser){
//         return res.status(400).json({message : "User already exist"})
//        }
//     const hassedPassword =await bcrypt.hash(password,10)
//     const user = await User.create({
//         firstName,
//         lastName,
//         userName,
//         email,
//         password :hassedPassword,
//     })

//     let token;
//     try {
//       token = generateToken(user._id)
//     } catch (error) {
//        console.log(error) ;
//     } 

//     res.cookie("token",token,{
//         httponly: true,
//         secure:process.env.NODE_ENVIRONMENT == "production",
//         sameSite:"Strict",
//         maxAge:7*24*60*60*1000
//     })



//   return res.status(201).json({User:
//   {
//     firstName,
//         lastName,
//         userName,
//         email,
  
//     },
//       })

//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }

//        // /* ================= LOGIN ================= */

// export const login = async(req,res)=>{
// try {
//          const {email,password} = req.body;
// let existUser = await User.findOne({email})
// if(!existUser){
//     return res.status(400).json({message:"user does not exist"})
// }
// let match = await bcrypt.compare(password,existUser.password)
// if(!match){
// return res.status(400).json({message:"incorrect password"})
// }
// let token;
//     try {
//       token = generateToken(existUser._id)
//     } catch (error) {
//        console.log(error) ;
//     } 

//     res.cookie("token",token,{
//         httponly: true,
//         secure:process.env.NODE_ENVIRONMENT === "production",
//         sameSite:"Strict",
//         maxAge:7*24*60*60*1000
//     })
//    return res.status(201).json({User:
//   {
//        firstName:existUser.firstName,
//         lastName:existUser.lastName,
//         userName:existUser.userName,
//         email:existUser.email
  
//     }})
// } catch (error) {

//  return res.status(500).json(error)

// }}


//        // /* ================= LOGOUT ================= */
// export const logout = async(req,res)=>{
//     try {
//         res.clearCookie("token")
//          return res.status(200).json({message:"logout succesfull"})
//     } catch (error) {
//      return res.status(500).json(error)
//     }
// }
