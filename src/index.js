/**
 * Главный модуль инициализации приложения: загрузка профиля и карточек,
 * взаимодействие с формами, модальными окнами и сервером.
 */
import './pages/index.css'
import {createCard, deleteCard, toggleLikeCard} from './components/card.js'
import {showModal, hideModal, closeModalOnEsc, closeModalOnOverlayClick} from './components/modal.js'
import {enableValidation, clearValidation} from './components/validation.js'
import {getUserProfile, getCards, editDataProfile, createCardOnServer, deleteServerCard, addLike, removeLike, changeAvatar} from './components/api.js'

export {config, configApi}

const $ = document.querySelector.bind(document)
const cardContainer = $('.places__list') // контененр карточек
const cardTemplate = $('#card-template').content

const popup = document.querySelector('.popup') //попап
const modalImg = $('.popup_type_image') //модалка картинки
const modalAddCard = $('.popup_type_new-card') // модалка добавления краточек
const modalProfileEdit = $('.popup_type_edit') //модалка редактирования профиля
const modalAvatarProfile = $('.popup_type_new-avatar')
const buttonProfileEdit = $('.profile__edit-button') //кнопка редактирования профиля
const buttonAddCard = $('.profile__add-button') // плюс добаления карточек
const buttonsCloseModal = document.querySelectorAll('.popup__close') //все кнопки закрытия
const buttonSubmitModal = $('.popup__button')

const formElementProfile = $('form[name="edit-profile"]')// форма профиля
const nameInput = formElementProfile.querySelector('.popup__input_type_name')
const jobInput = formElementProfile.querySelector('.popup__input_type_description')
const formElementCard = $('form[name="new-place"]') // форма карты
const nameCardInput = formElementCard.querySelector('.popup__input_type_card-name')
const cardUrlInput = formElementCard.querySelector('.popup__input_type_url')

const formElementAvatar = $('form[name="new-avatar"]') // форма аватара
const avatarInput = $('.popup__input_type_url-avatar') //
const profileImg = $('.profile__image')
const profileTitleName = $('.profile__title') //заголовок в профиле
const profileDescription = $('.profile__description') // описание

const popupImg = modalImg.querySelector('.popup__image')
const imgTitle = modalImg.querySelector('.popup__caption')

/**
 * @typedef {Object} config
 * @property {string} formSelector - Селектор форм для валидации.
 * @property {string} inputSelector - Селектор инпутов внутри формы.
 * @property {string} submitButtonSelector - Селектор кнопки отправки формы.
 * @property {string} inactiveButtonClass - Класс для неактивной кнопки.
 * @property {string} inputErrorClass - Класс для инпута с ошибкой.
 * @property {string} inputErrorActive - Класс для активного сообщения об ошибке.
 */
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputErrorActive: '.popup__input-error_active',
}

/**
 * Конфигурация API-запросов.
 * @type {Object}
 */
const configApi = {
    authorizationToken: '7e118dfc-cae6-4af0-96ac-0800487ee4ed',
}
// Инициализация валидации всех форм
enableValidation(config)

/**
 * Загружает данные пользователя и карточки, затем инициализирует отображение.
 */
Promise.all([getCards(), getUserProfile()])
    .then(([cards, userProfile]) => {
        placeCards(cards, userProfile)
        profileTitleName.textContent = userProfile.name
        profileDescription.textContent = userProfile.about
    })
    .catch((err) => {
        console.log(err)
    })

/**
 * Загружает и устанавливает аватар пользователя при загрузке страницы.
 */
window.addEventListener('load', () => {
    getUserProfile()
        .then((data) => {
            if (data.avatar && profileImg) {
                profileImg.style.backgroundImage = `url(${data.avatar})`
            }
            profileTitleName.textContent = data.name
            profileDescription.textContent = data.about
        })
        .catch((err) => {
            console.log(err)
        })
})

/**
 * Меняет текст кнопки во время загрузки (например, "Сохранение...").
 * @param {boolean} isLoading - Флаг, указывающий на загрузку.
 * @param {HTMLButtonElement} buttonElement - Кнопка, текст которой нужно изменить.
 * @param {string} defaultText - Текст кнопки по умолчанию (например, "Сохранить").
 */
function renderLoading(isLoading, buttonElement, defaultText = 'Сохранить') {
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...'
        buttonElement.disabled = true
    }
    else {
        buttonElement.textContent = defaultText
        buttonElement.disabled = false
    }

}

/**
 * Обрабатывает отправку формы изменения аватара.
 * @param {Event} evt - Событие отправки формы.
 */
