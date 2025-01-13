document.addEventListener("DOMContentLoaded", function () {
	const menuContainer = document.getElementById("menu-container");
	const loader = document.getElementById("loader");

	function capitalizeFirstLetter(string) {
		return string.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
	}

	async function fetchAndDisplayMenu() {
		loader.style.display = "block";

		try {
			const menuResponse = await fetch("../../php/fetchMenu.php").then((response) => response.json());
			let html = "";

			menuResponse.forEach((dayMenu) => {
				const [rawDay, ...rawDateParts] = dayMenu.day.split(" ");
				const formattedDay = capitalizeFirstLetter(rawDay);
				const formattedDate = rawDateParts.join(" ");

				html += `<div class="menu-day">
                            <h3>${formattedDay}, ${formattedDate}</h3>
                            <ul>`;
				dayMenu.items.forEach((item) => {
					html += `<li><strong>${item.type}:</strong> ${item.description}</li>`;
				});
				html += `   </ul>
                        </div>`;
			});

			menuContainer.innerHTML = html;
		} catch (error) {
			console.error("Error fetching menu data:", error);
			menuContainer.innerHTML = "<p>Error fetching menu data.</p>";
		} finally {
			loader.style.display = "none";
			menuContainer.style.display = "block";
		}
	}

	fetchAndDisplayMenu();
});
