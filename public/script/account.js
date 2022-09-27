window.addEventListener("load", () => {
	const btnDelete = document.getElementById("btnDelete");
	const btnCancel = document.getElementById("btnCancel");
	const popupContainer = document.getElementById("popupContainer");

	btnDelete.addEventListener("click", () => {
		popupContainer.classList.add("show");
	});

	btnCancel.addEventListener("click", () => {
		popupContainer.classList.remove("show");
	});
});
