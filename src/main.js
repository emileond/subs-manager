import './sass/styles.scss'
import {router} from './router/index.routes'

console.log(window.location.hash)
router(window.location.hash)

window.addEventListener('hashchange', () => {
    router(window.location.hash)
})
