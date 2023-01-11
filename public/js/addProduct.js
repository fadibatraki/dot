let user = JSON.parse(sessionStorage.user || null)
let loader = document.querySelector('.loader')
let adminName = document.querySelector('.admin-name')
    //checking user is logged in as admin or not
window.onload = () => {
    if (user) {
        if (!compareToken(user.authToken, user.email)) {
            location.replace('/login')
        }
        adminName.innerHTML = user.name

    } else {
        location.replace('/login')
    }
    randomId = Math.floor(Math.random() * 5000)
    productId.value = "Id: " + randomId
    sizes.innerHTML = ''
    if (window.innerWidth <= 992 || window.outerWidth <= 992) {
        document.querySelector('.product-info').classList.add('row')
        document.querySelector('.product-image').classList.add('col-lg-4', 'col-sm-6', 'col-xs-12')
        document.querySelector('.upload-image-sec').classList.add('col-lg-4', 'col-sm-6', 'col-xs-12')
    }
}
let uploadImages = document.querySelectorAll('.fileupload')
let uploadVideos = document.querySelectorAll('.videoupload')
let uploadPakcages = document.querySelectorAll('.packageupload')
let imagePaths = []
let videoPath = [] || null
let category_selected_index = null
let packageImages = []
uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0]
        let fileStr = file
            //sendData('/upload-image', fileStr)
        if (file.type.includes('image')) {
            let file_type = ""
            if (file.type.includes('jpg') || file.type.includes('jpeg'))
                file_type = "jpg"
            else if (file.type.includes('png'))
                file_type = "png"

            imagePaths[index] = file.name

            let label = document.querySelector(`label[for=${fileupload.id}]`)
            label.style.backgroundImage = `url(../img/${encodeURI(mainCategory)}/${file.name})`
            let productImage = document.querySelector('.product-image')
            productImage.style.backgroundImage = `url(../img/${encodeURI(mainCategory)}/${file.name})`


        } else {
            showAlert('images/videos only')
        }
    })

})
uploadPakcages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0]
        let fileStr = file
            //sendData('/upload-image', fileStr)
        if (file.type.includes('image')) {
            let file_type = ""
            if (file.type.includes('jpg') || file.type.includes('jpeg'))
                file_type = "jpg"
            else if (file.type.includes('png'))
                file_type = "png"

            packageImages[index] = file.name
            let label = document.querySelector(`label[for=${fileupload.id}]`)
            label.style.backgroundImage = `url(../img/${encodeURI(mainCategory)}/${file.name})`

        } else {
            showAlert('images/videos only')
        }
    })

})
let videoclass = ['first-video', 'second-video']
uploadVideos.forEach((fileupload, index) => {

    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0]
        videoPath[index] = file.name

        let label = document.querySelector(`label[for=${fileupload.id}]`)
        label.classList.add('hide')
        let video = document.querySelector(`#${videoclass[index]}`)
        video.classList.remove('hide', 'upload-image')
        video.style.height = 100 + 'px'
        video.style.width = 100 + '%'
        video.src = `url(../img/${encodeURI(mainCategory)}/${file.name})`
    })
})


// form submission
const productId = document.querySelector('#product-id')
const productName = document.querySelector('#product-name')
const productManufactor = document.querySelector('#product-manufactor')
const productModel = document.querySelector('#product-model')
const productTagArabic = document.querySelector('#product-tag-name-arabic')
const productTagEnglish = document.querySelector('#product-tag-name-english')
const productTagChina = document.querySelector('#product-tag-name-china')
const productColor = document.querySelector('#product-color')
const productPackageSize = document.querySelector('#product-package-size')
const productWeight = document.querySelector('#product-weight')
const productInnerBox = document.querySelector('#product-inner-box')
const productCtnSize = document.querySelector('#product-ctn-size')
const productLink = document.querySelector('#product-link')
const productSpec = document.querySelector('#product-specification')
const productExec = document.querySelector('#exclusive')
const tags = document.querySelector('#product-tags')
let catAvailable = []
let randomId
let select = document.querySelectorAll('#select')
const sizes = document.querySelector('.sizes-inputs')
const cat_name = document.querySelector('.category-type')
const categories = ['', 'flash-drive', 'tf-card', 'cabel', 'power-bank', 'audio', 'charger', 'others']

productName.addEventListener('input', () => {
        productTagEnglish.value = "Tag name english: " + productName.value
    }) // english tag name same as product name
    //buttons
const addProductBtn = document.querySelector('#addBtn')
const saveDraft = document.querySelector('#saveBtn')


