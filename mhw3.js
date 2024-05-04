function topFunction() {
    // Scorrimento fluido fino alla cima della pagina
    document.body.scrollTop = 0; // Per browser Safari
    document.documentElement.scrollTop = 0; // Per altri browser
  }
  
  // Mostra o nasconde il bottone "Torna in cima" in base allo scrolling
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("backToTopBtn").style.display = "block";
    } else {
      document.getElementById("backToTopBtn").style.display = "none";
    }
  }

  function onResponse(response) {
    console.log("Risposta ricevuta");
    return response.json();
  }
  function onJson(json) {
    console.log(json);
    const notizie = document.querySelector("#new");
    notizie.innerHTML = "";
    let div = document.createElement("div");
    div.classList.add("news");
    for (let i = 0; i < 3; i++) {
      let div1 = document.createElement("div");
      let h3 = document.createElement("h3");
      let img = document.createElement("img");
      img.src = json.data[i].image_url;
      div1.appendChild(h3);
      div1.appendChild(img);
      notizie.appendChild(div);
      div.appendChild(div1);
      h3.textContent = json.data[i].title;
    }
    console.log(json.data[2].categories.title);
  }
  
  function notizie() {
    rest_url = "https://api.thenewsapi.com/v1/news/all?api_token=3k62xOnAJ1I9kSXfP4fo8pmC5Quk1iAZg63urOSy&language=en&limit=3"
    console.log("URL: " + rest_url);
    // Esegui fetch
    fetch(rest_url).then(onResponse).then(onJson);
  }
  notizie();



  /*SPOTIFY*/

function onJson2(json) {
  console.log("JSON ricevuto");
  console.log(json);
  // Svuotiamo la libreria
  const library = document.querySelector("#album-view");
  library.innerHTML = "";
  // Leggi il numero di risultati
  const results = json.albums.items;
  let num_results = results.length;
  // Mostriamone al massimo 10
  if (num_results > 10) num_results = 10;
  // Processa ciascun risultato
  for (let i = 0; i < num_results; i++) {
    // Leggi il documento
    const album_data = results[i];
    // Leggiamo info
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    // Creiamo il div che conterrà immagine e didascalia
    const album = document.createElement("div");
    album.classList.add("album");
    // Creiamo l'immagine
    const img = document.createElement("img");
    img.src = selected_image;
    // Creiamo la didascalia
    const caption = document.createElement("span");
    caption.textContent = title;
    // Aggiungiamo immagine e didascalia al div
    album.appendChild(img);
    album.appendChild(caption);
    // Aggiungiamo il div alla libreria
    library.appendChild(album);
  }
}
function onResponse2(response) {
  console.log("Risposta ricevuta");
  return response.json();
}

function search(event) {
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const album_input = document.querySelector("#album");
  const album_value = encodeURIComponent(album_input.value);
  console.log("Eseguo ricerca: " + album_value);
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then(onResponse2)
    .then(onJson2);
}

function onTokenJson(json) {
  console.log(json);
  // Imposta il token global
  token = json.access_token;
}

function onTokenResponse(response) {
  return response.json();
}

// OAuth credentials --- NON SICURO!
const client_id = "acf483070aae463da65db4bd124b78f9";
const client_secret = "2ebc66f3e2a24ad7963e9dc0ed4ea4be";
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token
fetch("https://accounts.spotify.com/api/token", {
  method: "post",
  body: "grant_type=client_credentials",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(client_id + ":" + client_secret),
  },
})
  .then(onTokenResponse)
  .then(onTokenJson);
// Aggiungi event listener al form
let form = document.querySelector("form");
form.addEventListener("submit", search);
console.log(form);
