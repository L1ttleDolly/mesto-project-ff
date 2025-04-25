const $ = document.querySelector.bind(document);
const container = $(".content"); // ограничиваю область поиска
const addButton = container.querySelector(".profile__add-button"); // кнопка добавления
const cardContainer = $(".places__list"); // контененр карточек
const cardTemplate = $("#card-template").content;

function createCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button"); //нахожу кнопку в карточке

  Object.assign(cardElement.querySelector(".card__image"), {
    src: card.link,
    alt: card.name,
  });

  cardElement.querySelector(".card__title").textContent = card.name;

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement); // deletecard - функция
  });

  return cardElement;
}

function placeCards() {
  initialCards.forEach(function (card) {
    const cardData = createCard(card, deleteCard);
    cardContainer.append(cardData);
  });

  function deleteCard(cardElement) {
    cardElement.remove();
  }
}

placeCards();
