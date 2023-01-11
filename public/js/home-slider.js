var i = 0;
var images = ['../img/Flash memory/flash6.jpg', '../img/background_2.jpg', '../img/Flash memory/main2.jpg']
var slideTime = 4500;
const section = document.querySelector('section.banner')


function changePicture() {
    section.style.backgroundImage = `url(${encodeURI(images[i])})`

    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }
    setTimeout(changePicture, slideTime);
}
//changePicture() //slideshow section.banner
section.style.backgroundImage = `url(${encodeURI(images[1])})`