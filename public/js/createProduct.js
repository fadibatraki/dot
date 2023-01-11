const createProduct = (data) => {

        let productContainer = document.querySelector('.products-container')

        productContainer.innerHTML += `
    <div class="product-card col-lg-4 col-sm-6 col-xs-12">
                <div class="product-image">
                
                ${data.draft ?`<span class="tag">Draft</span>`:''} 
                <img src="./img/${data.Category}/${data.Images[0]||'no image.png'}" alt="" class="product-thumb img-fluid" alt="">
                    <button class="btn card-action-btn edit-btn" onclick="location.href='/add-product/${data.id}' ">
                        <img src="./img/edit.png" alt="edit product" class="img-fluid">
                    </button>
                    <button class="btn card-action-btn open-btn" onclick="location.href='/products/${data.id}' " >
                        <img src="./img/open.png" alt="open product" class="img-fluid">
                    </button>
                    <button class="btn card-action-btn delete-btn-popup" onclick="openDelete('${data.id}')">
                        <img src="./img/delete.png" alt="delete product" class="img-fluid">
                    </button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">${data.Name}</h2>
                    <p class="product-short-des">${data.Specification}</p>
                    ${user.seller?`<p class="product-short-des">tags: ${data.Tags}</p>`:''}
                    <span class="category">${data.Category}</span>
                </div>
            </div>
    `
}




const openDelete = (id) => {
    let deleteAlert = document.querySelector('.delete-alert')
    deleteAlert.style.display = 'flex'

    let closeBtn = document.querySelector('.close-btn')
    closeBtn.addEventListener('click', () => {
        deleteAlert.style.display = null
    })
    let deleteBtn = document.querySelector('.delete-btn')
    deleteBtn.addEventListener('click', () => {
        deleteItem(id)
    })

}


const deleteItem = (id) => {
    fetch('/delete-product', {
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