let createNav = () => {
    let navElement = document.querySelector('#nav')
    navElement.innerHTML = `  
    
    
    <div class="navbar">
    <div class="nav">
        <a href="/"><img class="logo" src="../img/dot logo red.png" alt=""></a>
        <a class="menu-btn"><img src="../img/Menu.png" alt=""></a>
        <div class="nav-items">
            <a><i class="fa fa-search" id="searchPopup" aria-hidden="true"></i>
                <div class="search-popup hide">
                    <div class="search">
                        <input type="search" class="search-box" placeholder="Search what you seek">
                        <button class="search-btn">
                            Search
                        </button>
                    </div>
                </div>
            </a>
            <a><i class="fa fa-user-circle" id="userImg" aria-hidden="true"></i>                     
                <div class="login-logout-popup hide" id="loginLogoutPopup">
                    <p class="account-info" id="accountInfo">Logged in as, name</p>
                    <button class="log-out-btn" id="userBtn">Log out</button>
                </div>
            </a>
            <a><i class="fa fa-shopping-cart" id="shippingCart" aria-hidden="true"></i>                     
                <div class="shipping-cart-popup hide" id="shippingcartpopup">
                    <p class="account-info" id="">Coming soon!</p>
                </div>
            </a>
        </div>
        <div class="profile-info">
            <div class="search">
                <input type="search" class="search-box" placeholder="Search...">
                <button class="search-btn">
                    <i class="fa fa-search" aria-hidden="true"></i>

                </button>
            </div>
           
            <a><i class="fa fa-user-circle" id="userImg" aria-hidden="true"></i>
                <div class="login-logout-popup hide" id="loginLogoutPopup">
                    <p class="account-info" id="accountInfo">Logged in as, name</p>
                    <button class="log-out-btn" id="userBtn">Log out</button>
                </div>
            </a>
            <a><i class="fa fa-shopping-cart" id="shippingCart" aria-hidden="true"></i>                     
                <div class="shipping-cart-popup hide" id="shippingcartpopup">
                     <p class="account-info" id="">Coming soon!</p>
                </div>
            </a>
           

        </div>
    </div>
    <ul class="links-container">
        <li class="link-item products-btn">
            <a href="#categories" class="link">Products</a>
            <div class="products-dropdown">
                <div class="products-dropdown-content">
                    <ul class="products-dropdown-collections">
                        <li class="navbar-collectionLi">
                            <div class="flex-initial md:hidden">
                                <a href="#">
                                    <span>
                                        <img src="../img/png/charger.png" alt="charger" width="150">
                                    </span>
                                </a>
                            </div>
                            <div class="navbar-collection-content">
                                <ul style="list-style: none;">
                                    <li>
                                        <a href="/search/charger" style="font-weight: bold;color: #000;"> Chargers</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                        <a href="/search/applecharger">Lightning</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                        <a href="/search/samsungcharger">Micro</a>
                                    </li>
                                </ul>

                            </div>
                        </li>
                        <li class="navbar-collectionLi">
                            <div class="flex-initial md:hidden">
                                <a href="#">
                                    <span>
                                        <img src="../img/png/flashmemory.png" alt="flash disk" width="180">
                                    </span>
                                </a>
                            </div>
                            <div class="navbar-collection-content">
                                <ul style="list-style: none;">
                                    <li>
                                        <a href="/search/flashdisk" style="font-weight: bold;color: #000;"> Flash disk</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                        <a href="/search/otg">OTG</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                        <a href="/search/flash">Normal</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                    <a href="/search/flashnewstyle">New style</a>
                                </li>
                                </ul>

                            </div>
                        </li>
                        <li class="navbar-collectionLi">
                            <div class="flex-initial md:hidden">
                                <a href="/search/powerbank">
                                    <span>
                                        <img src="../img/png/powerbank.png" alt="power bank" width="150">
                                    </span>
                                </a>
                            </div>
                            <div class="navbar-collection-content">
                                <ul style="list-style: none;">
                                    <li>
                                        <a href="#" style="font-weight: bold;color: #000;">Power banks</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                        <a href="/search/powerbank-10">10000 mhA</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                        <a href="/search/powerbank-20">20000 mhA</a>
                                    </li>
                                </ul>

                            </div>
                        </li>
                        <li class="navbar-collectionLi">
                            <div class="flex-initial md:hidden">
                                <a href="/search/memorycard">
                                    <span>
                                        <img src="../img/png/memorycard.png" alt="Memory card" width="150" >
                                    </span>
                                </a>
                            </div>
                            <div class="navbar-collection-content">
                                <ul style="list-style: none;">
                                    <li>
                                        <a href="/search/memorycard" style="font-weight: bold;color: #000;">Memory cards</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                        <a href="/search/memorycard">memory card</a>
                                    </li>
                                </ul>

                            </div>
                        </li>
                        <li class="navbar-collectionLi">
                            <div class="flex-initial md:hidden">
                                <a href="#">
                                    <span>
                                        <img src="../img/png/cables.png" alt="Cables" width="150" >
                                    </span>
                                </a>
                            </div>
                            <div class="navbar-collection-content">
                                <ul style="list-style: none;">
                                    <li>
                                        <a href="/search/cable" style="font-weight: bold;color: #000;">Cables</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                        <a href="/search/applecable">Lightning</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                        <a href="/search/microcable">Micro</a>
                                    </li>
                                    <li class="navbar-menu-content">
                                    <a href="/search/typeccable">Type-C</a>
                                </li>
                                <li class="navbar-menu-content">
                                <a href="/search/shutter">Shutter</a>
                            </li>
                                </ul>

                            </div>
                        </li>
                    </ul>
                    <ul class="navbar-recommendation">
                        <li class="navbar-recommend-content">
                            <a href="/dotplus">
                            <div class="flex-initial">
                                <img src="../img/Dot_plus.png" alt="" width="150" style="background-color:#000;">
                            </div>
                            <div class="recommend-content">
                                Dotplus Products
                            </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
                </li>                    
        <li class="link-item">
            <a href="#news" class="link">latest news</a>
        </li>
        <li class="link-item">
            <a href="#aboutus" class="link">About us</a>
        </li>
        <li class="link-item">
            <a href="#contactus" class="link">catch us</a>
        </li>
        <li class="link-item email-btn">
            <a href="#" class="link" id="emailbtn">Support</a>
        <div class="email-container">
                    <div class="input-div" dir="auto">
                    <p dir="auto"> Name: </p>
                    <input type="text" class="input-form" id="clientname" autocomplete="off" style="margin-left: 22px;">
                        </div>
                        <div class="input-div" dir="auto">
                            <p dir="auto"> Subject: </p>
                            <input type="text" class="input-form" id="subject" autocomplete="off">
                        </div>
                        <div class="input-div text-area" dir="auto">
                            <img src="../img/png/1.png" alt="svg" class="img-fluid textarea-img">
                            <p dir="auto">Talk to us:</p>
                            <textarea class="input-form" id="useropn" placeholder="Your opinion is important to us" style="font-size: 0.9em;width:40%;height:200px;"></textarea>
                        </div>
                        <div class="input-div send-btn" dir="auto">
                            <img src="../img/png/2.png" alt="svg" class="img-fluid btn-img">
                            <button class="btn sendmailbtn" id="emailbtn">Send email</button>
                        </div>
            </div>
        </li>
    </ul>
</div>

<div class="side-menu">
    <a class="close-menu"><img src="../img/Path 60.png" alt=""></a>
    <h1>Dot Digital</h1>
    <ul>
        <li class="active"><a href="/">Home</a></li>
        <li><a href="/search/flash">Flash disk</a></li>
        <li><a href="/search/cable">Cables</a></li>
        <li><a href="/search/memory%20card">Memory card</a></li>
        <li><a href="/search/power">Power banks</a></li>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Get in touch
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="/login">Login</a>
                <a class="dropdown-item" href="/signup">Be a client now!</a>
            </div>
        </div>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Language
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Arabic</a>
                <a class="dropdown-item" href="#">English</a>
            </div>
        </div>
    </ul>
</div>
</div>

    `
}
createNav()


