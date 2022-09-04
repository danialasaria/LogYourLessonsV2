import express from 'express';
import mongoose from 'mongoose';

import statsSchema from '../models/stats.js';

const router = express.Router();

//each total has a user id and total associated with it
export const addToTotal = async (req, res) => {
    const { newMoney } = req.body;

    try {

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}
