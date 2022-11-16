movies.splice(300)

let allMovies = movies.map(e => {
  return {
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

function renderCards() {
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
            <button class="buttonLink btn btn-primary text-uppercase fw-bold px-3" id="readMore">Read more</button>
          </div>
        </div>
      `
    );
    $(".card-list").appendChild(card)
  })

}
renderCards()

function viewTime(){
  $(".footer-title").innerHTML = new Date().getFullYear()

}
viewTime()
// =========== ============= categories push start ============= ============
function dynamicCategory() {
  let category = [];
  allMovies.forEach(movie => {
    movie.categories.forEach(item => {
      if (!category.includes(item)) {
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


// ============= Searching film name, rating sort, categories sort  =============
const findFilm = (value, ratingNum, sortCategory) => {
  return allMovies.filter(item => {

    return item.title.match(value) && item.rating >= ratingNum && item.categories.includes(sortCategory);
  })
}


$(".form").addEventListener("submit", (e) => {
  e.preventDefault()
  $(".card-list").innerHTML = `
    <div class="spinner-grow" role="status">
      <span dataset-nimadir="" class="visually-hidden">Loading...</span>
    </div>
  `;
  const searchValue = $(".input-value").value.toLowerCase().trim();
  const ratingFilm = $(".input-rating").value;
  const categorySelected = $(".select-category").value;


  const searchText = new RegExp(searchValue, "gi");
  const searchResult = findFilm(searchText, ratingFilm, categorySelected);


  setTimeout(() => {

    $(".card-list").innerHTML = "";

    renderResultCard(searchResult);
    if(searchResult.length == 0){
      let heading = createElement("h2", "result-title", "Ma'lumot topilmadi");
      $(".card-list").appendChild(heading)
    }
  }, 2000);
});
// =========== ============= ============== ============ ============= ============

function renderResultCard(allData = []) {
  let count = 0;
  allData.forEach(item => {
    count++;
    $(".finder-result-text").classList.remove("d-none");
    $(".strong-tag").textContent = count;
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
            <button class="buttonLink btn btn-primary text-uppercase fw-bold px-3" id="readMore">Read more</button>
          </div>
        </div>
      `
    );
    $(".card-list").appendChild(card)
  });
};

function closeModal(){
  // readMore
  console.log(readMore);
}
closeModal()