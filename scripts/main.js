
//для тестування створимо массив об'єктів, який буде симулювати дані на сервері
const DATA = [
    {id : 1, name : "Замітка 1", text : "Текст замітки 1", alert : "off"},
    {id : 2, name : "Замітка 2", text : "Текст замітки 2", alert : "off"},
    {id : 3, name : "Замітка 3", text : "Текст замітки 3", alert : "off"},
    {id : 4, name : "Замітка 4", text : "Текст замітки 4", alert : "off"},
    {id : 5, name : "Замітка 5", text : "Текст замітки 5", alert : "off"},
    {id : 6, name : "Замітка 6", text : "Текст замітки 6", alert : "off"},
    {id : 7, name : "Замітка 7", text : "Текст замітки 7", alert : "off"},
    {id : 8, name : "Замітка 8", text : "Текст замітки 8", alert : "off"},
]

//функція додавання даних в LocalStorage
function addDataToLocalStorage(data){
    localStorage.setItem("notes", JSON.stringify(data))
}

//функція отримання даних з LocalStorage
function getDataFromLocalStorage(){
    let data = JSON.parse(localStorage.getItem("notes"))
    if(!data){
        addDataToLocalStorage(DATA)
    } else {
        return data
    }

}

//для тестування функція генерації заміток
function generateNotes(data){

    let html = ''

    for (let i = 0; i < data.length; i++) {
        html += `
            <div class="col">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].name}</h5>
                        <p class="card-text">${data[i].text}</p>
                        <button class="btn btn-danger" id="${data[i].id}">Видалити</button>
                    </div>
                </div>
            </div>
        `
    }

    $("#content").html(html)
}


getDataFromLocalStorage()
$("document").ready(generateNotes(getDataFromLocalStorage()))



function add_note(){

    //знаходимо елементи на сторінці та отримуємо їх вміст
    const note_name = $("#note_name").val()
    const note_text = $("#note_text").val()
    const note_alert = $("#note_alert").val()

    const form = new FormData()

    //генеруємо тестовий id, в реальності сервер визначить сам
    form.append("id", Math.floor(Math.random() * 10000))
    form.append("name", note_name)
    form.append("text", note_text)
    form.append("alert", note_alert)

    //для тестування запишемо нову замітку в LocalStorage
    let data = getDataFromLocalStorage()
    let newNote = {id: Number(form.get("id")), name: note_name, text: note_text, alert: note_alert}
    data.push(newNote)
    addDataToLocalStorage(data)

    //симулюємо відправку даних на сервер
    sendRequest("addnote", form)

}

function sendRequest(command, formData){
    $.ajax({
        method: "post",
        url: `api/${command}`,
        processData: false,
        contentType: false,
        data: formData,
        //для тестування використовуємо error, перейдемо на головну сторінку та отримуємо актуальний масив даних
        error: window.location.href = 'main.html'
    })
}

//функція видалення замітки
function deleteNote(id){

    let form = new FormData()
    form.append("id", id)

    //для тестування оновлюємо дані в LocalStorage
    let data = getDataFromLocalStorage()
    let newData = data.filter(n => n.id !== id);
    console.log(newData)
    addDataToLocalStorage(newData)


    //симулюємо відправку даних на сервер
    sendRequest("del-note", form)
}


//функція обробки натискання на кнопку Додати
$("#submit").on("click", function (){
    add_note()
})

//функція натискання на кнопку Видалити
$("Button").on("click", function () {
    let id = $(this).attr("id")
    deleteNote(Number(id))
})

