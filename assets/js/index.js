const btns = document.querySelectorAll(".btn");

let filter = "weekly";
let fetchedData = [];

const fetchData = async () => {
  try {
    const response = await fetch("../../data.json");
    fetchedData = await response.json();

    displayCards(fetchedData, filter);
  } catch (error) {
    console.log(error);
  }
};

const displayCards = (dataArray, clickedFilter) => {
  const cardContainer = document.querySelector("#card-container");
  cardContainer.innerHTML = "";

  dataArray.forEach((data) => {
    const card = `
        <article class="card">
          <div class="card-head" id="${data.title.toLowerCase().replace(/\s+/g, "-")}">
            <img src="./assets/images/icon-${data.title.toLowerCase().replace(/\s+/g, "-")}.svg" alt="Work" />
          </div>
          <div class="card-body">
            <div class="card-body-title">
              <h2>${data.title}</h2>
              <img
                src="./assets/images/icon-ellipsis.svg"
                alt="Options"
                id="title-icon"
              />
            </div>
            <div class="card-body-content">
              <p class="current-hours">${data.timeframes[clickedFilter].current} hrs</p>
              <p class="previous-hours">Previous - ${data.timeframes[clickedFilter].previous} hrs</p>
            </div>
          </div>
        </article>
        `;

    cardContainer.innerHTML += card;
  });
};

const displayActive = (e) => {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filter = e.currentTarget.id;
    displayCards(fetchedData, filter);
    displayActive(e);
  });
});

fetchData();
