const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
  try{
    // we are receiving token from the req header in the form of "Bear hjrwehrkwe" thats why we are using the split operation and then recieve the 2nd element ie token
    const token= req.headers.authorization.split(" ")[1];
    const decodedToken= jwt.verify(token, process.env.JWT_KEY); //verify method verifies the token and returns a decoded string
    req.userData= {email: decodedToken.email, userId: decodedToken.userId};
    next();
  }catch{
    res.status(401).json({
      message: "User is not Authenticated!"
    })
  }
}
