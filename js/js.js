const heightCrt = gebi("heightCrt");
const widthCrt = gebi("widthCrt");
const inputFace = gebi("inputFace");
const inputBack = gebi("inputBack");
const boxsF = document.querySelectorAll(".boxF");
const boxsB = document.querySelectorAll(".boxB");
const nmbrCrt = gebi("nmbrCrt");
const pageFc = gebi("pageFc");
const pageBack = gebi("pageBack");

function gebi(pr) {
	return document.getElementById(pr);
}

// change height and width
heightCrt.addEventListener("input", () => {
	chngDmnchn("height", heightCrt.value);
});
widthCrt.addEventListener("input", () => {
	chngDmnchn("width", widthCrt.value);
});
function chngDmnchn(horW, value) {
	if (!value) return;
	document.querySelectorAll(".box").forEach(box => {
		box.style[horW] = value + "cm";
	});
}

// change height and width
nmbrCrt.addEventListener("input", () => {
	const valueNm = nmbrCrt.value;
	if (!valueNm) return;
	remvApendChild(pageFc, valueNm);
	remvApendChild(pageBack, valueNm);
});
remvApendChild(pageFc, 9);
remvApendChild(pageBack, 9);
function remvApendChild(prnt, num) {
	const frstChld = prnt.querySelector(":scope > img").cloneNode(true);
	const boxs = prnt.querySelectorAll("img");
	let dfrnc = boxs.length - num;
	if (dfrnc > 0) {
		for (let i = 0; i < dfrnc; i++) {
			prnt.querySelector(":scope > img").remove();
		}
	} else  {
		dfrnc = -dfrnc ;
		for (let i = 0; i < dfrnc; i++) {
			const frCln = frstChld.cloneNode(true);
			prnt.appendChild(frCln);
		}
	}
}

