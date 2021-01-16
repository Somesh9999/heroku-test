
const express= require('express');

const router = express.Router();
const ceckAuth= require('../middleware/check-auth');
const postController= require('../controllers/post');
const extractFile= require('../middleware/mime-type')



router.post('',ceckAuth,extractFile,postController.postCreate);

router.get('',postController.postFetch);

router.get('/:id',postController.postFetchById)

router.put('/:id',ceckAuth, extractFile,postController.postUpdate)

router.delete('/:id',ceckAuth,postController.postDelete);

module.exports=router;
