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
        console.log(req.body)
        utility.saveArticle(req.body)
        res.status(200).send({success:1})
    })


    //Route to delete an article
    app.post("/deletearticle",(req,res)=>{
        console.log(req.body)
        utility.deleteArticle(req.body)
        res.status(200).send({success:1})

    })

    //Add note
    app.post("/addnote",(req,res)=>{
        utility.addNote("test","1529790",(note)=>{
            if(note){
                return res.send(note)
            }
            res.redirect("/#")
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