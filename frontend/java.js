document.addEventListener("DOMContentLoaded", () => {
    const propertyList = document.getElementById("property-list");
    const propertyForm = document.getElementById("property-form");
    const popup = document.getElementById("popup");
    const popupName = document.getElementById("popup-name");
    const popupPhone = document.getElementById("popup-phone");
    const popupEmail = document.getElementById("popup-email");
    const closePopupButton = document.getElementById("close-popup");

    // Új ingatlan hozzáadása
    propertyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const location = document.getElementById("location").value;
        const price = document.getElementById("price").value;
        const imageUrl = document.getElementById("image-url").value;

        const propertyHTML = `
            <div class="property" data-name="${name}" data-email="${email}" data-phone="${phone}">
                <img src="${imageUrl}" alt="${location}">
                <h3>${location}</h3>
                <p>Ár: ${price} Ft</p>
                <button class="contact-button">Érdekel</button>
            </div>
        `;

        propertyList.insertAdjacentHTML("beforeend", propertyHTML);
        propertyForm.reset();

        attachEventListeners();
    });

    // Felugró mező megjelenítése
    const attachEventListeners = () => {
        const buttons = document.querySelectorAll(".contact-button");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const property = button.closest(".property");
                popupName.textContent = property.dataset.name;
                popupPhone.textContent = property.dataset.phone;
                popupEmail.textContent = property.dataset.email;
                popup.classList.add("visible");
            });
        });
    };

    attachEventListeners();

    // Felugró mező bezárása
    closePopupButton.addEventListener("click", () => {
        popup.classList.remove("visible");
    });
});
