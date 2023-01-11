let createFooter = () => {
    let footerElement = document.querySelector('#footerContainer')
    footerElement.innerHTML =
        ` <div class="footer-content container row">
        <img src="../img/Main logo.png" class="img-fluid footer-logo " alt="logo" onclick="location.href='/'">
        <div class="footer-ul-container container row ">
            <ul class="footer-category">
                <li class="category-title">Cables</li>
                <li><a href="/search/typeccable" class="footer-link">Type-C</a></li>
                <li><a href="/search/applecable" class="footer-link">Lightning</a></li>
                <li><a href="/search/microcable" class="footer-link">Micro</a></li>
                
            </ul>
            <ul class="footer-category">
                <li class="category-title">Flash memory</li>
                <li><a href="/search/type-c%20otg" class="footer-link">Type-c</a></li>
                <li><a href="/search/samsung%20otg" class="footer-link">Micro</a></li>
            </ul>

            <ul class="footer-category">
            <li class="category-title">Power bank</li>
            <li><a href="/search/power-10" class="footer-link">10000mhA</a></li>
            <li><a href="/search/power-20" class="footer-link">20000mhA</a></li>
            </ul>

            <ul class="footer-category">
            <li class="category-title">Charger</li>
            <li><a href="/search/applecharger" class="footer-link">Lightning</a></li>
            <li><a href="/search/samsungcharger" class="footer-link">Micro</a></li>
            </ul>

            </ul>
            <ul class="footer-category">
            <li class="category-title">Memory cards</li>
            <li><a href="/search/memorycard" class="footer-link">Memory card</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-social-container">
    <div>
        <!-- 
   <a href="#" class="social-link">Terms & Services</a>
   <a href="#" class="social-link">Privacy page</a>
   -->
    </div>
</div>
    
    <div class="social-media-container">
        <a href="https://www.facebook.com/dootdigital" target="_blank" class="social-link">Facebook</a>
        <a href="https://www.instagram.com/dotdigitalsy" target="_blank" class="social-link">Instagram</a>
        <a href="https://wa.me/963934408081" target="_blank" class="social-link">Whatsapp</a>
        <a href="https://t.me/dotdigitachannel" target="_blank" class="social-link">Telegram</a>
		<p class="social-link wechat" style="cursor:default;text-align:center;"onclick="copyNum(document.querySelector('.wechat span').innerHTML)">WeChat: <span>+861-892-651-952-3</span></a>
		<style>
			.wechat{
				position:relative;
			}
			.wechat::after{
				content:'click to copy number';
				position:absolute;
				width:100px;
				height:5px;
				top:20px;
				left:50%;
				transform:translateX(-50%);
				font-size:0.5em;
				color:#fff;
			}
			@media only screen and (min-width: 321px) and (max-width: 768px){
				.wechat{
					font-size:0.8em;
				}
				.wechat::after{
					font-size:0.9em;
				}
			}
		</style>
		
		
    </div>
</div>
<p class="footer-credit">Dot digital - Mobile accesories</p>
    `
}
let copyNum = (copyText) => {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);

    /* Alert the copied text */
    alert("Copied the text: " + copyText);
}
createFooter()