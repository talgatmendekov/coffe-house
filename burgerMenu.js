//------------------------------------------- burger menu 


let burgerBtn = document.querySelector('.burgerBtn')
let burgerMenu = document.querySelector('.burgerMenu')


burgerBtn.onclick = showNav
burgerMenu.onclick = closeNav

function showNav() {
    burgerBtn.classList.toggle('active')
    burgerMenu.classList.toggle('active')
}
function closeNav() {
    burgerBtn.classList.remove('active')
    burgerMenu.classList.remove('active')
}

