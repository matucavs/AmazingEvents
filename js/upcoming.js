const cardContainer = document.getElementById("card-container");
const currentDate = new Date(data.currentDate);

data.events.forEach((event, eventIndex) => {
  const eventDate = new Date(event.date);

  if (eventDate > currentDate) {
    const cardCol = document.createElement("div");
    cardCol.className = "col-12 col-sm-6 mb-4 col-lg-3";

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

    cardCol.appendChild(card);
    cardContainer.querySelector(".row").appendChild(cardCol);
    
  }
});

// card4.remove();   https://mindhub-xj03.onrender.com/api/amazing
