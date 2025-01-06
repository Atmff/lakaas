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

        // Az űrlap mezők értékei
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const location = document.getElementById("location").value.trim();
        const price = document.getElementById("price").value.trim();
        const imageUrl = document.getElementById("image-url").value.trim();

        // Ellenőrzés: minden mező kitöltve
        if (!name || !email || !phone || !location || !price || !imageUrl) {
            alert("Kérlek, tölts ki minden mezőt!");
            return;
        }

        // Új ingatlan HTML
        const propertyHTML = `
            <div class="property" data-name="${name}" data-email="${email}" data-phone="${phone}">
                <img src="${imageUrl}" alt="${location}">
                <h3>${location}</h3>
                <p>Ár: ${price} Ft</p>
                <button class="contact-button">Érdekel</button>
            </div>
        `;

        // Hozzáadás a listához
        propertyList.insertAdjacentHTML("beforeend", propertyHTML);

        // Űrlap ürítése
        propertyForm.reset();
    });

    // Dinamikus eseménykezelés (event delegation)
    propertyList.addEventListener("click", (e) => {
        if (e.target.classList.contains("contact-button")) {
            const property = e.target.closest(".property");

            if (!property) {
                alert("Nem található az ingatlan adatai!");
                return;
            }

            // Email írás link létrehozása
            const email = property.dataset.email;
            const subject = `Érdeklődés az ingatlan iránt (${property.querySelector("h3").textContent})`;
            const body = `Tisztelt ${property.dataset.name},%0A%0AAz alábbi ingatlan iránt szeretnék érdeklődni:%0A%0AIngatlan: ${property.querySelector("h3").textContent}%0AÁr: ${property.querySelector("p").textContent}%0A%0AVárom visszajelzését.%0A%0AKöszönettel,%0A[Az Ön neve]`;

            // Mailto link megnyitása
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
    });
});
