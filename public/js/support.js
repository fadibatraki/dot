let Support_section = `
<img src="../img/loader.gif" alt="" class="loader">
<div class="alert-box">
    <img src="../img/error.png" alt="" class="img-fluid alert-img">
    <p class="alert-msg">Error message</p>
</div>

<div class="alert-box success">
            <img src="../img/success.png" alt="" class="img-fluid alert-img">
            <p class="alert-msg success-msg">Error message</p>
        </div>
<div class="chat-support-container hide-support-container">
    <div class="chat-support-content">
        <div class="support-details support-title"><h4 class="title-content">Got any questions? directly chat with our team!</h4></div>
        <div class="support-details support-sender"><input class="sender-content" placeholder="Sender, ex. johndoe@name.domain" id="sender"></input></div>
        <div class="support-details support-subject"><input class="subject-content" placeholder="Subject, ex. Sales enquiry" id="subject"></input></div>
        <div class="support-details support-message"><textarea class="message-content" placeholder="Content of your message..." id="message"></textarea></div>
        <div class="send"><button class="send-message-btn btn">send message</button></div>
    </div>
</div>
<div class="show-chat-support">
<span class="btn show-chat-support-btn">
    <i class="fa fa-ticket" aria-hidden="true"></i>
</span>
</div>`

let myheader = document.querySelector('body')
myheader.innerHTML += Support_section
var showSupportContainer = document.querySelector(".chat-support-container")
var showSupportBtn = document.querySelector(".show-chat-support-btn")
var sender = document.querySelector('.sender-content')
var subject = document.querySelector('.subject-content')
var msg = document.querySelector('.message-content')
var sendMsg = document.querySelector('.send-message-btn')
let loader = document.querySelector('.loader')


showSupportBtn.addEventListener("click",()=>{
    showSupportContainer.classList.toggle("hide-support-container")
})
const validateEmail = (email) => {
    return String(email)
.toLowerCase()
.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
};
const createMsg = () =>{
        validEmail = ""
        if (validateEmail(sender.value)) 
        {validEmail = sender.value
            return data = {
                Id:sender.value.split('@')[0] +"-"+ Math.floor(Math.random()*999),
                Subject:subject.value,
                Sender: sender.value,
                Message: msg.value
            }
        }
        else {showAlert("الرجاء ادخال ايميل صالح")
}

}
sendMsg.addEventListener('click',()=>{
    loader.style.display = 'block'
    let data = createMsg()
    if(validateEmail(sender.value))
        sendMessage('/support',data) // NOT DEFINED
})
const sendMessage = (path, data) => {
    fetch(path, {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        }).then((res) => res.json())
        .then(response => {
            processMessage(response)
        })
}

const processMessage = (data) => {
    if (data.alert) {
        showSuccess(data.alert)
    }
    else
        showAlert("EXCEPTION: UNKNOWN TYPE OF DATA")
}
const showAlert = (msg) => {
    loader.style.display = 'none'
    let alertBox = document.querySelector('.alert-box')
    let alertMsg = document.querySelector('.alert-msg')
    alertMsg.innerHTML = msg
    alertBox.classList.add('show')
    setTimeout(() => {
        alertBox.classList.remove('show')
    }, 3000)
return false
}

const showSuccess = (msg) => {
    loader.style.display = 'none'
    let alertBox = document.querySelector('.alert-box.success')
    let alertMsg = document.querySelector('.alert-msg.success-msg')
    alertMsg.innerHTML = msg
    alertBox.classList.add('show')
    setTimeout(() => {
        alertBox.classList.remove('show')
    }, 3000)
    return true
}