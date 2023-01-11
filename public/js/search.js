const title = document.querySelector('title')
const searchKey = decodeURI(location.pathname.split('/').pop())

const searchSpanElm = document.querySelector('#search-key')
if (searchSpanElm)
    title.innerHTML += searchSpanElm.innerHTML = ' ' + searchKey

getProducts(searchKey).then(data => createProductCards(data, '.card-container'))