const express       = require('express'),
      router        = express.Router(),
      multer        = require('multer'),
      path          = require('path'),
      fs            = require('fs'),
      Book          = require('../models/book'),
      Author        = require('../models/authors'),
      uploadPath    = path.join('public', Book.coverImageBasePath),
      imageMimeTypes= ['image/jpeg', 'image/png'],
      upload        = multer({
            dest       : uploadPath,
            fileFilter : (req, file, callback) =>{
                callback(null, imageMimeTypes.includes(file.mimetype))
            } 
      });

// GET ALL Books  
router.get('/', async(req, res)=>{
   let query = Book.find();
   if(req.query.title != null && req.query.title != ''){
      query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishDate', req.query.publishedAfter)
    }
    try{
        const books = await query.exec()
        res.render('books/index',{
            books: books,
            searchOptions : req.query
        })
    } catch {
        res.redirect('/')
    }
  
})

// GET NEW Book
router.get('/new', async(req, res)=>{
    renderNewPage(res, new Book())
})
//CREATE BOOK
router.post('/', upload.single('cover') , async(req, res)=>{
    const fileName = req.file != null ? req.file.filename:null
    const book = new Book({
        title          : req.body.title,
        author         : req.body.author,
        publishDate    : new Date(req.body.publishDate),
        pageCount      : req.body.pageCount,
        coverImageName : fileName,
        description    : req.body.description
    })
 
    try{
        const newBook = await book.save() 
        res.redirect('books');
        console.log('try');
    }catch{
        console.log('catch');
        if(book.coverImageName != null){
            removeBookCover(book.coverImageName)
        }
        renderNewPage(res, book, true)
        
    }
})

function removeBookCover(fileName){
    fs.unlink(path.join(uploadPath, fileName), err=>{
        if(err) console.log(err);
    })
}
async function renderNewPage(res, book, hasError = false) {
    try {
      const authors = await Author.find({})
      const params = { authors: authors, book: book}
      if (hasError) params.errorMessage = 'Error Creating Book'
      res.render('books/new', params)
    } catch {
      res.redirect('/books')
    }
  }
module.exports = router;