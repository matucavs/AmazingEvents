document.addEventListener("DOMContentLoaded", function () {
  const eventIndex = getEventIndexFromURL();
  const event = data.events[eventIndex];

  if (event) {
    renderEventDetails(event);
  } else {
    document.getElementById("event-Carddetails").textContent = "Event not found";
  }
});

function getEventIndexFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventIndex = urlParams.get("eventIndex");

  return eventIndex;
}

function renderEventDetails(event) {
  const eventDetailsContainer = document.getElementById("event-Carddetails");

  const eventCard = document.createElement("div");
  eventCard.classList.add("card");
  eventCard.innerHTML = `
    <img src="${event.image}" class="card-img-top" alt="${event.name}">
    <div class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text">${event.description}</p>
      <p class="card-text">Category: ${event.category}</p>
      <p class="card-text">Date: ${event.date}</p>
      <p class="card-text">Place: ${event.place}</p>
      <p class="card-text">Place: ${event.price}</p>
      <p class="card-text">Capacity: ${event.capacity}</p>
      ${renderAssistance(event.assistance)}
    </div>
  `;

  eventDetailsContainer.appendChild(eventCard);
}

function renderAssistance(assistance) {
  if (assistance !== undefined) {
    return `<p class="card-text">Assistance: ${assistance}</p>`;
  } else {
    return '<p class="card-text">Assistance not available</p>';
  }
}