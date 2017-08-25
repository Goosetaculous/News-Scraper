$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    populateData()


    function populateData(){
        $(".data").empty()
        $.get("/showall",(data)=>{
            data.forEach(function(value) {
                $(".data").append(`<div class="divider"></div>
                    <div class="section">
                    <h5>${value.title}</h5>
                    <p>${value.excerpt} ${value.article_id}</p>
                    <button class="waves-effect waves-light btn" attr-id=${value.article_id}>Save</button>                                        
                    </div>`
                )
            });
        })
    }

    $(".data").on("click","button",(event)=>{
        var article_id =  $(event.target).attr("attr-id")
        $.ajax({
            method: "POST",
            url:"/savearticle",
            data: {article_id}
        }).then(()=>{
            populateData()
        })
    })

    $(".scrape-button").on("click",()=>{
        populateData()
        $(".data").show("fast",()=>{
            $(".saved-data").hide()
        })
        $.get("/scrape",()=>{
            populateData()
        })
    })

    $(".saved-data-button").on("click",()=>{
        $.get("/showsaved",(data)=>{
            data.forEach(function(value) {
                $(".saved-data").append(`<div class="divider"></div>
                    <div class="section">
                    <h5>${value.title}</h5>
                    <p>${value.excerpt} ${value.article_id}</p>
                    <button class="waves-effect waves-light btn" attr-id=${value.article_id}>Add Note</button>
                    <button class="waves-effect waves-light btn" attr-id=${value.article_id}>Remove Article</button>                                        
                    </div>`
                )
            });
        })


        $(".data").hide("fast",()=>{
            $(".saved-data").show()
        })
    })


})