import {pages} from '../controllers/index'
const menuHome = document.querySelector('#menuHome')
const menuStats = document.querySelector('#menuStats')
const menuSettings = document.querySelector('#menuSettings')
let App = document.querySelector('#app')


const router = (route) => {
    console.log(window.location.hash)
    App.innerHTML = '';
    switch (route) {
        case '':
            menuHome.classList.add('active')
            menuStats.classList.remove('active')
            menuSettings.classList.remove('active')
            return App.appendChild(pages.home())
        case '#/':
            menuHome.classList.add('active')
            menuStats.classList.remove('active')
            menuSettings.classList.remove('active')
            return App.appendChild(pages.home())
        case '#/add-subscription':
            menuHome.classList.add('active')
            menuStats.classList.remove('active')
            menuSettings.classList.remove('active')
            return App.appendChild(pages.addSubscription())
        default:
            menuHome.classList.remove('active')
            menuStats.classList.remove('active')
            menuSettings.classList.remove('active')
            return App.appendChild(pages.notFound())
    }
}

export { router };