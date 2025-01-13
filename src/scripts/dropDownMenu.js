document.getElementById("menu-icon").addEventListener("click", function () {
	var slidingMenu = document.getElementById("sliding-menu");
	var overlay = document.getElementById("overlay");

	slidingMenu.classList.toggle("show-menu");
	overlay.classList.toggle("show-overlay");
});

document.getElementById("close-menu").addEventListener("click", function () {
	var slidingMenu = document.getElementById("sliding-menu");
	var overlay = document.getElementById("overlay");

	slidingMenu.classList.remove("show-menu");
	overlay.classList.remove("show-overlay");
});

document.addEventListener("click", function (event) {
	var slidingMenu = document.getElementById("sliding-menu");
	var overlay = document.getElementById("overlay");
	var menuIcon = document.getElementById("menu-icon");

	if (slidingMenu.classList.contains("show-menu") && !slidingMenu.contains(event.target) && event.target !== menuIcon) {
		slidingMenu.classList.remove("show-menu");
		overlay.classList.remove("show-overlay");
	}
});

document.getElementById("sliding-menu").addEventListener("click", function (event) {
	event.stopPropagation();
});
