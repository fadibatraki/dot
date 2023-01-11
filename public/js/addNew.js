let user = JSON.parse(sessionStorage.user || null)
let loader = document.querySelector('.loader')
let adminName = document.querySelector('.admin-name')

const timeElapsed = Date.now()
const today = new Date(timeElapsed)
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
    randomId = Math.floor(Math.random() * 1500)
    postId.value = "Id: " + randomId
    if (window.innerWidth <= 992 || window.outerWidth <= 992) {
        document.querySelector('.product-info').classList.add('row')
        document.querySelector('.product-image').classList.add('col-lg-4', 'col-sm-6', 'col-xs-12')
        document.querySelector('.upload-image-sec').classList.add('col-lg-4', 'col-sm-6', 'col-xs-12')
    }
}
let uploadImages = document.querySelectorAll('.fileupload')
let imagePaths = []
uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0]

        if (file.type.includes('image')) {
            let file_type = ""
            if (file.type.includes('jpg') || file.type.includes('jpeg'))
                file_type = "jpg"
            else if (file.type.includes('png'))
                file_type = "png"
            imagePaths[index] = file.name

            let label = document.querySelector(`label[for=${fileupload.id}]`)
            label.style.backgroundImage = `url(../img/news/${encodeURI(file.name)})`
            let productImage = document.querySelector('.product-image')
            productImage.style.backgroundImage = `url(../img/news/${encodeURI(file.name)})`

        } else {
            showAlert('images only')
        }
    })

})

// form submission
const postId = document.querySelector('#post-id')
const postEnglishTitle = document.querySelector('#post-english-title')
const postArabicTitle = document.querySelector('#post-arabic-title')
const postDate = document.querySelector('#post-date')
const postEnglishSpec = document.querySelector('#post-english-specification')
const postArabicSpec = document.querySelector('#post-arabic-specification')
const postExec = document.querySelector('#exclusive')
const tags = document.querySelector('#post-tags')
let randomId
const addPostBtn = document.querySelector('#addBtn')
const saveDraft = document.querySelector('#saveBtn')

postDate.value = today.toLocaleDateString()

const validateForm = () => {
    if (!postEnglishTitle.value.length)
        return showAlert("english title can't be empty")
    else if (!postArabicTitle.value.length)
        return showAlert("arabic title can't be empty")
    else if (!postEnglishSpec.value.length)
        return showAlert('enter specification')
    else
        return true
}

const postData = () => {
    let tagArr = tags.value.split(',')
    tagArr.forEach((item, i) =>
        tagArr[i] = tagArr[i].trim()
    )
    return data = {
        Id: randomId,
        EnglishTitle: postEnglishTitle.value,
        ArabicTitle: postArabicTitle.value,
        Date: postDate.value,
        EnglishSpecification: postEnglishSpec.value,
        ArabicSpecification: postArabicSpec.value,
        Images: imagePaths,
        Private: postExec.checked,
        tags: tagArr,
        Email: user.email
    }
}
addPostBtn.addEventListener('click', () => {
        if (validateForm()) { //validateForm return true or false while doing validation
            loader.style.display = "block"
            let data = postData()
            data.draft = false
            if (post_id)
                data.id = post_id
            sendData('/add-news', data)
        }
    })
    //save draft
saveDraft.addEventListener('click', () => {
    //check for post title
    if (!postEnglishTitle.value.length) {
        showAlert('enter title name')
    } else { // no validation for data
        let data = postData()
        data.draft = true
        if (post_id)
            data.id = post_id
        sendData('/add-news', data)
    }
})
const setFormsData = (data) => {
    postId.value = data.Id
    postEnglishTitle.value = data.EnglishTitle
    postArabicTitle.value = data.ArabicTitle
    postDate.value = data.Date
    postEnglishSpec.value = data.EnglishSpecification
    postArabicSpec.value = data.ArabicSpecification
    tags.value = data.tags


    //set up images
    imagePaths = data.Images
    imagePaths.forEach((url, i) => {
        let label = document.querySelector(`label[for=${uploadImages[i].id}]`)
        label.style.backgroundImage = `url(../img/news/${encodeURI(url)})`
        let productImage = document.querySelector('.product-image')
        productImage.style.backgroundImage = `url(../img/news/${encodeURI(url)})`
    })



}

const fetchPostData = () => {
        //delete the tempProduct from session
        fetch('/get-news', {
                method: 'post',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ email: user.email, id: post_id })
            })
            .then((res) => res.json())
            .then(data => {
                setFormsData(data)

            })
            .catch(err => {
                location.replace('/admin')
            })
    }
    //exisiting post detail handle
let post_id = null
if (location.pathname != '/add-news') {
    post_id = decodeURI(location.pathname.split('/').pop())
    fetchPostData()

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