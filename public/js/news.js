const getNews = () => {
    return fetch('/get-news', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(data => {
            return data
        })
}
const getInfo = () => {
    return fetch('/get-info', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({})
        })
        .then(res => res.json())
        .then(data => {
            return data
        })
}
const createPostCards = (data, parent, dataLength) => {
    //here parent is for search product
    let start = `<div class="news-container">`
    let middle = `` //this will contain card HTML
    let end = `</div>`

    for (let i = 0; i < dataLength; i++) { // 3 posts index page

        if (data[i].id != decodeURI(location.pathname.split('/').pop())) {
            middle += `
                <div class="product-card post-card">
                <div class="product-image post-image">
                    <img src="../img/news/${data[i].Images[0]}" alt="" class="product-thumb img-fluid" alt="${data[i].Name}" onclick="show('post-${i}')">
                </div>
                <div class="product-info" onclick="">
                    <h2 class="product-brand">${data[i].EnglishTitle}</h2>
                    <p class="product-short-des">${data[i].EnglishSpecification}</p>
                    <span class="category">${data[i].Date}</span>
                </div>
            </div>

            <div class="content-box" id="post-${i}">
                            <button class="close-btn btn"> <img src="../img/close.png" alt="close" class="img-fluid">
                            </button>
            <div class="content row">
                <div class="col">
                <img src="../img/news/${data[i].Images[0]}" alt="${data[i].EnglishTitle}" class="img-fluid post-img">
                </div>
                <div class="col">
                    <div class="info">
                    <div class="post-title">
                <h3>${data[i].EnglishTitle}</h3>
                <h3>${data[i].ArabicTitle}</h3>
                </div>
                <div class="content-info">
                <p>
                ${data[i].EnglishSpecification}
                </p>
                    <div class="read-more-area">
                        <a href="/post/${data[i].id}" class="more-btn btn" id="moreBtn">${navigator.language.includes('en')?"Show more":"المزيد"}</a>
                    </div>
                   <div class="social-media-buttons">
                    <a href="https://www.facebook.com/dootdigital" target="_blank" class="social-button facebook"><i class="fa fa-facebook"></i></a>
                    <a href="https://wa.me/963934408081" target="_blank" class="social-button whatsapp"><i class="fa fa-whatsapp"></i></a>
                    <a href="https://www.instagram.com/dotdigitalsy" target="_blank" class="social-button instagram"><i class="fa fa-instagram"></i></a>
                    <a href="https://t.me/dotdigitachannel" target="_blank" class="social-button telegram"><i class="fa fa-telegram"></i></a>

                   </div> 
                   </div>

                </div>
                </div>
            </div>
        </div>
            `
        }
        if (data[i + 1] == undefined) break;
    }

    let postcardContainer
    if (parent) {
        postcardContainer = document.querySelector(parent)
        postcardContainer.innerHTML = start + middle + end
    } else {
        return start + middle + end
    }
}
const show = (id) => {
    document.querySelector('header#nav').style.display = 'none'
    document.querySelector('#news').style.backgroundColor = 'rgba(0,0,0,.2)'
    document.querySelectorAll('.post-card').forEach(post => {
        post.style.display = 'none'
    })
    let contentBox = document.getElementById(id)
    contentBox.style.display = 'flex'
    contentBox.style.pointerEvents = 'all'
    let closeBtn = document.querySelector(`#${id} .close-btn`)
    let closeBox = () => {
        {
            document.querySelector('header#nav').style.display = 'block'
            document.querySelector('#news').style.backgroundColor = 'unset'
            document.querySelectorAll('.post-card').forEach(post => {
                post.style.display = 'block'
            })
            contentBox.style.display = 'none'
            contentBox.style.pointerEvents = 'none'
        }
    }
    closeBtn.addEventListener('click', closeBox)
    window.addEventListener('keydown', (event) => {
        if (event.keyCode == 27) closeBox()
    })

}