var utility = require('./utility/utility')

module.exports=(app)=>{
    //Route to scrape the data
    app.get("/scrape",(req,res)=>{
        utility.getHtmlBody((body)=>{
            body ? utility.scrapeData(body): res.send("ERROR")
        })
        res.render("index")
    })
    //Route to delete
    app.post("/deletenote",(req,res)=>{

    })

    //Route to delete
    app.post("/deletearticle",(req,res)=>{
        utility.deleteArticle(req.body)

    })

    //Add note
    app.post("/addnote",(req,res)=>{
        utility.addNote("test","1529790",(note)=>{
            if(note){
                return res.send(note)
            }
            res.send("error")
        })
    })

    //Route to load all Articles
    app.get("/showall",(req,res)=>{
        utility.showArticles((articles)=>{
            res.send(articles)
        })
    })
    //Load notes per Article
    app.get("/notes/:id",(req,res)=>{

    })

    //Delete a note
    //Load notes per Article
    app.delete("/notes/:id",(req,res)=>{

    })
}