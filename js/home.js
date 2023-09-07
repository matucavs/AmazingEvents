const cardContainer = document.getElementById("card-container");

data.events.forEach((event, eventIndex) => {
  const cardNew = document.createElement("div");
  cardNew.className = "col-12 col-sm-6 mb-4 col-lg-3";

  const card = document.createElement("div");
  card.className = "card shadow-sm";
  card.innerHTML = `
      <img class="card-img-top" src="${event.image}" alt="event card">
      <div class="card-body">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">${event.description}</p>
      </div>
      <div class="card-footer bg-dark bg-gradient">
    <div class="d-flex justify-content-between align-items-center">
    <div class="btn-group">
    <div class="details-container" data-event-index="${eventIndex}">
      <a class="btn btn-primary details-button" href="details.html?eventIndex=${eventIndex}" role="button">Details</a>
    </div>
  </div>
            <small class="text-light">$${event.price.toFixed(2)}</small>
        </div>
    </div>
    `;

  cardNew.appendChild(card);
  cardContainer.querySelector(".row").appendChild(cardNew);

  const detailsContainer = card.querySelector(".details-container");
  detailsContainer.addEventListener("click", function () {
    sessionStorage.setItem("selectedEventIndex", eventIndex);
  });
});

// home.js

// Obtener el array de categorías
const categories = [...new Set(data.events.map((event) => event.category))];

// Obtener el array de elementos
const items = data.events.map((event) => ({
  id: event._id,
  name: event.name,
  place: event.place,
  image: event.image,
  date: event.date,
  description: event.description,
  price: event.price,
  capacity: event.capacity,
  category: event.category,
}));

// Obtener el contenedor de los checkboxes
const filterContainer = document.querySelector("#filter-container");

// Generar los checkboxes dinámicamente
categories.forEach((category) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `category-${category}`;
  checkbox.name = "category";
  checkbox.value = category;
  checkbox.classList.add("form-check-input");
  checkbox.addEventListener("change", handleCheckboxChange);

  const label = document.createElement("label");
  label.htmlFor = `category-${category}`;
  label.classList.add("form-check-label");
  label.textContent = `${category}`;

  const checkboxDiv = document.createElement("div");
  checkboxDiv.classList.add("form-check", "form-check-inline");
  checkboxDiv.appendChild(checkbox);
  checkboxDiv.appendChild(label);

  filterContainer.appendChild(checkboxDiv);
});

// Función para manejar el cambio de un checkbox
function handleCheckboxChange() {
  const checkedCategories = [
    ...document.querySelectorAll('input[name="category"]:checked'),
  ].map((checkbox) => checkbox.value);

  const filteredItems = items.filter((item) => {
    return checkedCategories.includes(item.category);
  });

  if (checkedCategories.length === 0) {
    renderFilteredItems(items);
  } else {
    renderFilteredItems(filteredItems);
  }
}

function renderFilteredItems(filteredItems, category, place, name) {
  const cardContainer = document.getElementById("card-container");
  
  if (!cardContainer) {
    console.error("Not found");
    return;
  }
  
  cardContainer.innerHTML = "";
  
  const cardNew = document.createElement("div");
  cardNew.className = "col-12 col-sm-6 mb-4 col-lg-3";

  filteredItems.forEach((event, eventIndex) => {
    if (
      (category && event.category !== category) ||
      (place && event.place !== place) ||
      (name && !event.name.toLowerCase().includes(name.toLowerCase()))
    ) {
      return;
    }
    
    const card = document.createElement("div");
    card.className = "card m-3";
    card.style.width = "18rem";
    
    card.innerHTML = `
      <img class="card-img-top" src="${event.image}" alt="${event.name}">
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
      </div>
      <div class="card-footer bg-dark bg-gradient">
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <div class="details-container" data-event-index="${eventIndex}">
            <a class="btn btn-primary details-button" href="details.html?eventIndex=${eventIndex}" role="button">Details</a>
            </div>
          </div>
          <small class="text-light">$${event.price.toFixed(2)}</small>
        </div>
      </div>
    `;
    
    const detailsContainer = card.querySelector(".details-container");
    detailsContainer.addEventListener("click", function () {
      sessionStorage.setItem("selectedEventIndex", eventIndex);
    });
    
    cardNew.appendChild(card);
  });

  cardContainer.appendChild(cardNew);
}


const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");


searchButton.addEventListener("click", handleSearch);


function handleSearch() {
  const searchValue = searchInput.value.toLowerCase();
  const searchTerms = searchValue.split(" ").filter((term) => term !== "");

  const filteredItems = items.filter((item) => {
    return searchTerms.every((term) => {
      return (
        item.name.toLowerCase().includes(term) ||
        item.place.toLowerCase().includes(term) ||
        item.date.toLowerCase().includes(term) ||
        item.capacity.toString().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    });
  });

  renderFilteredItems(filteredItems);
}