//nav popup
const userImageButton = document.querySelectorAll('#userImg')
const userPopup = document.querySelectorAll('#loginLogoutPopup')
const searchIcon = document.querySelector('#searchPopup')
const searchpopbox = document.querySelector('.search-popup')
const popuptext = document.querySelectorAll('#accountInfo')
const actionBtn = document.querySelectorAll('#userBtn')
const confirmBtn = document.querySelector('#confirmBtn')
const confirmLogout = document.querySelector('#confirmLogout')
const logoutAlert = document.querySelector('.logout-alert')
let closeBtn = document.querySelector('.close-btn')
let deleteBtn = document.querySelector('.delete-btn')
const shippingCart = document.querySelectorAll('#shippingCart')
let shippingcartpopup = document.querySelectorAll('#shippingcartpopup')
let numIndex = 0 || 1

document.querySelector('.email-btn').addEventListener('click',()=>{
    showSupportContainer.classList.toggle("hide-support-container")
})

userImageButton.forEach((item, i) => {
    item.addEventListener('click', () => {
        userPopup[i].classList.toggle('hide')
        numIndex = i
    })
})

searchPopup.addEventListener('click', () => {
    searchpopbox.classList.toggle('hide')
})

shippingCart.forEach((btncart, i) => {
    btncart.addEventListener('click', () => {
        shippingcartpopup[i].classList.toggle('hide')
    })
})
window.onload = () => {

    let user = JSON.parse(sessionStorage.user || null)
    if (user != null) {
        //user is logged in
        popuptext.forEach(item => {
                item.innerHTML = `Logged in as, ${user.name}`
            }) //log out button is clicked
        actionBtn.forEach(btn => {
            btn.innerHTML = `Log out`
            btn.addEventListener('click', () => {
                logoutAlert.style.display = 'flex'
                closeBtn.addEventListener('click', () => {
                    logoutAlert.style.display = null
                })
                deleteBtn.addEventListener('click', () => {
                    sessionStorage.clear()
                    location.reload()
                })
            })

        })

    } else {
        //user is logged out
        popuptext.forEach(item => {
            item.innerHTML = `Log in to start the shipping`
        })
        actionBtn.forEach(btn => {
            btn.innerHTML = `Log in`
            btn.addEventListener('click', () => {
                location.href = '/login'
            })
        })

    }


}
//header contains nav
const header = document.querySelector('#nav')
const nav_logo = document.querySelector(".nav img.logo")
const navbar = document.querySelector(".navbar")
window.addEventListener("scroll",()=>{
    if (window.scrollY > 30) {
    nav_logo.style.marginTop = "5px"
    header.classList.add("scrolled")
    navbar.style.background = "#f5f5f5"
} else {
    header.classList.remove("scrolled")
    nav_logo.style.marginTop = "2px"
    navbar.style.background = "#fff"
}
})
// search box

const searchBtn = document.querySelectorAll('.search-btn')
const searchBox = document.querySelectorAll('.search-box')
searchBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        searchBox.forEach(box => {
            result_to_search = encodeURI(correct(box.value))
            if (box.value.length)
                location.href = `/search/${result_to_search}`
        })
    })
})