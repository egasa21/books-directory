const router = require('express').Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.viewBooks);
router.post('/', booksController.addBook);
router.put('/',booksController.editBook);
router.delete('/:id', booksController.deleteBook)

module.exports = router;