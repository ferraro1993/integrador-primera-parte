window.addEventListener("load", () => {
	let arrayBtn = document.querySelectorAll("button");
	const popupContainer = document.getElementById("popupContainer");
	const btnCancel = document.getElementById("btnCancel");
	const btnConfirmDelete = document.getElementById("btnConfirmDelete");
	let activeBtn;

	arrayBtn.forEach((element) => {
		if (element.id.includes("btnDelete_")) {
			element.addEventListener("click", () => {
				popupContainer.classList.add("show");
				activeBtn = element.value;
			});
		}
	});

	btnCancel.addEventListener("click", () => {
		popupContainer.classList.remove("show");
	});

	btnConfirmDelete.addEventListener("click", () => {
		let form = document.getElementById(`formItem_${activeBtn}`);
		form.action = "/products/deleteProducts/";
		form.submit();
	});
});
