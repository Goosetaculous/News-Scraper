var utility = require('./utility/utility')

module.exports=(app)=>{
    //Route to scrape the data
    app.get("/scrape",(req,res)=>{
        utility.getHtmlBody((body)=>{
            body ? utility.scrapeData(body): res.send("ERROR")
        })
        res.status(200).send({success:1})
    })


    //Save article
    app.post("/savearticle",(req,res)=>{
        utility.saveArticle(req.body,(data)=>{
            res.status(200).send(data)
        })
    })


    //Route to delete an article
    app.post("/deletearticle",(req,res)=>{
        utility.deleteArticle(req.body)
        res.status(200).send({success:1})

    })

    //Add note
    app.post("/addnote",(req,res)=>{
        utility.addNote(req.body.text,req.body.article_id,req.body._id,(note)=>{
            if(note){
                res.redirect("/#")
            }

        })
    })

    //Route to delete
    app.post("/deletenote",(req,res)=>{

    })

    //Delete a note
    //Load notes per Article
    app.delete("/notes/:id",(req,res)=>{

    })

    //Load note per Article
    app.get("/notes/:id",(req,res)=>{
        utility.showNote(req.params.id,(notes)=>{
            res.send(notes)
        })

    })


    //Route to load all Articles
    app.get("/showall",(req,res)=>{
        utility.showAllArticles((articles)=>{
            res.send(articles)
        })
    })

    //Show saved articles
    app.get("/showsaved",(req,res)=>{
        utility.showSavedArticles((articles)=>{
            res.send(articles)
        })
    })




}