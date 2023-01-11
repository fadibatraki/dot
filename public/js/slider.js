// Slider
const setupSlidingEffect = () => {
        const productsContainer = [...document.querySelectorAll('.product-container')]
        const nxtBtn = [...document.querySelectorAll('.nxt-btn')]
        const preBtn = [...document.querySelectorAll('.pre-btn')]

        productsContainer.forEach((item, i) => {
            let containerDimenstions = item.getBoundingClientRect();
            let containerWidth = containerDimenstions.width;

            nxtBtn[i].addEventListener('click', () => {
                item.scrollLeft -= containerWidth;
            })
            preBtn[i].addEventListener('click', () => {
                item.scrollLeft += containerWidth;
            })
        })
    }
    //fetch product cards 
const getProducts = (tag) => {
    return fetch('/get-products', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ tag: tag })
        })
        .then(res => res.json())
        .then(data => {
            return data
        })
}
const getRandomProducts = () => {
    return fetch('/get-products', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(data => {
            return data
        })
}

//create product slider

const createProductSlider = (data, parent, title) => {
    let slideContainer = document.querySelector(`${parent}`)

    slideContainer.innerHTML += `

    <section class="product">
        <div class="section-title">
            <h2 class="product-category">
                ${title}
            </h2>
        </div>
        <button class="pre-btn btn"><i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
        <button class="nxt-btn btn"><i class="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
    ${createProductCards(data)} 
        </section>
    `
    setupSlidingEffect()
}

const createProductCards = (data, parent) => {
    //here parent is for search product
    let start = `<div class="product-container" id="productsContainer">`
    let middle = `` //this will contain card HTML
    let end = `</div>`

    for (let i = 0; i < data.length; i++) {
        if (data[i].id != decodeURI(location.pathname.split('/').pop())) {
            middle += `
            <div class="product-card">
            <div class="product-image">
                <!--<span class="quantity-tag"></span>-->
                <img src="../img/${data[i].Category}/${data[i].Images[0]}" alt="" class="product-thumb img-fluid" alt="${data[i].Name}" onclick="location.href='/products/${data[i].id}' ">
                <!--<button class="card-btn btn">Add to cart</button>-->
            </div>
            <div class="product-info" onclick="location.href='/products/${data[i].id}' ">
                <h2 class="product-brand">${data[i].Name}</h2>
                <p class="product-short-des">${data[i].Specification}</p>
                <span class="category">${data[i].Category}</span>
            </div>
        </div>
            `
        }
    }

    if (parent) {
        let cardContainer = document.querySelector(parent)
        cardContainer.innerHTML = start + middle + end

    } else {
        return start + middle + end
    }
}