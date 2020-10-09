import Home from './home.controller'
import AddSubscription from './addsubscription.controller'
import NotFound from "./404";

const pages = {
    home: Home,
    addSubscription: AddSubscription,
    notFound: NotFound,
}

export {pages}