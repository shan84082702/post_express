const Post = require("../models/postsModel");
const successHandle = require("../service/successHandle");
const errorHandle = require("../service/errorHandle");

const postsController = {
    async getPosts(req, res){
        const posts = await Post.find();
        successHandle(res,posts);
    },

    async createPost(req, res){
        try{
            const newPost = await Post.create(
                {
                    name: req.body.name,
                    content: req.body.content.trim()
                }
            );
            const posts = await Post.find();
            successHandle(res,posts);
        }
        catch(error){
            errorHandle(res,400,"資料填寫不正確");
        }
    },

    async deleteAllPosts(req, res){
        //刪除單一貼文但未填寫ID的狀況處理
        if(req.originalUrl === "/posts/"){
            errorHandle(res,400,"未填寫欲刪除之id");
        }
        else{
            await Post.deleteMany({});
            successHandle(res,[]);
        }
    },

    async deletePost(req, res){
        try{
            const id = req.params.id;
            const deletePost = await Post.findByIdAndDelete(id);
            if(deletePost !== null){
                const posts = await Post.find();
                successHandle(res,posts);
            }
            else{
                errorHandle(res,400,"查無此id");
            }
        }
        catch(error){
            errorHandle(res,400,"資料填寫不正確");
        }
    },

    async patchPost(req, res){
        try{
            const id = req.params.id;
            const name = req.body.name;
            const content = req.body.content.trim();
            if(name !== undefined && name !== "" && content !== undefined && content !== ""){
                const updateData = {
                    name: name,
                    content: content
                }
                const updatePost = await Post.findByIdAndUpdate(id,updateData,{new:true});
                if(updatePost !== null){
                    const posts = await Post.find();
                    successHandle(res,posts);
                }
                else{
                    errorHandle(res,400,"查無此id");
                }
            }
            else{
                errorHandle(res,400,"資料填寫不正確");
            }
        }
        catch(error){
            console.log(error);
            errorHandle(res,400,"資料填寫不正確");
        }
    },
};

module.exports = postsController;