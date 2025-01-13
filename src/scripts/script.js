document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", (event) => {
		event.preventDefault();

		const href = anchor.getAttribute("href");
		const targetElement = document.querySelector(href);

		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

			window.history.replaceState(null, "", window.location.pathname);
		}
	});
});
