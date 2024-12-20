export class UI {
  displayGames(data) {
      let box = ""; 
      for (let i = 0; i < data.length; i++) {
          box += `
              <div class="col-md-6 col-lg-3 col-sm-12 rounded-4 game-card" data-index="${i}" data-id="${data[i].id}">
                  <div class="card col-lg-11 h-100 bg-transparent">
                      <img
                          src="${data[i].thumbnail}"
                          class="card-img-top object-fit-cover rounded-4 p-3"
                          alt="game-img"
                      />
                      <div class="card-body">
                          <h3 class="card-title small h6 text-white d-flex justify-content-between align-items-center">
                              ${data[i].title} <span class="badge p-2 badge-free">Free</span>
                          </h3>
                          <p class="card-text text-center">
                              ${data[i].short_description.split(" ", 8).join(" ")}
                          </p>
                      </div>
                      <div class="card-footer d-flex justify-content-between">
                          <span class="badge">${data[i].genre}</span>
                          <span class="badge">${data[i].platform}</span>
                      </div>
                  </div>
              </div>
          `;
      }
      document.getElementById("games").innerHTML = box;
  }



  displayDetails(data, index) {
    if (index < 0 || index >= data.length) {
        console.error("Invalid index:", index);
        return;
    }
    console.log("Displaying details for:", data);
    const game = data[index];
    const description = game.description || "Description not available.";
    const title = game.title || "Title not available.";
    const category = game.genere || "Category not available.";
    const platform = game.platform || "Platform not available.";
    const status = game.status || "Status not available.";
    const thumbnail = game.thumbnail || "";

    const dBox = `
    <header class="px-5 mb-0 d-flex justify-content-between">
        <h1 class="text-center mb-0 h3 p-4  text-white">${title}</h1>
        <button class="btn-close p-5 btn-close-white" id="btnClose"></button>
    </header>
    <div class="container">
        <div class="row d-flex g-3">
            <figure class="col-md-4 ">
                <img src="${thumbnail}" class="col-sm-12" alt="game-photo" />
            </figure>
            <div class="txt col-md-8">
                <div class="top-txt">
                    <h3 class="text-white">Title: <span>${title}</span></h3>
                    <p class="text-white">Category:<span class="badge ms-2 text-bg-info"> ${category}</span></p>
                    <p class="text-white">Platform:<span class="badge ms-2 text-bg-info">${platform}</span></p>
                    <p class="text-white">Status: <span class="badge ms-2 text-bg-info"> ${status}</span></p>
                </div>
                <div class="txt-detai">
                    <p class ="text-white">${description}</p>
                </div>
                <a class="btn btn-outline-warning text-white" target="_blank" href="${game.freetogame_profile_url}">Show Game</a>
            </div>
        </div>
    </div>`;

    document.querySelector(".details").innerHTML = dBox;
}
}