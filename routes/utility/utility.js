var cheerio = require('cheerio')
var request = require("request");
const {Articles} =  require('../../models/Articles')
const {Notes} =  require('../../models/Note')
const URL =  "https://techcrunch.com/"

function checkIfExist(title,article_id,excerpt){
    Articles.find({
        title,
        article_id,
        excerpt
    }).then((article)=>{
        article.length === 0 ? loadArticles(title,article_id,excerpt): null
    })
}

function loadArticles(title,article_id,excerpt){
    var articles =  new Articles({
        title,
        article_id,
        excerpt
    })
    articles.save().then(()=>{
        console.log("success")
    },(e)=>{
        console.log("E:",e)
    })
}

function pushToArticle(article_id,note_id){
    Articles.findOneAndUpdate({ article_id }, { $push: { "notes": note_id} }, { new: true }, function(err, newdoc) {
        if (!err) {
            console.log("success")
        } else {
            console.log("CHECK")
        }
    });
}

module.exports={
    getHtmlBody: (cb)=>{
        request(URL, function (error, response, body) {
            response && response.statusCode === 200 ? cb(body): cb()
        });
    },
    scrapeData: (body)=>{
        $ = cheerio.load(body);
        $('.river-block').each((i, element)=>{
            let title = $(element).attr("data-sharetitle")
            let excerpt =  $(element).find('.excerpt').text()
            let article_id =  $(element).attr("id")
            title && excerpt && article_id ? checkIfExist(title,article_id,excerpt): null
        })
    },
    showAllArticles: (cb)=>Articles.find({saved: false}).then((articles)=>cb(articles)),
    showSavedArticles: (cb)=>Articles.find({saved: true}).then((articles)=>cb(articles)),
    deleteArticle: (article_id)=>{
        console.log(article_id)
        Articles.findOneAndRemove( article_id ).then((result)=>{
            console.log(JSON.stringify(result, undefined, 2))
        })
    },
    saveArticle: (article_id,cb)=>{
        Articles.findOneAndUpdate(article_id,{$set:{saved: true}},{new: true},(err,doc)=>{
            if(!err){
                cb(doc)
            }
        })
    },
    showNote: (id,cb)=>Notes.find({article_id:id}).then((note)=>cb(note)),
    addNote: (text,article_id,_id,cb)=>{
        var note = new Notes({
            note:text,
            article_id: _id

        })
        note.save().then((note)=>{
            pushToArticle(article_id,note.id)
            cb(note)
        },(e)=>{
            console.log("E:",e)
        })
    }
}


