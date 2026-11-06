/* 

<a  id="signOutLink" style="cursor:pointer" href="https://pricealerts.web.app/signin" >
	تسجبل الخروج
	<img src="/imgs/web/signout-svgrepo-com.svg" alt="">
</a>
*/
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////

//nta3 navbar saide bar

const sidebar = document.createElement("div");
//sidebar.id = 'sidebar';   #1c274c
sidebar.className = "sidebar";
sidebar.innerHTML = `<!-- Sidebar (LEFT) -->
			<h3>Menu</h3>
			<a href="/">
				Home
				<img src="https://pricealerts.web.app//imgs/web/home-alt-1-svgrepo-com.svg" alt="home"></a>
			<a href="./How-to-use.html">
			How to use
            	<img src="https://pricealerts.web.app//imgs/web/info-circle-svgrepo-com.svg" alt="inf"></a>

		<!--
        	<a href="#">المنتجات</a>
			<a href="#">الخدمات</a> 
			<a href="https://pricealerts.web.app/otherPage/privacy.html">
           		سياسة الخصوصية
				<img src="https://pricealerts.web.app//imgs/web/privacy-svgrepo-com.svg" alt=""></a>
			-->
			<a href="https://pricealerts.web.app/otherPage/contact.html">
           	Contact us
				<img src="https://pricealerts.web.app//imgs/web/mail-svgrepo-com.svg" alt="home"></a>
				 <a href="https://pricealerts.web.app/ai">
		
			
`;

document.body.prepend(sidebar);

const navbar = document.createElement("nav");
navbar.innerHTML = `
<!-- Overlay -->

		<div id="overlay" class="overlay"></div>

		<!-- Navbar -->
		
		<div class="navbar">
		<div class="nav-title">
                <button class="menu-btn" id="openSidebar">☰</button>
			</div>
			
			<h1 class="hTitel">
			biometric card
			</h1 >
			<a href="https://pricealerts.web.app" style= "height: 100%; display: flex; align-items: center;">
				<img id="imgNavbar" class="imgNavbar" src="" alt="">
			</a>
		</div>


`;
//document.body.prepend(navbar)
document.querySelector(".pirantCntynr").prepend(navbar);

/* nta3 navbar */
//const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("openSidebar");

openBtn.onclick = () => {
	sidebar.classList.add("open");
	overlay.classList.add("show");
};

overlay.onclick = () => {
	sidebar.classList.remove("open");
	overlay.classList.remove("show");
};