const storeCategories = () => {
    catAvailable = []
    let categoryCheckBox = document.querySelectorAll('.size-checkbox')
        categoryCheckBox.forEach(item => {
            if (item.checked) {
                catAvailable.push(item.value)
            }
        })
    }

const validateForm = () => {
    if (!productName.value.length)
        return showAlert('enter product name')
    else if (!productManufactor.value.length)
        return showAlert('enter manufactor name')
    else if (!productModel.value.length)
        return showAlert('enter model name')
    else if (!productTagArabic.value.length)
        return showAlert('enter arabic tag name')
    else if (!productSpec.value.length)
        return showAlert('enter specification')
    else
        return true
}
let mainCategory = ""
const productData = () => {
    let tagArr = tags.value.split(',')
    tagArr.forEach((item, i) =>
        tagArr[i] = tagArr[i].trim()
    )
    return data = {
        Id: randomId,
        Name: productName.value,
        Manufactor: productManufactor.value,
        Model: productModel.value,
        ArabicTag: productTagArabic.value,
        EnglishTag: productName.value,
        ChinaTag: productTagChina.value,
        Color: productColor.value,
        PackageSize: productPackageSize.value,
        Weight: productWeight.value,
        Innerbox: productInnerBox.value,
        CtnSize:productCtnSize.value,
        Link: productLink.value,
        Category: mainCategory,
        Specification: productSpec.value,
        Images: imagePaths,
        Packages: packageImages,
        Videos: videoPath,
        Tags: tagArr,
        Private: productExec.checked,
        Email: user.email,
        Categories:catAvailable,
        CategorySelectedIndex:category_selected_index
    }
}
addProductBtn.addEventListener('click', () => {
        storeCategories()
            //validate form

        if (validateForm()) { //validateForm return true or false while doing validation
            loader.style.display = "block"
            let data = productData()
            data.draft = false
            if (product_id)
                data.id = product_id
            sendData('/add-product', data)
        }
    })
    //save draft
saveDraft.addEventListener('click', () => {
    //store cateogry
    storeCategories()
        //check for product name
    if (!productName.value.length) {
        showAlert('enter product name')
    } else { // no validation for data
        let data = productData()
        data.draft = true
        if (product_id)
            data.id = product_id
        sendData('/add-product', data)
    }
})
const setFormsData = (data) => {
    productId.value = data.Id
    productName.value = data.Name
    productManufactor.value = data.Manufactor
    productModel.value = data.Model
    productTagArabic.value = data.ArabicTag
    productTagEnglish.value = data.Name
    productTagChina.value = data.ChinaTag
    productColor.value = data.Color
    productPackageSize.value = data.PackageSize
    productWeight.value = data.Weight
    productInnerBox.value = data.Innerbox
    productCtnSize.value = data.CtnSize
    productLink.value = data.Link
    productSpec.value = data.Specification
    tags.value = data.Tags
    category_selected_index = data.CategorySelectedIndex
    select[0].options[data.CategorySelectedIndex].selected = 'selected'
    mainCategory = select[0].options[data.CategorySelectedIndex].innerText
    cat_name.innerHTML = select[0].options[select[0].selectedIndex].innerHTML
    sizes.innerHTML += categoriesINNERHTML[select[0].selectedIndex]
    document.querySelectorAll('.size-checkbox').forEach((item,i)=>{
        if(data.Categories.includes(item.value))
        item.checked = true
    })

    //set up images
    imagePaths = data.Images
    imagePaths.forEach((url, i) => {
        let label = document.querySelector(`label[for=${uploadImages[i].id}]`)
        label.style.backgroundImage = `url(../img/${encodeURI(data.Category)}/${url})`
        let productImage = document.querySelector('.product-image')
        productImage.style.backgroundImage = `url(../img/${encodeURI(data.Category)}/${url})`
    })

    packageImages = data.Packages
    packageImages.forEach((url, i) => {
        let label = document.querySelector(`label[for=${uploadPakcages[i].id}]`)
        label.style.backgroundImage = `url(../img/${encodeURI(data.Category)}/${url})`
        let productImage = document.querySelector('.product-image')
        productImage.style.backgroundImage = `url(../img/${encodeURI(data.Category)}/${url})`
    })

}

const fetchProductData = () => {
        //delete the tempProduct from session
        fetch('/get-products', {
                method: 'post',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ email: user.email, id: product_id })
            })
            .then((res) => res.json())
            .then(data => {
                setFormsData(data)

            })
            .catch(err => {
                // location.replace('/admin')
                console.log(err)
            })
    }
    //exisiting product detail handle
