const fetchLibri = () => {
    fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network non okay");
        }
        return response.json();
    })
    .then((data) => {
        let bookRow = document.getElementById("bookRow");
        data.forEach((element) => {
            let libro = document.createElement('div');
            libro.className = "col-3 mt-5";
            libro.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${element.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.price}€</p>
                        <a href="#" class="btn btn-primary">Aggiungi al carello</a>
                    </div>
                </div>`;
            bookRow.appendChild(libro);

            let pulsante = libro.querySelector('.btn-primary');

            pulsante.addEventListener("click", function (event) {
                event.preventDefault(); // Impedisce il comportamento predefinito del link
                let card = libro.querySelector('.card');
            
                if (carrello.includes(element)) {
                    // se l'elemento è già nel carrello, lo tira via
                    const index = carrello.indexOf(element);
                    carrello.splice(index, 1);
                    pulsante.textContent = "Aggiungi al carello";
                    pulsante.className = "btn btn-primary";
                    card.style.backgroundColor = ""; // rimette colore originale
                } else {
                    // se non è nel carrello lo aggiunge
                    carrello.push(element);
                    pulsante.textContent = "Aggiunto al carrello";
                    pulsante.className = "btn btn-success";
                    card.style.backgroundColor = "#FFC07B";
                }
            
                let span = document.getElementById("numbers");
                span.textContent = carrello.length;
            });
        });
    })
    .catch((error) => {
        console.log("errore:", error)
    });
}

window.onload = fetchLibri;


let carrello = [];

function visualizzaCarrello() {
    let bookRow = document.getElementById('bookRow');
    bookRow.innerHTML = "";

    carrello.forEach(libro => {
        let libroElemento = document.createElement('div');
        libroElemento.className = "col-3 mt-5";
        libroElemento.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${libro.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text">${libro.price}€</p>
                    <a href="#" class="btn btn-danger">Rimuovi dal carrello</a>
                </div>
            </div>`;
        bookRow.appendChild(libroElemento);

        let pulsante = libroElemento.querySelector('.btn-danger');
        pulsante.addEventListener("click", function (event) {
            event.preventDefault(); // Impedisce il comportamento predefinito del link
            const index = carrello.indexOf(libro);
            carrello.splice(index, 1);
            visualizzaCarrello(); // Rendi di nuovo visibile il carrello dopo aver rimosso un libro
            let span = document.getElementById("numbers");
            span.textContent = carrello.length;
        });
    });

    if (carrello.length === 0) {
        let carrelloVuoto = document.createElement('div');
        carrelloVuoto.className = "vuoto";
        carrelloVuoto.textContent = "Il carrello è vuoto";
        bookRow.appendChild(carrelloVuoto);
        carrelloVuoto.innerHTML = `<img src="assets/shopping-bag-nera.svg" alt="">Il carrello è vuoto.`
    }
}

function home() {
    let pulsante = document.getElementById('home');
    pulsante.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "index.html";
})
}

const inputRicerca = document.getElementById('inputRicerca');
const formRicerca = document.getElementById('formRicerca');

inputRicerca.addEventListener('input', ricercaLibri);
formRicerca.addEventListener('submit', function(event) {
    event.preventDefault(); // Previeni il comportamento predefinito dell'evento di submit
    ricercaLibri();
});

function ricercaLibri() {
    const valoreRicerca = inputRicerca.value.toLowerCase(); // Ottieni il valore dell'input di ricerca e convertilo in minuscolo

    fetch("https://striveschool-api.herokuapp.com/books")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Errore nella richiesta API");
            }
            return response.json();
        })
        .then((data) => {
            const libriSuggeriti = data.filter(libro => {
                // Filtra i libri in base al valore di ricerca
                return libro.title.toLowerCase().includes(valoreRicerca); // Verifica se il titolo del libro include il valore di ricerca
            });

            visualizzaLibri(libriSuggeriti); // Mostra i libri suggeriti
        })
        .catch((error) => {
            console.error("Si è verificato un errore durante il recupero dei dati:", error);
        });
}

function visualizzaLibri(libri) {
    const bookRow = document.getElementById('bookRow');
    bookRow.innerHTML = ''; // Svuota il contenuto precedente

    libri.forEach(libro => {
        const libroElemento = document.createElement('div');
        libroElemento.className = "col-3 mt-5";
        libroElemento.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${libro.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text">${libro.price}€</p>
                    <a href="#" class="btn btn-primary">Aggiungi al carello</a>
                </div>
            </div>`;
        bookRow.appendChild(libroElemento);

        let pulsante = libroElemento.querySelector('.btn-primary');

        pulsante.addEventListener("click", function (event) {
            event.preventDefault(); // Impedisce il comportamento predefinito del link
            let card = libroElemento.querySelector('.card');
        
            if (carrello.includes(libro)) {
                // se l'elemento è già nel carrello, lo tira via
                const index = carrello.indexOf(libro);
                carrello.splice(index, 1);
                pulsante.textContent = "Aggiungi al carello";
                pulsante.className = "btn btn-primary";
                card.style.backgroundColor = ""; // rimette colore originale
            } else {
                // se non è nel carrello lo aggiunge
                carrello.push(libro);
                pulsante.textContent = "Aggiunto al carrello";
                pulsante.className = "btn btn-success";
                card.style.backgroundColor = "#FFC07B";
            }
        
            let span = document.getElementById("numbers");
            span.textContent = carrello.length;
        });
    });
}



