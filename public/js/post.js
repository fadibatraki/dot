const postImage = document.querySelector('.image-slider img')
let checkproducts = () => { // check if similar products are found
    const main_section = document.querySelector('.container-for-card-slider') //parent
    let div_cards = null || document.querySelectorAll('.product-card') //products
    let buttons = document.querySelectorAll('.btn') //next-previous buttons
        // console.log(div_cards, div_cards.length)

    if (div_cards.length < 3)
        buttons.forEach(btn => {
            btn.style.display = 'none'
        })
    if (!div_cards.length)
        main_section.style.display = 'none'
}


const setPostData = (data) => {
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
    title.innerHTML += data.Id
    postImage.src = `../img/news/${data.Images[0]}`

    $('#zoom').imagezoomsl({
        loadinggif: 'loading.gif',
        loadopacity: 0.1,
        loadbackground: '#878787'

    })

    const englishtitle = document.querySelector('.heading-english')
    const arabictitle = document.querySelector('.heading-arabic')
    const desc = document.querySelector('.des')

    englishtitle.innerText = data.EnglishTitle
    arabictitle.innerText = data.ArabicTitle
    desc.innerHTML = data.ArabicSpecification
}

const fetchPostData = () => {
    fetch('/get-news', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ id: post_id })
        })
        .then(res => res.json())
        .then(data => {
            setPostData(data)
            if (data.tags[0]) {
                getProducts(data.tags[0]).then(data => {
                    createProductSlider(data,
                        '.container-for-card-slider', 'products')
                    checkproducts()
                })
            }
        })

    .catch(err => {
        //location.replace('/404')
    })

}

let post_id = null
if (location.pathname != '/post') {
    post_id = decodeURI(location.pathname.split('/').pop())
    fetchPostData()
}