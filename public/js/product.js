const productImages = document.querySelectorAll('.product-images img')
const productVideos = document.querySelectorAll('.video-section video')
const productImageSlide = document.querySelector('.image-slider')
const productVideoSlide = document.querySelector('.video-section')
const packageImages = document.querySelectorAll('.packages-images-container img')
const imageToZoom = document.querySelector('#zoom')
const categories = document.querySelector('.cat-container')
const checkifcapacity = document.querySelector('#tf-flash')
let activeImageSlide = 0
let ready = false
productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active')
        item.classList.add('active')
            //productImageSlide.style.backgroundImage = `url('${item.src}')`
        imageToZoom.src = item.src
        activeImageSlide = i
    })
})


let checkproducts = () => { // check if similar products are found
    const main_section = document.querySelector('.container-for-card-slider') //parent
    let div_cards = null || document.querySelectorAll('.product-card') //products
    let buttons = document.querySelectorAll('.product .btn') //next-previous buttons
        // console.log(div_cards, div_cards.length)

    if (div_cards.length < 3)
        buttons.forEach(btn => {
            btn.style.display = 'none'
        })
    if (!div_cards.length)
        main_section.style.display = 'none'
}
let get_categories = []
const setData = (data) => {
    switch(data.Name.toLowerCase()){
        case "TF Card":
            checkifcapacity.innerText = "Capacity"
            break
        case "FLASH DRIVE":
            checkifcapacity.innerText = "Capacity"
            break
        case "cable":
            checkifcapacity.innerText = "Type"
            break
        
        default:
            checkifcapacity.innerText = ""
            break
    }

    if ($(window).width() <= 992) {
        $('#productPage').addClass('container')
        $('.image-slider').addClass('col-lg-4 col-sm-6 col-xs-12')
        $('.details').addClass('col-lg-4 col-sm-6 col-xs-12')
    } else {
        $('#productPage').removeClass('container')
        $('.image-slider').removeClass('col-lg-4 col-sm-6 col-xs-12')
        $('.details').removeClass('col-lg-4 col-sm-6 col-xs-12')
    }
    let title = document.querySelector('title')
    title.innerHTML += data.Name


    //setup the images
    productImages.forEach((img, i) => {
            if (data.Images[i]) {
                img.src = `../img/${data.Category}/${data.Images[i]}`
            } else {
                img.style.display = 'none'
            }
        })

    packageImages.forEach((img,i)=>{
        if(data.Packages[i]){
            img.src=`../img/${data.Category}/${data.Packages[i]}`
        }
        else {
            img.style.display = 'none'
        }
    })
        //setup the videos
    productVideos.forEach((vid, i) => {
        if (data.Videos[i]) {
            vid.src = `../img/${data.Category}/${data.Videos[i]}`
        } else {
            vid.style.display = 'none'
        }
    })
    productImages[0].click()
    $('#zoom').imagezoomsl({
        loadinggif: 'loading.gif',
        loadopacity: 0.1,
        loadbackground: '#878787'

    })


    //console.log(data.Category)
    //setup categories
    get_categories = data.Categories
    Div = document.createElement('div')
    Div.classList.add('category')
    get_categories.forEach((category, i) => {
        //console.log(category, i)
        inputDoc = document.createElement('input')
        inputDoc.setAttribute('type', 'radio')
        inputDoc.setAttribute('name', 'type')
        inputDoc.setAttribute('value', `type${i+1}`)
        inputDoc.setAttribute('id', `type-${category}`)
        inputDoc.hidden = true
        inputDoc.checked = true

        labelDoc = document.createElement('label')  
        labelDoc.setAttribute('for', `type-${category}`)
        labelDoc.classList.add('type-radio-btn')
        labelDoc.innerText = category

        if (labelDoc.innerText.includes('-') && labelDoc.innerText.length > 6)
            labelDoc.classList.add('type-radio-btn-length')
        Div.appendChild(inputDoc)
        Div.appendChild(labelDoc)

    })
    categories.appendChild(Div)
    let typeBtns = document.querySelectorAll('.category .type-radio-btn')
    let checkedBtn = 0
    typeBtns.forEach((item, i) => {
            item.addEventListener('click', () => {
                typeBtns[checkedBtn].classList.remove('checked')
                typeBtns[checkedBtn].setAttribute('checked', false)
                item.classList.add('checked')
                item.setAttribute('checked', true)
                checkedBtn = i
            })
        })
        //end categories
    const name = document.querySelector('.product-brand')
    const manufactor = document.querySelector('.product-short-des')
    const des = document.querySelector('.des')
    const productName = document.querySelector('#product-name')
    const productModel = document.querySelector('#product-model')
    const productColor = document.querySelector('#product-color')
    const productPackageSize = document.querySelector('#product-package-size')
    const productWeight = document.querySelector('#product-weight')
    const productInnerBox = document.querySelector('#product-inner-box')
    const productCtnSize = document.querySelector('#product-ctn-size')
    const productLink = document.querySelector('#product-link')

    name.innerText = data.Name
    productName.innerText = data.Name
    productModel.innerText = data.Model
    productColor.innerText = data.Color
    productPackageSize.innerText = data.PackageSize
    productWeight.innerText = data.Weight
    productInnerBox.innerText = data.Innerbox
    productCtnSize.innerText = data.CtnSize
    productLink.innerText = data.Link

    // if (data.Category == 'others')
    //     manufactor.innerText = 'Dotplus'
    // else
    //     manufactor.innerText = data.Category
    des.innerHTML = data.Specification
}

//fetch product data from backend

const fetchProductData = () => {
    fetch('/get-products', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ id: product_id })
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
            getProducts(data.Tags[1]).then(data => {
                createProductSlider(data,
                    '.container-for-card-slider', 'similar products')
                checkproducts()
            })

        })
    .catch(err => {
        location.replace('/404')
        // console.log(err)
    })

}
let product_id = null
if (location.pathname != '/products') {
    product_id = decodeURI(location.pathname.split('/').pop())
    fetchProductData()
}