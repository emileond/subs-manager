import {pages} from '../controllers/index'
let App = document.querySelector('#app')


const router = (route) => {
    console.log(window.location.hash)
    App.innerHTML = '';
    switch (route) {
        case '':
            return App.appendChild(pages.home())
        case '#/':
            return App.appendChild(pages.home())
        case '#/add-subscription':
            return App.appendChild(pages.addSubscription())
        default:
            return App.appendChild(pages.notFound())
    }
}

export { router };