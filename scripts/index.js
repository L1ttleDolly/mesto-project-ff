const $ = document.querySelector.bind(document);
const container = $(".content"); // ограничиваю область поиска
const addButton = container.querySelector(".profile__add-button"); // кнопка добавления
const cardContainer = $(".places__list"); // контененр карточек
const cardTemplate = $("#card-template").content;

function createCard(card, deleteCard) { //функиця добавления карты
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); //клонирую
  const deleteButton = cardElement.querySelector(".card__delete-button"); //нахожу кнопку в карточке

  Object.assign(cardElement.querySelector(".card__image"), { //чеоез этот метод (target, {source1, source2,})
    src: card.link,
    alt: card.name,
  });

  cardElement.querySelector(".card__title").textContent = card.name; //title

  deleteButton.addEventListener("click", function () { //обработчик по клику внутри функции с карточкойй, чтобы было понятно где происходит клик
    deleteCard(cardElement); // deletecard - функция
  });

  return cardElement; //возвращаю 1 заполненную карточку
}

function placeCards() {// через эту функцию заполняю карточки
  initialCards.forEach(function (card) {
    const cardData = createCard(card, deleteCard);
    cardContainer.append(cardData);
  });

  function deleteCard(cardElement) { //удаление карточки
    cardElement.remove();
  }
}

placeCards(); //вызываб функцию массива
