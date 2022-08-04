// quando clicco il bottone chiamo l'api random user
const addBtn = document.getElementById('addUser');
addBtn.addEventListener('click', addUser);
initUsers();

// dal risultato prendo nome, cognome e immagine
function addUser() {
  // chiamo l'api random user con axios
  axios
    .get('https://randomuser.me/api/')
    .then((response) => {
      //console.log(response.data.results[0]);
      createCard(response.data.results[0]);
    })
    .catch((error) => {
      console.log(error);
    });
}

// funzione init che viene chiamata quando si carica la pagina e inizializza la gallery
function initUsers() {
  // chiamo l'api random user con axios
  axios
    .get('https://randomuser.me/api/?results=6')
    .then((response) => {
      console.log(response.data.results);
      // l'api ritorna nella response un array di 3 utenti
      users = response.data.results;
      // per ogni utente creo la card
      users.forEach((element) => {
        createCard(element);
      });
      //   for(let i = 0; i < users.length; i++){
      //     createCard(users[i]);
      //   }
    })
    .catch((error) => {
      console.log(error);
    });
}

// costruisco la card e la aggiungo al documento
function createCard(user) {
  // dall'oggetto user che arriva dall'api estraggo nome, cognome e url dell'immagine
  const firstName = user.name.first;
  const lastName = user.name.last;
  const picture = user.picture.large;
  console.log(firstName, lastName, picture);
  // creo gli elementi del dom
  const col = createDomElement('div', 'col-4');
  const card = createDomElement('div', 'card');
  const img = createDomElement('img', 'card-img-top');
  img.src = picture;
  const cardBody = createDomElement('div', 'card-body');
  const h5 = createDomElement('h5', 'card-title');
  h5.innerText = firstName + ' ' + lastName;
  cardBody.appendChild(h5);
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);
  // aggiungo la card al dom
  document.getElementById('gallery').appendChild(col);
}

// funzione di servizio che crea l'element a partire dal tipo di tag e dalle classi
function createDomElement(type, className) {
  const el = document.createElement(type);
  el.className = className;
  return el;
}
