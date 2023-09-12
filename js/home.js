function generateCard(event) {
  var card = `
            <div class="col">
                <div class="card h-100">
                    <img src="${event.image}" class="card-img-top" alt="Card image">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <h6 class="text-muted">$${event.price}</h6>
                        <a href="details.html?id=${event._id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>`;
  return card;
}

//const cardContainer = document.getElementById('cardContainer');
function getData() {
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      const eventData = data.events;
      const originalData = eventData;
      const cardContainer = document.getElementById("cardContainer");

      eventData.forEach((event) => {
        const card = generateCard(event);
        cardContainer.innerHTML += card;
      });

      const categories = getUniqueCategories(eventData);

      // Crear checkboxes con Bootstrap 5
      const checkboxContainer = document.getElementById("checkboxContainer");
      categories.forEach((category) => {
        const checkboxDiv = document.createElement("div");
        checkboxDiv.classList.add("form-check", "form-check-inline");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input");
        checkbox.name = "category";
        checkbox.value = category;
        checkbox.id = category;
        checkbox.addEventListener("change", () => {
          filterByCategory(eventData);
        });

        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.htmlFor = category;
        label.textContent = category;

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        checkboxContainer.appendChild(checkboxDiv);
      });

      document.getElementById("searchInput").addEventListener("input", () => {
        search(eventData);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getUniqueCategories(events) {
  const categories = new Set();
  events.forEach((event) => {
      categories.add(event.category);
  });
  return Array.from(categories);
}

function filterByCategory(data) {
  const selectedCategories = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  ).map((checkbox) => checkbox.value);
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  data.forEach((event) => {
    if (selectedCategories.includes(event.category)) {
      const card = generateCard(event);
      cardContainer.innerHTML += card;
    }
  });
}

// SEARCH
function search(data) {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();
  var cardContainer = document.getElementById("cardContainer");

  cardContainer.innerHTML = "";

  if (searchTerm === "") {
    // Si el campo de búsqueda está vacío, mostrar todos los elementos
    data.forEach(function (event) {
      var card = generateCard(event);
      cardContainer.innerHTML += card;
    });
  } else {
    var found = false;
    data.forEach(function (event) {
      if (event.name.toLowerCase().includes(searchTerm)) {
        var card = generateCard(event);
        cardContainer.innerHTML += card;
        found = true;
      }
    });

    if (!found) {
      createNoResultsModal();
      document.getElementById("searchInput").value = "";
      getData();
    }
  }
}
//MODAL FOR RESULT
function createNoResultsModal() {
  var modalContent = `
      <div class="modal fade" id="noResultsModal" tabindex="-1" aria-labelledby="noResultsModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="noResultsModalLabel">No results were found</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    There were no results found for the search.
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  </div>
              </div>
          </div>
      </div>
  `;

  // add modal
  document.body.insertAdjacentHTML("beforeend", modalContent);

  // show modal
  var noResultsModal = new bootstrap.Modal(
    document.getElementById("noResultsModal")
  );
  noResultsModal.show();
}
getData();
