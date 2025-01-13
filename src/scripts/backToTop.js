window.onscroll = function () {
	const button = document.getElementById("backToTop");

	if (window.pageYOffset > 100) {
		button.classList.add("show");
	} else {
		button.classList.remove("show");
	}
};

document.getElementById("backToTop").addEventListener("click", function () {
	window.scrollTo({ top: 0, behavior: "smooth" });
});
