const express = require('express'),
      router = express.Router(),
      Author = require('../models/authors');
      Book   = require('../models/book')

// GET ALL AUTHORS  
router.get('/', async(req, res)=>{
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        console.log(req.query.name);
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{authors: authors, searchOptions :req.query})
    }catch{
        res.redirect('/')
    }
})

// GET AUTHORS
router.get('/new', (req, res)=>{
    res.render('authors/new', {author : new Author()})
})

//CREATE NEW AUTHOR
router.post('/', async(req, res)=>{
    const author = new Author({
        name : req.body.name
    })
    try{
        const newAuthor = await author.save()
        res.redirect('authors');
    }catch{
        res.render('authors/new',{author : author})
    }
   
})
// GET AUTHOR
router.get('/:id', async(req, res)=>{
    try{
        const author = await Author.findById(req.params.id)
        const books  = await Book.find({author : author.id}).limit(6).exec()
        res.render('authors/show', {
            author : author,
            booksByAuthor : books
        })
    }catch{
        res.redirect('/')
    }
})

// EDIT AUTHOR
router.get(':/id/edit', async (res, req)=>{
    try{
            const author =  await Author.findById(req.params.id)
            res.render(`authors/edit`,{auhtor: auhtor})
    }catch{
            res.redirect('/auhtors')
    }
    res.send('Edit Author'+ req.params.id)
})
// UPDATE AUTHOR
router.put(':id/', async(req, res)=>{
    let author
    try{
         author = await Author.findById(req.params.id)
         author.name   = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`);
    }catch{
        if(author == null){
            res.redirect('/')
        }else{
            res.render('authors/edit',{author : author})
        }
        
    }
})
// DELETE AUTHOR
router.delete('/:id', async(req, res)=>{
    let author
    try{
        author = await Author.findById(req.params.id)
        await author.remove()
        res.redirect('/authors');
    }catch{
        if(author == null){
            res.redirect('/')
        }else {
            res.redirect(`/authors/${author.id}`)
        }
    }
})
module.exports = router;