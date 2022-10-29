movies.splice(50)

let allMovies = movies.map(e =>{
  return{
    title: e.title,
    year: e.year,
    categories: e.categories,
    id: e.imdbId,
    rating: e.imdbRating,
    time: `${Math.trunc(e.runtime / 60)} soat, ${e.runtime % 60} daqiqa`,
    language: e.language,
    youtube: `https://www.youtube.com/embed/${e.youtubeId}`,
    summary: e.summary,
    smallImg: e.smallThumbnail,
    bigImg: e.bigThumbnail

  }
})
// console.log(allMovies);

function renderCards(){
  allMovies.forEach(item => {
    let card = createElement(
      "li",
      "col",
      `
        <div class="card">
          <img src="${item.smallImg}" class="card-img-top" alt="img">
          <div class="card-body">
            <h5 class="card-title fw-bold">${item.title}</h5>
            <ul class="list ms-4 mb-3">
              <li class="list-item">
                <strong>Year: </strong>
                <span class="year-span">${item.year}</span>
              </li>
              <li class="list-item">
                <strong>Category: </strong>
                <span class="category-span">${item.categories}</span>
              </li>
              <li class="list-item">
                <strong>Rating: </strong>
                <span class="rating-span">${item.rating}</span>
              </li>
            </ul>
            <a href="${item.youtube}" class="buttonLink btn btn-danger text-uppercase fw-bold px-3">Youtube</a>
            <button class="buttonLink btn btn-primary text-uppercase fw-bold px-3">Read more</button>
          </div>
        </div>
      `
    );
    $(".card-list").appendChild(card)
  })

}

renderCards()

// =========== ============= categories push start ============= ============

function dynamicCategory(){
  let category = [];
  allMovies.forEach(movie => {
    movie.categories.forEach(item => {
      if(!category.includes(item)){
        category.push(item)
      }
    })
  })

  category.sort()

  category.forEach(element => {
    let option = createElement("option", "element-option", element);
    $(".form-select").appendChild(option)
  })

}

dynamicCategory();

// =========== ============= categories push end ============= ============


// =========== ============= ============== ============ ============= ============

const findFilm = (value) => {
  return allMovies.filter(item => {
    return item.title.match(value);
  })
}


$(".search-btn").addEventListener("click", () =>{
  $(".card-list").innerHTML = "";
  const searchValue = $(".input-value").value.toLowerCase().trim();
  const searchText = new RegExp(searchValue, "gi");
  const searchResult = findFilm(searchText);
  console.log(searchResult);
  renderResultCard(searchResult);
});
// =========== ============= ============== ============ ============= ============

function renderResultCard(allData = []){
  allData.forEach(item => {
    let card = createElement(
      "li",
      "col",
      `
        <div class="card">
          <img src="${item.smallImg}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title fw-bold">${item.title}</h5>
            <ul class="list ms-4 mb-3">
              <li class="list-item">
                <strong>Year: </strong>
                <span class="year-span">${item.year}</span>
              </li>
              <li class="list-item">
                <strong>Category: </strong>
                <span class="category-span">${item.categories}</span>
              </li>
              <li class="list-item">
                <strong>Rating: </strong>
                <span class="rating-span">${item.rating}</span>
              </li>
            </ul>
            <a href="${item.youtube}" class="buttonLink btn btn-danger text-uppercase fw-bold px-3">Youtube</a>
            <button class="buttonLink btn btn-primary text-uppercase fw-bold px-3">Read more</button>
          </div>
        </div>
      `
    );
    $(".card-list").appendChild(card)
  });
};
