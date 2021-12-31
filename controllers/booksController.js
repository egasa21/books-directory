const Books = require('../models/Books');

module.exports = {
    viewBooks: async (req, res) =>{
        try{
            const books = await Books.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');

            const alert = {message: alertMessage, status: alertStatus};

            res.render('index', {
                books,
                alert,
                title: 'Books Directory'
            });
        }catch(error){
            res.redirect('/books');
        }
    },
    addBook: async (req, res)=>{
        try{
            const{author, releaseDate, title, description} = req.body;
            await Books.create({author, releaseDate, title, description});
            req.flash('alertMessage', 'Book addes successfully');
            req.flash('alertStatus', 'success');
            res.redirect('/books')
        }
        catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/books')
        }
    },
    editBook: async (req, res)=>{
        try{
            const {id, author, releaseDate, title, description} = req.body;
            const books = await Books.findOne({_id: id});

            books.author = author;
            books.releaseDate = releaseDate;
            books.title = title;
            books.description = description;

            await books.save();
            req.flash('alertMessage', 'Book data edited successfully');
            req.flash('alertStatus', 'success');

            res.redirect('/books')
        }catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/books')
        }
    },
    deleteBook: async (req, res )=>{
        try{
            const { id } = req.params;
            const books = await Books.findOne({_id: id});
            await books.remove();
            req.flash('alertMessage', 'Book deleted successfuly')
            req.flash('alertStatus', 'danger');
            res.redirect('/books')
        }catch(error){
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/books')
        }
    }
}