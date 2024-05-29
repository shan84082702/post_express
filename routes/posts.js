var express = require('express');
var router = express.Router();
const PostController = require("../controllers/postsController");

router.get('/', PostController.getPosts);

router.post('/', PostController.createPost);

router.delete('/', PostController.deleteAllPosts);

router.delete('/:id', PostController.deletePost);

router.patch('/:id', PostController.patchPost);

module.exports = router;
