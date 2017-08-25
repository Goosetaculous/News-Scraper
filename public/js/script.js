$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    showScrapedData()
    showSavedData()


    function showScrapedData() {
        $(".data").empty()
        $.get("/showall", (data) => {
            data.forEach(function (value) {
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

    function showSavedData() {
        $(".saved-data").empty()
        $.get("/showsaved", (data) => {
            data.forEach(function (value) {
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
    }


    $(".data, .saved-data").on("click", "button", (event) => {
        var button_text = $(event.target).text()
        var article_id = $(event.target).attr("attr-id")
        var obj = {
            method: "POST",
            data: {article_id}
        }

        if (button_text === "Save") {
            obj.url = "/savearticle"
        } else if (button_text === "Remove Article") {
            obj.url = "/deletearticle"
        }
        $.ajax(obj).then(() => {
            showScrapedData()
            showSavedData()
        })
    })

    $(".scrape-button").on("click", () => {
        $(".data").show("fast", () => {
            $(".saved-data").hide()
        })
        $.get("/scrape", () => {
            showScrapedData()
        })
    })

    $(".saved-data-button").on("click", () => {
        $(".saved-data").empty()
        $.get("/showsaved", (data) => {
            data.forEach(function (value) {
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


        $(".data").hide("fast", () => {
            showSavedData()
            $(".saved-data").show()
        })
    })


})