// الاستماع لحدث تغيير المدخلات (عندما يختار المستخدم صورة)
inputFace.addEventListener("change", ev => {
	upldImg(ev, boxsF);
});
inputBack.addEventListener("change", ev => {
	upldImg(ev, boxsB);
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
/* print Dive */
function printDiv(divId) {
	// 1. جلب محتوى الـ div المراد طباعته
	var printContents = gebi(divId).innerHTML;
	// 2. فتح نافذة جديدة في المتصفح
	var originalContents = document.body.innerHTML;
	// 3. استبدال محتوى الصفحة بالكامل بمحتوى الـ div مؤقتاً
	document.body.innerHTML = `<div id="${divId}" 
        class="ferPage"style="background-color: #fff;">
        ${printContents}</div>`;
	window.print();
	// 5. إعادة محتوى الصفحة الأصلي بعد إغلاق نافذة الطباعة
	document.body.innerHTML = originalContents;
}

async function downloadPDF(idDive, namePage, btn) {
	// الطريقة الآمنة لفك تفكيك (Destructure) أو جلب الكلاس المسؤول عن الـ PDF
	let jsPDF;
	if (window.jspdf && window.jspdf.jsPDF) {
		jsPDF = window.jspdf.jsPDF;
	} else if (window.jsPDF) {
		jsPDF = window.jsPDF;
	} else {
		alert(
			"لم يتم تحميل مكتبة jspdf بشكل صحيح، يرجى التحقق من اتصال الإنترنت أو روابط CDN.",
		);
		return;
	}
	btn.style.color = "transparent";
	gebi("pt" + idDive).className = "patient";
	// تحديد العنصر المراد تحويله (الحاوية التي تضم الـ Grid والصور التسعة)
	const element = gebi(idDive);
	// 2. عمل نسخة طبق الأصل منه (دون التأثير على الأصلي)
	const clonedElm = element.cloneNode(true);

	// 3. (اختياري) تغيير الـ id للنسخة الجديدة حتى لا يتكرر في الصفحة
	const nwId = "cloned-" + Date.now();
	clonedElm.id = nwId;
	clonedElm.style.backgroundColor = "#fff";
	gebi("clonDiv").appendChild(clonedElm);

	try {
		// تحويل الـ div إلى صورة مع دعم الصور الخارجية (CORS) لحل مشاكل التحميل
		const canvas = await html2canvas(clonedElm, {
			scale: 2,
			useCORS: true, // يحل مشاكل عدم ظهور الصور إذا كانت من روابط خارجية
			allowTaint: true,
		});
		const imgData = canvas.toDataURL("image/png");
		// إنشاء مستند PDF جديد بمقاس A4
		const pdf = new jsPDF("p", "mm", "a4");
		// حساب أبعاد الصورة لتتناسب تلقائياً مع حجم ورقة الـ A4
		const imgWidth = 210; // عرض A4 بالمليمتر
		const imgHeight = (canvas.height * imgWidth) / canvas.width;
		// إضافة الصورة داخل ملف الـ PDF
		pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
		// تحميل الملف باسم محدد
		pdf.save(namePage + "-card.pdf");
		clonedElm.remove();
		btn.style.color = "#fff";
		gebi("pt" + idDive).className = "n";
	} catch (error) {
		console.error("حدث خطأ أثناء توليد الـ PDF:", error);
	}
}

async function downloadMultiPagePDF(btn) {
	//
	const jsPDF = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;

	if (!jsPDF) {
		alert("خطأ: لم يتم تحميل مكتبة PDF بنجاح.");
		return;
	}
	btn.style.color = "transparent";
	gebi("ptDblPg").className = "patient";
	// 2. عمل نسخة طبق الأصل منه (دون التأثير على الأصلي)
	const pageFcCop = pageFc.cloneNode(true);
	// 3. (اختياري) تغيير الـ id للنسخة الجديدة حتى لا يتكرر في الصفحة
	pageFcCop.id = "cloned1-" + Date.now();
	pageFcCop.style.backgroundColor = "#fff";
	gebi("clonDiv").appendChild(pageFcCop);

	const pageBackCop = pageBack.cloneNode(true);
	// 3. (اختياري) تغيير الـ id للنسخة الجديدة حتى لا يتكرر في الصفحة
	pageBackCop.id = "cloned2-" + Date.now();
	pageBackCop.style.backgroundColor = "#fff";
	gebi("clonDiv2").appendChild(pageBackCop);
	try {
		// 1. إنشاء مستند PDF جديد (A4)
		const pdf = new jsPDF("p", "mm", "a4");
		const imgWidth = 210; // عرض ورقة A4 بالمليمتر

		// 2. معالجة الصفحة الأولى
		const canvas1 = await html2canvas(pageFcCop, { scale: 2, useCORS: true });
		const imgData1 = canvas1.toDataURL("image/png");
		const imgHeight1 = (canvas1.height * imgWidth) / canvas1.width;

		// إضافة محتوى الـ div الأول في الصفحة الأولى
		pdf.addImage(imgData1, "PNG", 0, 0, imgWidth, imgHeight1);

		// 3. إضافة صفحة جديدة فارغة داخل المستند
		pdf.addPage();

		// 4. معالجة الصفحة الثانية
		const canvas2 = await html2canvas(pageBackCop, { scale: 2, useCORS: true });
		const imgData2 = canvas2.toDataURL("image/png");
		const imgHeight2 = (canvas2.height * imgWidth) / canvas2.width;

		// إضافة محتوى الـ div الثاني في الصفحة الثانية الجديدة
		pdf.addImage(imgData2, "PNG", 0, 0, imgWidth, imgHeight2);

		// 5. تحميل الملف النهائي المكون من صفحتين
		pdf.save("biometric-card.pdf");
		pageFcCop.remove();
		pageBackCop.remove();
		btn.style.color = "#fff";
		gebi("ptDblPg").className = "n";
	} catch (error) {
		console.error("حدث خطأ أثناء توليد صفحات الـ PDF:", error);
	}
}
