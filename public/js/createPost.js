const createPost = (data) => {

        let newsContainer = document.querySelector('.news-container')

        newsContainer.innerHTML += `
        <div class="product-card col-lg-4 col-sm-6 col-xs-12">
            <div class="product-image">
            
            ${data.draft ?`<span class="tag">Draft</span>`:''} 
               <img src="./img/news/${data.Images[0]||'no image.png'}" alt="" class="product-thumb img-fluid" alt="">
                <button class="btn card-action-btn edit-btn" onclick="location.href='/add-news/${data.id}' ">
                    <img src="./img/edit.png" alt="edit product" class="img-fluid">
                </button>
                <button class="btn card-action-btn open-btn" onclick="location.href='/news/${data.id}' " >
                    <img src="./img/open.png" alt="open product" class="img-fluid">
                </button>
                <button class="btn card-action-btn delete-btn-popup" onclick="openDeletePost('${data.id}')">
                    <img src="./img/delete.png" alt="delete product" class="img-fluid">
                </button>
            </div>
            <div class="product-info">
                <h2 class="product-brand">${data.EnglishTitle}</h2>
                <p class="product-short-des">${data.EnglishSpecification}</p>
                ${user.seller?`<p class="product-short-des">tags: ${data.tags}</p>`:''}
                <span class="category">${data.Date}</span>
            </div>
        </div>
`
}




const openDeletePost = (id) => {
let deleteAlert = document.querySelector('.delete-alert')
deleteAlert.style.display = 'flex'

let closeBtn = document.querySelector('.close-btn')
closeBtn.addEventListener('click', () => {
    deleteAlert.style.display = null
})
let deleteBtn = document.querySelector('.delete-btn')
deleteBtn.addEventListener('click', () => {
    deletePost(id)
})

}


const deletePost = (id) => {
fetch('/delete-news', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id: id })
    }).then(res => res.json())
    .then(data => {
        if (data == 'success')
            location.reload()
        else
            showAlert('An error occured while deleting.Try again')
    })
}