function handleAvatarSubmitProfile(evt) {
    evt.preventDefault()
    renderLoading(true, buttonSubmitModal)

    const inputAvatarValue = avatarInput.value

    changeAvatar(inputAvatarValue)
        .then((data) => {
            if(profileImg) {
                profileImg.style.backgroundImage = `url(${data.avatar})`
            }
        })
        .finally(() => {
            renderLoading(false, buttonSubmitModal)
        })
    hideModal(modalAvatarProfile)
}

formElementAvatar.addEventListener('submit', handleAvatarSubmitProfile)

//Опредление в котором из попапов произошел клик для закрытия модального окна.
buttonsCloseModal.forEach(function (button) {
    button.addEventListener('click', function () {
        const modal = button.closest('.popup')
        if (modal) {
            hideModal(modal)
        }
    })
})

/**
 * Обрабатывает клик по карточке: открывает модальное окно с увеличенным изображением.
 * @param {Object} card - Объект карточки с полями `name` и `link`.
 */
function handleCardClick(card) {
    Object.assign(popupImg,
        {
            src: card.link,
            alt: card.name,
        })
    imgTitle.textContent = card.name
    showModal(modalImg)
}

/**
 * Создаёт карточки и добавляет их на страницу.
 * @param {Array} cards - Массив объектов карточек.
 * @param {Object} userProfile - Данные текущего пользователя.
 */
function placeCards(cards, userProfile) {
    cards.forEach(function (card) {
// Создаём DOM-элемент карточки и добавляем его в контейнер
        const cardData = createCard(
            card,
            cardTemplate,
            modalImg,
            handleCardClick,
            deleteCard,
            toggleLikeCard,
            userProfile
        )
        cardContainer.append(cardData) //Вывод в контейнер вызов функцию, которая делает все то,что перечислено в параметрах
    })
}

/**
 * Заполняет форму редактирования профиля текущими данными из профиля.
 */
function fillProfileForm() {
    nameInput.value = profileTitleName.textContent // Достаем текст из элемента профиля(тайлт и описание) и вставляем в поле ввода
    jobInput.value = profileDescription.textContent
}

/**
 * Обрабатывает отправку формы редактирования профиля.
 * Обновляет данные профиля на странице и закрывает модальное окно.
 * @param {Event} evt - Событие отправки формы.
 */
function handleFormSubmitProfile(evt) {
    evt.preventDefault()
    renderLoading(true, buttonSubmitModal)
    const nameInputValue = nameInput.value
    const jobInputValue = jobInput.value

    editDataProfile(nameInputValue, jobInputValue)
        .then((data) => {

            profileTitleName.textContent = data.name
            profileDescription.textContent = data.about
            hideModal(modalProfileEdit)

        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            renderLoading(false, buttonSubmitModal)
        })
}

/**
 * Обрабатывает создание новой карточки на основе данных из формы.
 * Добавляет карточку в начало списка и закрывает модальное окно.
 * @param {Event} evt - Событие отправки формы.
 */
function makeNewCard(evt) {
    evt.preventDefault()
    renderLoading(true, buttonSubmitModal)
// Получение данных из поля имени
    const nameValue = nameCardInput.value
    const cardUrl = cardUrlInput.value
// Создание объекта для новой карточки
    const newCard = {
        name: nameValue,
        link: cardUrl,
    }

//Создание карточки на сервере
    createCardOnServer(newCard)
        .then((card) => {
            const cardData = createCard(
                card,
                cardTemplate,
                modalImg,
                handleCardClick,
                deleteCard,
                toggleLikeCard,
                card.owner
            )
            cardContainer.prepend(cardData)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            renderLoading(false, buttonSubmitModal)
        })

    hideModal($('.popup_is-opened'))

    formElementCard.reset()
}

//Слушатель который после отправки, создаст новую карточку
    formElementCard.addEventListener('submit', makeNewCard)

/**
 * Обработчик клика по кнопке редактирования профиля.
 */
    buttonProfileEdit.addEventListener('click', function () {
        showModal(modalProfileEdit)
        fillProfileForm() // Заполнение модального окна текущими данными со страицы
        clearValidation(formElementProfile, config)
    })

/**
 * Обработчик клика по кнопке добавления карточки.
 */
    buttonAddCard.addEventListener('click', function () {
        showModal(modalAddCard)
        formElementCard.reset()
        clearValidation(formElementCard, config)
    })

/**
 * Обработчик клика по аватарке профиля для загрузки новой.
 */
profileImg.addEventListener('click', function () {
        showModal(modalAvatarProfile)
        formElementCard.reset()
        clearValidation(formElementCard, config)
    })

formElementProfile.addEventListener('submit', handleFormSubmitProfile)

