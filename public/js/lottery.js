let user = JSON.parse(sessionStorage.user || null)
let loader = document.querySelector('.loader')
    //const timeElapsed = Date.now()
    //const today = new Date(timeElapsed)
let i = 1

//checking user is logged in as admin or not
window.onload = () => {
    if (user) {
        if (!compareToken(user.authToken, user.email)) {
            location.replace('/login')
        }
    } else {
        location.replace('/login')
    }

    userId.value = 1
}

//name, phonenumber, opinion, lovedProducts server
//userId username phonenumber useropn client

let name = document.querySelector('#username')
let phonenumber = document.querySelector('#phonenumber')
let useropn = document.querySelector('#useropn')
let btn = document.querySelector('#submitBtn')
let userId = document.querySelector('#userId')
let imgBtn = document.querySelector('#sendImg')
let productsArr = []
const storeLovedProducts = () => {
    productsArr = []
    let products = document.querySelectorAll('.checkbox')
    products.forEach(item => {
        if (item.checked)
            productsArr.push(item.id)
    })
}
const clearAllFields = () => {
    name.value = phonenumber.value = useropn.value = null
    let products = document.querySelectorAll('.checkbox')
    products.forEach(item => {
        if (item.checked)
            item.checked = false
    })
}
btn.addEventListener('click', () => {
    loader.style.display = 'block'
    storeLovedProducts()
    sendData('/lottery', {
        userId: userId.value,
        name: name.value,
        phonenumber: phonenumber.value,
        opinion: useropn.value,
        lovedProducts: productsArr
    })

    clearAllFields()

})
imgBtn.addEventListener('click', () => {
    loader.style.display = 'block'
    storeLovedProducts()
    sendData('/lottery', {
        userId: userId.value,
        name: name.value,
        phonenumber: phonenumber.value,
        opinion: useropn.value,
        lovedProducts: productsArr
    })
    clearAllFields()
})