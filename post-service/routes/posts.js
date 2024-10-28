const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { body, validationResult } = require('express-validator');

// Fungsi untuk mengirim respons JSON
const sendResponse = (res, status, message, data = null) => {
    return res.status(status).json({ status: status < 400, message, data });
};

/**
 * INDEX POSTS
 */
router.get('/', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM posts ORDER BY id DESC');
        sendResponse(res, 200, 'List Data Posts', rows);
    } catch {
        sendResponse(res, 500, 'Internal Server Error');
    }
});

/**
 * STORE POSTS
 */
router.post('/store', [
    body('title').notEmpty(),
    body('content').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendResponse(res, 422, 'Validation Errors', errors.array());

    const formData = { title: req.body.title, content: req.body.content };

    try {
        const result = await query('INSERT INTO posts SET ?', formData);
        sendResponse(res, 201, 'Insert Data Successfully', result);
    } catch {
        sendResponse(res, 500, 'Internal Server Error');
    }
});

/**
 * SHOW POST
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const rows = await query('SELECT * FROM posts WHERE id = ?', [id]);
        if (rows.length === 0) return sendResponse(res, 404, 'Data Not Found!');
        sendResponse(res, 200, 'Detail Data Post', rows[0]);
    } catch {
        sendResponse(res, 500, 'Internal Server Error');
    }
});

/**
 * UPDATE POST
 */
router.patch('/update/:id', [
    body('title').notEmpty(),
    body('content').notEmpty()
], async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendResponse(res, 422, 'Validation Errors', errors.array());

    const formData = { title: req.body.title, content: req.body.content };

    try {
        const result = await query('SELECT * FROM posts WHERE id = ?', [id]);
        if (result.length === 0) return sendResponse(res, 404, 'Post not found');

        await query('UPDATE posts SET ? WHERE id = ?', [formData, id]);
        sendResponse(res, 200, 'Update Data Successfully!');
    } catch {
        sendResponse(res, 500, 'Internal Server Error');
    }
});

/**
 * DELETE POST
 */
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await query('DELETE FROM posts WHERE id = ?', [id]);
        if (result.affectedRows === 0) return sendResponse(res, 404, `Post with ID ${id} not found!`);
        sendResponse(res, 200, 'Delete Data Successfully!');
    } catch {
        sendResponse(res, 500, 'Internal Server Error');
    }
});

module.exports = router;
