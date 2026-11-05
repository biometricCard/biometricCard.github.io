const heightCrt = document.getElementById('heightCrt');
const widthCrt = document.getElementById('widthCrt');
const inputFace = document.getElementById("inputFace");
const inputBack = document.getElementById("inputBack");
const boxsF = document.querySelectorAll(".boxF");
const boxsB = document.querySelectorAll(".boxB");

// change height and width
heightCrt.addEventListener("input", ev => {
	chngDmnchn("height",heightCrt.value)
});
widthCrt.addEventListener("input", ev => {
	chngDmnchn("width",widthCrt.value)
});
function chngDmnchn(horW,value) {
    if(!value) return
    document.querySelectorAll(".box").forEach(box =>{
        box.style[horW] = value+'cm'
    })
}



// الاستماع لحدث تغيير المدخلات (عندما يختار المستخدم صورة)
inputFace.addEventListener("change", ev => {
	upldImg(ev,boxsF);
});
inputBack.addEventListener("change", ev => {
	upldImg(ev,boxsB);
});
function upldImg(ev,boxs) {
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
