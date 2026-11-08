/* print Dive */
function printDiv(divId, cls = "") {
	gebi("prntRslt").innerHTML = gebi(divId).innerHTML;
	cls
		? gebi("prntRslt").classList.add("pg2")
		: gebi("prntRslt").classList.remove("pg2");
	window.print();
	gebi("prntRslt").innerHTML = "";
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
	const page = gebi(idDive);

	try {
		const canvas = await html2canvas(page, {
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
		//clonedElm.remove();
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
	try {
		// 1. إنشاء مستند PDF جديد (A4)
		const pdf = new jsPDF("p", "mm", "a4");
		const imgWidth = 210; // عرض ورقة A4 بالمليمتر
		// 2. معالجة الصفحة الأولى
		const canvas1 = await html2canvas(pageFc, { scale: 2, useCORS: true });
		const imgData1 = canvas1.toDataURL("image/png");
		const imgHeight1 = (canvas1.height * imgWidth) / canvas1.width;
		// إضافة محتوى الـ div الأول في الصفحة الأولى
		pdf.addImage(imgData1, "PNG", 0, 0, imgWidth, imgHeight1);
		// 3. إضافة صفحة جديدة فارغة داخل المستند
		pdf.addPage();
		// 4. معالجة الصفحة الثانية
		const canvas2 = await html2canvas(pageBack, { scale: 2, useCORS: true });
		const imgData2 = canvas2.toDataURL("image/png");
		const imgHeight2 = (canvas2.height * imgWidth) / canvas2.width;

		// إضافة محتوى الـ div الثاني في الصفحة الثانية الجديدة
		pdf.addImage(imgData2, "PNG", 0, 0, imgWidth, imgHeight2);

		// 5. تحميل الملف النهائي المكون من صفحتين
		pdf.save("biometric-card.pdf");
		btn.style.color = "#fff";
		gebi("ptDblPg").className = "n";
	} catch (error) {
		console.error("حدث خطأ أثناء توليد صفحات الـ PDF:", error);
	}
}
