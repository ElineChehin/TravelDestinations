let itemsPerPage = 5;
let currentPage = 1;
let currentFilter = "all";
let currentSort = "name-asc";

function renderDestinations() {
    const container = document.getElementById("destinationsContainer");
    container.innerHTML = "";

    let filtered = destinations.filter(dest => currentFilter === "all" || dest.continent === currentFilter);

    filtered.sort((a, b) => {
        if (currentSort === "name-asc") return a.name.localeCompare(b.name);
        if (currentSort === "name-desc") return b.name.localeCompare(a.name);
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageItems = filtered.slice(start, end);
    pageItems.forEach(dest => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}">
            <h3>${dest.name}</h3>
            <p><strong>${dest.country}</strong></p>
            <p>${dest.continent}</p>
        `;
        container.appendChild(card);
    });

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => {
            currentPage = i;
            renderDestinations();
        };
        pagination.appendChild(btn);
    }
}

function populateContinentOptions() {
    const filterSelect = document.getElementById("filterSelect");

    const continents = [...new Set(destinations.map(dest => dest.continent))].sort();

    // Dropdown opnieuw vullen, eerst 'All'
    filterSelect.innerHTML = '<option value="all">All</option>';

    continents.forEach(continent => {
        const option = document.createElement("option");
        option.value = continent;
        option.textContent = continent;
        filterSelect.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    populateContinentOptions();

    document.getElementById("sortSelect").addEventListener("change", e => {
        currentSort = e.target.value;
        renderDestinations();
    });

    document.getElementById("filterSelect").addEventListener("change", e => {
        currentFilter = e.target.value;
        currentPage = 1;
        renderDestinations();
    });

    renderDestinations();
});
