export {showModal, hideModal, closeModalOnEsc, closeModalOnOverlayClick}

function showModal(element) {
    element.classList.add('popup_is-opened')
    document.addEventListener('keydown', closeModalOnEsc)
    element.addEventListener('click', closeModalOnOverlayClick)
}

function hideModal(element) {
    element.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeModalOnEsc)
    element.removeEventListener('click', closeModalOnOverlayClick)
}


function closeModalOnEsc(e) {
    if (e.key === 'Escape') {

        if (document.querySelector('.popup_is-opened')) hideModal(document.querySelector('.popup_is-opened'))
    }
}


function closeModalOnOverlayClick(e) {
    if (e.target === e.currentTarget) {

        hideModal(e.target.closest('.popup'))
    }
}
