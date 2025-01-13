function updateNavbarOnScroll() {
	const navbar = document.querySelector(".navbar");
	const navbarText = navbar.querySelector("p");
	const scrollPosition = window.scrollY;

	if (scrollPosition > 50) {
		navbar.style.background = "rgba(60, 60, 60, 0.6)";
	} else {
		navbar.style.background = "rgba(255,255,255, 0)";
	}

	const maxFontSize = window.innerWidth < 700 ? 30 : 40;
	const minFontSize = 23;
	const scrollLimit = 200;

	let newFontSize = maxFontSize - (scrollPosition / scrollLimit) * (maxFontSize - minFontSize);
	newFontSize = Math.max(minFontSize, Math.min(maxFontSize, newFontSize));

	navbarText.style.fontSize = `${newFontSize}px`;
}

window.addEventListener("load", updateNavbarOnScroll);
document.addEventListener("scroll", updateNavbarOnScroll);
