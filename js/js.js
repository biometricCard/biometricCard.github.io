const heightCrt = gebi("heightCrt");
const widthCrt = gebi("widthCrt");
const bkgrnPg = gebi("bkgrnPg");
const inputFace = gebi("inputFace");
const inputBack = gebi("inputBack");
const nmbrCrt = gebi("nmbrCrt");
let pageFc = gebi("pageFc");
let pageBack = gebi("pageBack");
let rtCrt = 0;

function gebi(pr) {
	return document.getElementById(pr);
}
function prRoot(root, val) {
	document.documentElement.style.setProperty(root, val);
}
/* function toglDiv() {
	gebi("reglage").classList.toggle("n");
} */

// change height and width
nmbrCrt.addEventListener("input", () => {
	const valueNm = nmbrCrt.value * 1;
	if (!valueNm) return;
	remvApendChild(pageFc, valueNm);
	remvApendChild(pageBack, valueNm);
});
remvApendChild(pageFc, 9);
remvApendChild(pageBack, 9);
function remvApendChild(prnt, num) {
	const boxs = prnt.querySelectorAll("img");
	let dfrnc = boxs.length - num;
	if (dfrnc > 0) {
		for (let i = 0; i < dfrnc; i++) {
			prnt.querySelector(":scope > img").remove();
		}
	} else {
		const frstChld = prnt.querySelector(":scope > img").cloneNode(true);
		dfrnc = -dfrnc;
		for (let i = 0; i < dfrnc; i++) {
			const frCln = frstChld.cloneNode(true);
			frCln.className = frstChld.className;
			prnt.appendChild(frCln);
		}
	}
}

// الاستماع لحدث تغيير المدخلات (عندما يختار المستخدم صورة)
inputFace.addEventListener("change", ev => {
	const boxF = document.querySelectorAll(".boxF");
	upldImg(ev, boxF);
});
inputBack.addEventListener("change", ev => {
	const boxB = document.querySelectorAll(".boxB");
	upldImg(ev, boxB);
});
function upldImg(ev, boxs) {
	const file = ev.target.files[0]; // الحصول على الملف المختار
	if (file) {
		const reader = new FileReader();
		// عند اكتمال قراءة الملف من الجهاز
		reader.onload = function (e) {
			// إنشاء عنصر صورة جديد
			boxs.forEach(img => {
				img.src = e.target.result;
			});
		};
		// بدء قراءة ملف الصورة كـ Data URL
		reader.readAsDataURL(file);
	}
}

// rotation
function rotation() {
	const boxB = document.querySelectorAll(".boxB");
	boxB.forEach(elmnt => {
		elmnt.classList.toggle("rotation");
	});
}
