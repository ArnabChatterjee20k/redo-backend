import user from "../model/user.js";

export const login = async(req,res) => {
    try {
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(200).json({
                success:false,
                message:"All fields are required",
            })
        }

        const checkUser = await user.findOne({username:username});
        if (!checkUser) {
            return res.status(200).json({
              success: false,
              message: "User already registered",
            });
          }
          if(checkUser.password !== password){
            return res.status(200).json({
                success:false,
                message:"Password incorrect",
            })}
            return res.status(200).json({
                success:true,
                message:"Login successfully",
                id:checkUser._id,
                username:checkUser.username,
            })
    
}
catch{
    return res.status(200).json({
        success:false,
        message:"Something went wrong",
    })
}
}