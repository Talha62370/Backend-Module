const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

// Public routes (No token needed)
router.get('/', getBooks);
router.get('/:id', getBookById);

// Protected routes (Require token)
// We add "protect" as the second argument to act as the bouncer
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;