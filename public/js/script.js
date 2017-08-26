$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    showScrapedData()

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

    function addNoteModal(id) {
        $(".save-data-modals").append(`
        <div id=${id} class="modal">
            <div class="modal-content">
            <h4>${id}</h4>
        </div>
        <div class="modal-footer">
            <a class="modal-action modal-close waves-effect waves-green btn-flat">OK</a>
        </div>
        `
        )


    }


    $(".data, .saved-data").on("click", "button", (event) => {
        var button_text = $(event.target).text()
        var article_id = $(event.target).attr("attr-id")
        var selector =  `#${article_id}`

        $('#'+article_id).modal().val();
        var obj = {
            method: "POST",
            data: {article_id}
        }

        if (button_text === "Save") {
            obj.url = "/savearticle"
            $.ajax(obj).done(() => {
                showScrapedData()
                addNoteModal(article_id)
            })
        } else if (button_text === "Remove Article") {
            obj.url = "/deletearticle"
            $.ajax(obj).done(() => {
                showSavedData()
            })
        } else if (button_text === "Add Note") {
            $("#"+article_id).modal('open')
        }
    })

    $(".scrape-button").on("click", () => {
        $.get("/scrape", () => {
            $(".data").show("fast", () => {
                $(".saved-data").hide()
            })
            showScrapedData()
        })


    })

    $("a.modal-scrape-ok").on("click",()=>{
        showScrapedData()
    })



    $(".saved-data-button").on("click", () => {
        $(".saved-data").empty()
        $.get("/showsaved", (data) => {
            data.forEach(function (value) {
                $(".saved-data").append(`<div class="divider"></div>
                    <div class="section">
                    <h5>${value.title}</h5>
                    <p>${value.excerpt} ${value.article_id}</p>
                    <button class="waves-effect waves-light btn" modal-trigger attr-id=${value.article_id} href="#${value.article_id}">Add Note</button>
                    <button class="waves-effect waves-light btn" attr-id=${value.article_id}>Remove Article</button>                                        
                    </div>`
                )
            });
        })
        $(".data").hide("fast", () => {
            $(".saved-data").show()
        })
    })


})