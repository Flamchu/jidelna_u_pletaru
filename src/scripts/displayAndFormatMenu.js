document.addEventListener("DOMContentLoaded", function () {
	const menuContainer = document.getElementById("menu-container");
	const loader = document.getElementById("loader");

	function getCzechDayName(date) {
		const czechDays = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"];
		const day = date.getDay();
		return day === 0 || day === 6 ? czechDays[4] : czechDays[day - 1];
	}

	function formatDate(date) {
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}. ${month}. ${year}`;
	}

	async function displayMenu() {
		loader.style.display = "block";

		try {
			const menuResponse = await fetch("../../php/fetchMenu.php").then((response) => response.json());
			let html = "";
			let displayDate = new Date();

			menuResponse.forEach((dayMenu) => {
				const dayName = getCzechDayName(displayDate);
				html += `<div class="menu-day">
                            <h3>${dayName} (${formatDate(displayDate)})</h3>
                            <ul>`;
				dayMenu.items.forEach((item) => {
					html += `<li><strong>${item.type}:</strong> ${item.description}</li>`;
				});
				html += `   </ul>
                        </div>`;

				do {
					displayDate.setDate(displayDate.getDate() + 1);
				} while (displayDate.getDay() === 0 || displayDate.getDay() === 6);
			});

			loader.style.display = "none";
			menuContainer.style.display = "block";
			menuContainer.innerHTML = html;
		} catch (error) {
			console.error("Error fetching menu data:", error);
			loader.style.display = "none";
			menuContainer.innerHTML = "<p>Error fetching menu data.</p>";
			menuContainer.style.display = "block";
		}
	}

	displayMenu();
});
