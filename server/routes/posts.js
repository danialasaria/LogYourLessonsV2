import express from 'express';

import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, paidPost, commentPost, deletePost } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/paidPost', auth, paidPost);
router.post('/:id/commentPost', commentPost);

export default router;