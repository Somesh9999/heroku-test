const express= require('express');
const router = express.Router();
const controller= require('../controllers/user');


router.post("/signup", controller.userCreate);

router.post("/login", controller.userLogin);

module.exports= router;

