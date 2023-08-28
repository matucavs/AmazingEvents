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
                <a class="btn btn-primary details-button" href="details.html" role="button">Details</a>
            </div>
          </div>
            <small class="text-light">$${event.price.toFixed(2)}</small>
        </div>
    </div>
    `;

  cardNew.appendChild(card);
  cardContainer.querySelector(".row").appendChild(cardNew);
});

// Delete col-xl-2
// const card1 = document.getElementById("card1");

// card1.remove();

