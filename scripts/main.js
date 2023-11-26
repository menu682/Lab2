

function generateNotes(data){

    let html = ''

    for (let i = 0; i < data.length; i++) {
        html += `
            <div class="col">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].name}</h5>
                        <p class="card-text">${data[i].text}</p>
                        <button class="btn btn-danger" id="${data[i].id}" onclick="deleteNote(${data[i].id})">Видалити</button>
                    </div>
                </div>
            </div>
        `
    }

    $("#content").html(html)
}


$("document").ready(sendRequest("get", "", "", ""))



function add_note(){

    //знаходимо елементи на сторінці та отримуємо їх вміст
    const note_name = $("#note_name").val()
    const note_text = $("#note_text").val()
    const note_alert = $("#note_alert").val()

    const data = {
        "name" : note_name,
        "text" : note_text,
        "grand": false
    }

    sendRequest("POST", "", "application/json", JSON.stringify(data))
    window.location.href = "../template/main.html"
}

function sendRequest(method, command, contentType, formData){
    $.ajax({
        method: method,
        url: `http://localhost:8080/api/${command}`,
        contentType: contentType,
        data: formData,
        success: function (data){
            generateNotes(data)
        }
    })
}

//функція видалення замітки
function deleteNote(id){
    sendRequest("DELETE", `${id}`, "text", "")
    window.location.href = "../template/main.html"
}


//функція обробки натискання на кнопку Додати
$("#submit").on("click", function (){
    add_note()
})



