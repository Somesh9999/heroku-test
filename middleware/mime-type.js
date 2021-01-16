const multer= require('multer');

const MIME_TYPE_MAP={
  "image/png":"png",
  "image/jpeg":"jpg",
  "image/jpg":"jpg",
}

const storage= multer.diskStorage({
  destination: (req,file,cb)=>{     //cb is a callback functions that returns the values to multer
     typeCheck= MIME_TYPE_MAP[file.mimetype];
     error= new Error("Invalid Mime Type");
    if(typeCheck){
      error=null;
    }
    cb(error,"images");  //This path is relative to the server.js file
  },
  filename: (req,file,cb)=>{
    const filename= file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null,filename+"-"+Date.now()+"."+ext);
  }
});

module.exports= multer({storage: storage}).single("image");
