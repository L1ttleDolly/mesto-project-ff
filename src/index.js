import './pages/index.css'
import { initialCards } from "./components/cards.js";

const $ = document.querySelector.bind(document);
const container = $(".content"); // ограничиваю область поиска


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
}


function deleteCard(cardElement) { //удаление карточки
    cardElement.remove();
}

placeCards(); //вызываб функцию массива



const buttonProfileEdit = document.querySelector('.profile__edit-button') //кнопка редактирования профиля
const modalProfileEdit = document.querySelector('.popup_type_edit') //модалка редактирования профиля

const buttonAddCard = document.querySelector('.profile__add-button') // плюс добаления карточек
const modalAddCard = document.querySelector('.popup_type_new-card') // модалка добавления краточек

const buttonsCloseModal = document.querySelectorAll('.popup__close') //все кнопки закрытия

/* showModal - добавляет элементу класс
вешает слушатель на документ для keydown, чтобы закрывать по esc
вешает слушатель на элемент(открытый попопа которы передается в дальнешейем), чтобы закрываться по клику на оверлей(popup)
*/
function showModal (element) {
    element.classList.add('popup_is-opened')
    document.addEventListener('keydown', closeModalOnEsc)
    element.addEventListener('mouseup', closeModalOnOverlayClick)
}

/* hideModal - удаляет класс у элемента
удаляю слушатель на документе после закрытия модалки
удаляю слушатель с элемента после закрытия модалки
 */
function hideModal(element) {
    element.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeModalOnEsc)
    element.removeEventListener('mouseup', closeModalOnOverlayClick)
}

/* closeModalOnEsc - будет закрывать модалку по esc
делаю проверку, что нажата клавиша = esc,
созда константу с классом, который делает модалку открытой, чтобы в дальнейшем передать это в качестве аргумента, при вызове функции
проверяю если(модальное окно открыто) вызываю функцию скрытия модалки с аргументом открытой модалки, чтобы было понятно,какая модалка открыта чтобы ее закрывать
 */
function closeModalOnEsc(e){
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.popup_is-opened')
        if(openModal)hideModal(openModal)
    }
}

/* closeModalOnOverlayClick - будет закрывать модалку по клику на оверлей
делаю проверку таргета, ссылаясь на элемент на который установлен слушатель - e.currentTarget(оверлей). а e.target - элемент,
по которому кликнули, если они совпадают, значит клик был вне модалки. Потому что
созда константу с классом, который делает модалку открытой, чтобы в дальнейшем передать это в качестве аргумента, при вызове функции
и вызываю функцию закрытия попапа, когда произойдет клик по оверле.
* */
function closeModalOnOverlayClick(e) {
    if (e.target === e.currentTarget) {
        const openModal = document.querySelector('.popup_is-opened')
        hideModal(openModal)
    }
}
/*открытие по клику*/
buttonProfileEdit.addEventListener('click', function () {
    showModal(modalProfileEdit)
});
buttonAddCard.addEventListener('click', function () {
    showModal(modalAddCard)
});
/*перебираю через форич кнопки закрытия, определаю через closest в котором попапе нажата кнопка закрытия, делаю поверку, чтоы действительно нашла попап и вызываю функцию*/
buttonsCloseModal.forEach(function (button) {
    button.addEventListener('click', function () {
        const modal = button.closest('.popup')
        if (modal) {
            hideModal(modal)
        }
    })
    })





