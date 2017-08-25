$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    function populateData(){
        $.get("/showall",(data)=>{
            data.forEach(function(value) {
                $(".data").append(`<div class="divider"></div>
                    <div class="section">
                    <h5>${value.title}</h5>
                    <p>${value.excerpt}</p>
                    </div>`
                )
            });
        })
    }

    $(".scrape-button").on("click",()=>{
        $.get("/scrape",()=>{
            populateData()

        })
    })


});