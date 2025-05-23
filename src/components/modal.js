export {showModal, hideModal, closeModalOnEsc, closeModalOnOverlayClick}

/**
 * Открывает модальное окно
 * @param {HTMLElement} element - DOM элемент модального окна, которое нужно открыть
 * @description Добавляет элементу класс для отображения, устанавливает обработчики для закрытия по клавише Escape и клику на оверлей
 */
function showModal(element) {
    element.classList.add('popup_is-opened')
    document.addEventListener('keydown', closeModalOnEsc)
    element.addEventListener('click', closeModalOnOverlayClick)
}

/**
 * Закрывает модальное окно
 * @param {HTMLElement} element - DOM элемент модального окна, которое нужно закрыть
 * @description Удаляет класс отображения у элемента и удаляет обработчики закрытия по Escape и клику на оверлей
 */
function hideModal(element) {
    element.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeModalOnEsc)
    element.removeEventListener('click', closeModalOnOverlayClick)
}

/**
 * Закрывает модальное окно при нажатии клавиши Escape
 * @param {KeyboardEvent} e - Событие нажатия клавиши
 * @description Проверяет, что нажата клавиша Escape, находит открытое модальное окно и закрывает его
 */
function closeModalOnEsc(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.popup_is-opened')
        if (openModal) hideModal(openModal)
    }
}

/**
 * Закрывает модальное окно при клике на оверлей (область вне модального окна)
 * @param {MouseEvent} e - Событие клика мыши
 * @description Проверяет, что клик был выполнен по оверлею (не по содержимому модального окна),
 * находит открытое модальное окно и закрывает его
 */
function closeModalOnOverlayClick(e) {
    if (e.target === e.currentTarget) {
        const openModal = document.querySelector('.popup_is-opened')
        hideModal(openModal)
    }
}
