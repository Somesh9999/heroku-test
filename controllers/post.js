const Post= require('../models/post');

exports.postCreate= (req,res,next)=>{
  const url= req.protocol + "://" + req.get('host');
  const post= new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url+"/images/"+req.file.filename,
    creator: req.userData.userId
  });
  post.save().then((createdPost)=>{
    res.status(201).json({
      message: "Post Added Successfully",
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath,
        creator: createdPost.userId
      }
    });
  }).catch(()=>{
    res.status(500).json({
      message:"Post Creation Failed!"
    })
  });
}

exports.postUpdate= (req,res,next)=>{
  let imagePath;
  const url= req.protocol + "://" + req.get('host');
  if(req.file){
    imagePath= url+"/images/"+req.file.filename;
  }
  else{
    imagePath=req.body.filename;
  }
  const post= new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });

  Post.updateOne({_id: req.params.id, creator: req.userData.userId},post).then((result)=>{
    if(result.n>0){
      res.status(200).json({
        message:"Update Successful!",
        post: result
      });
    }
    else{
      res.status(401).json({
        message:"User is not Authorized"
      });
    }
  }).catch(()=>{
    res.status(500).json({
      message:"Updating Post Failed!"
    })
  });
}

exports.postDelete= (req,res,next)=>{

  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId}).then((result)=>{
    if(result.n>0){
      res.status(200).json({
        message:"Post Deleted"
      });
    }
    else{
      res.status(401).json({
        message:"Not Authorized"
      });
    }
  }).catch(()=>{
    res.status(500).json({
      message:"Deleting Post Failed!"
    })
  });
}

exports.postFetch= (req,res,next)=>{
  const pageSize= +req.query.pageSize;
  const currentPage= +req.query.currentPage;
  let fetchedData;

  // this is done when we need to add a chain of actions to the database call, simply manipulate the call.
  const postQuery= Post.find();

  if(pageSize && currentPage){
    postQuery                           // this is done when we need to skip the initials posts and limit the number of posts
    .skip(pageSize * (currentPage-1))
    .limit(pageSize);
  }
  postQuery.then((document)=>{
    // This a subquery where we execute the count query on document fetched from find query and then  forward that count object ahead to bind it to the response.
    fetchedData=document;
    return Post.count();       // return an observable which is handle in the then block later

  }).then((count)=>{
    res.status(200).json(
      {
        message: "This is message from server",
        posts: fetchedData,
        postCount: count
      }
    );
  }).catch(()=>{
    res.status(500).json({
      message:"Fetching Posts Failed!"
    })
  });
}

exports.postFetchById= (req,res,next)=>{
  Post.findById({_id:req.params.id }).then((post)=>{
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({message:"Post not Found"});
    }
  }).catch(()=>{
    res.status(500).json({
      message:"Fetching Post Failed!"
    })
  });
}