let product_id = null
if (location.pathname != '/add-product') {
    product_id = decodeURI(location.pathname.split('/').pop())

    let productDetail = JSON.parse(sessionStorage.tempProduct || null)
        //fetch the data if product is not in session
    fetchProductData()

}

$(window).resize(function() {
    if ($(window).width() <= 992) {
        $('.product-info').addClass('row')
        $('.product-image').addClass('col-lg-4 col-sm-6 col-xs-12')
        $('.upload-image-sec').addClass('col-lg-4 col-sm-6 col-xs-12')

    } else {
        $('.product-info').removeClass('row')
        $('.product-image').removeClass('col-lg-4 col-sm-6 col-xs-12')
        $('.upload-image-sec').removeClass('col-lg-4 col-sm-6 col-xs-12')
    }
})

// *** CATEGORIES *** //
const categoriesINNERHTML = [``, // EMPTY
    `<input type="checkbox" class="size-checkbox" id="flash-memory-gb4" value="4GB">

<input type="checkbox" class="size-checkbox" id="flash-memory-gb8" value="8GB">

<input type="checkbox" class="size-checkbox" id="flash-memory-gb16" value="16GB">

<input type="checkbox" class="size-checkbox" id="flash-memory-gb32" value="32GB">

<input type="checkbox" class="size-checkbox" id="flash-memory-gb64" value="64GB">
`, //END OF FLASH MEMORY

    ` <input type="checkbox" class="size-checkbox" id="memory-card-gb4" value="4GB">

<input type="checkbox" class="size-checkbox" id="memory-card-gb8" value="8GB">

<input type="checkbox" class="size-checkbox" id="memory-card-gb16" value="16GB">

<input type="checkbox" class="size-checkbox" id="memory-card-gb32" value="32GB">

<input type="checkbox" class="size-checkbox" id="memory-card-gb64" value="64GB">

<input type="checkbox" class="size-checkbox" id="memory-card-gb128" value="128GB">

<input type="checkbox" class="size-checkbox" id="memory-card-gb256" value="256GB">

`, //END OF MEMORY CARD

    ` 
    <input type="checkbox" class="size-checkbox" id="iphone" value="lightning">

    <input type="checkbox" class="size-checkbox" id="type-c" value="type-c">
    

    <input type="checkbox" class="size-checkbox" id="samsung" value="micro">
    `, // END OF CABLES

    `   <input type="checkbox" class="size-checkbox" id="power-bank10" value="10000mA">
        <input type="checkbox" class="size-checkbox" id="power-bank20" value="20000mA">
    `, // END OF POWER BANK
    `   <input type="checkbox" class="size-checkbox" id="audio1" value="N\A">
    <input type="checkbox" class="size-checkbox" id="audio2" value="N\A">
    `, // END OF Audio
    `
    <input type="checkbox" class="size-checkbox" id="battery-dotplus" value="battery-dotplus">
    <input type="checkbox" class="size-checkbox" id="charger" value="charger">
    <input type="checkbox" class="size-checkbox" id="charger-dotplus" value="charger-dotplus">
    <input type="checkbox" class="size-checkbox" id="cable-dotplus" value="cable-dotplus">
    ` // END OF OTHERS
]
select.forEach((opt, i) => {
    opt.addEventListener('click', () => {
        if (opt.selectedIndex != 0) {
            if (opt.options[opt.selectedIndex].value == categories[opt.selectedIndex]) {
                if (sizes.innerHTML.length > 0)
                    sizes.innerHTML = ''
                cat_name.innerHTML = opt.options[opt.selectedIndex].innerHTML
                sizes.innerHTML += categoriesINNERHTML[opt.selectedIndex]
                // if (categories[opt.selectedIndex].includes('flash')) {
                //     if (categories[opt.selectedIndex].includes('otg'))
                //         sizes.innerHTML += `<br>` + FlashCategories[0]

                //     sizes.innerHTML += `<br>` + FlashCategories[1]
                // }
                // if (categories[opt.selectedIndex].includes('power'))
                //     sizes.innerHTML += `<br>` + PowerCategories[0] + `<br>` + PowerCategories[1]
            }
            //console.log(opt.selectedIndex)
            //console.log(opt.options[opt.selectedIndex].innerText)
            mainCategory = opt.options[opt.selectedIndex].innerText
            category_selected_index = opt.selectedIndex
        }
    })
})