let user = JSON.parse(sessionStorage.user || null)

let loader = document.querySelector('.loader')
const productListingElement = document.querySelector('.product-listing')
const infolists = document.querySelector('.info-container')
const adminName = document.querySelector('#adminName')
const productsContainer = document.querySelector('.products-container')
const newsContainer = document.querySelector('.news-container')
const infoContainer = document.querySelector('.info-container')
const show_products = document.querySelector('.showPrds')
const show_news = document.querySelector('.showNews')
const show_info = document.querySelector('.showInfo')
const title = document.querySelector('.dashboard-title')

show_products.addEventListener('click', () => {
    title.innerText = 'PRODUCTS'
    show_products.style.opacity = '1'
    show_news.style.opacity = '0.7'
    show_products.style.textDecoration = 'underline'
    show_news.style.textDecoration = 'none'
    show_info.style.opacity = '0.7'
    show_info.style.textDecoration = 'none'
    productsContainer.classList.remove('hide')
    infoContainer.classList.add('hide')
    newsContainer.classList.add('hide')
})
show_news.addEventListener('click', () => {
    title.innerText = 'NEWS'
    show_news.style.opacity = '1'
    show_products.style.opacity = '0.7'
    show_info.style.opacity = '0.7'
    show_info.style.textDecoration = 'none'
    show_products.style.textDecoration = 'none'
    show_news.style.textDecoration = 'underline'
    productsContainer.classList.add('hide')
    infoContainer.classList.add('hide')
    newsContainer.classList.remove('hide')

})
show_info.addEventListener('click', () => {
    title.innerText = 'INFO'
    show_info.style.opacity = '1'
    show_products.style.opacity = '0.7'
    show_news.style.opacity = '0.7'
    show_news.style.textDecoration = 'none'
    show_products.style.textDecoration = 'none'
    show_info.style.textDecoration = 'underline'
    productsContainer.classList.add('hide')
    infoContainer.classList.remove('hide')
    newsContainer.classList.add('hide')

})
window.onload = () => {
    if (user) {
        if (compareToken(user.authToken, user.email)) {
            if (!user.seller) {
                location.href = '/login'

            } else {
                loader.style.display = "block"
                adminName.innerHTML = `${user.name}`
                setupProducts()
                setupPosts()
                getInfo()
            }
        }
    } else {
        location.href = "/login"
    }
}

const setupProducts = () => {
    fetch('/get-products', {
            method: 'post',
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({ email: user.email })
        })
        .then(res => res.json())
        .then(data => {
            loader.style.display = null
            productListingElement.classList.remove('hide')
            if (data == 'no products') {
                let emptySvg = document.querySelector('.no-products-img')
                emptySvg.classList.remove('hide')

            } else {
                data.forEach(product => createProduct(product))
            }
        })
}
const setupPosts = () => {
    fetch('/get-news', {
            method: 'post',
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({ email: user.email })
        })
        .then(res => res.json())
        .then(data => {
            loader.style.display = null
            productListingElement.classList.remove('hide')
            if (data == 'no news') {
                let emptySvg = document.querySelector('.no-products-img')
                emptySvg.classList.remove('hide')

            } else {
                data.forEach(post => createPost(post))
            }
        })
}

const getInfo = () => {
    fetch('/get-info', {
            method: 'post',
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({ email: user.email })
        })
        .then(res => res.json())
        .then(data => {
            loader.style.display = null
            if (data == 'no info') {
                let emptySvg = document.querySelector('.no-products-img')
                // emptySvg.classList.remove('hide')

            } else {
                setupInfo(data)
            }
        })
}
let first_about_title = document.querySelector('.first_ab_tit')
let sec_about_title = document.querySelector('.sec_ab_tit')
let third_about_title = document.querySelector('.third_ab_tit')

let first_about_content = document.querySelector('.first_ab_con')
let sec_about_content = document.querySelector('.sec_ab_con')
let third_about_content = document.querySelector('.third_ab_con')

const setupInfo = (data) => {
    first_about_title.value = data.FirstTitle
    sec_about_title.value = data.SecTitle
    third_about_title.value = data.ThirdTitle 

    first_about_content.value = data.FirstContent 
    sec_about_content.value = data.SecContent
    third_about_content.value = data.ThirdContent

}

const saveInfo = () =>{
    return data = {
        FirstTitle: first_about_title.value,
        SecTitle: sec_about_title.value,
        ThirdTitle: third_about_title.value,

        FirstContent: first_about_content.value,
        SecContent: sec_about_content.value,
        ThirdContent: third_about_content.value
    }
}

document.querySelector('.save-info').addEventListener('click',()=>{
    let data = saveInfo()
    sendData('/save-info', data)

})
