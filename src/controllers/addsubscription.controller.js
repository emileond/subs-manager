import DOMPurify from 'dompurify';
import view from '../views/add-sub.html';


export default () => {
    const divEl = document.createElement('div');
    divEl.innerHTML = view;
    
    const main = divEl.querySelector('.wrapper');
    const addForm = divEl.querySelector('.add-subscription');

    const btnAddSub = divEl.querySelector('#btn-addNew')
    const btnAddMobile = divEl.querySelector('.action-btn')

    let subscriptionsState = [];

    function handleSubmit(e) {
        e.preventDefault();

        const name = DOMPurify.sanitize(e.currentTarget.itemName.value, { ALLOWED_TAGS: ['b'] })
        const category = DOMPurify.sanitize(e.currentTarget.itemCat.value, { ALLOWED_TAGS: ['b'] });

        let cost = parseFloat(e.currentTarget.itemCost.value);

        cost ? cost : cost = 0

        if (!name) return;

        const subsItem = {
            name: name,
            id: Date.now(),
            cost: cost,
            category: category,
            isActive: true
        }

        console.log(subscriptionsState)

        // Push new item into state
        subscriptionsState.push(subsItem)

        // Fire custom event
        updateState()

        // Navigate to Home
        window.location.href = "#/";

    }
    function updateState() {
        main.dispatchEvent(new CustomEvent('stateUpdated'));
    }

    function saveInLocalStorage() {
        localStorage.setItem('subscriptions', JSON.stringify(subscriptionsState))
    }

    function loadFromLocalStorage() {
        const localStorageItems = JSON.parse(localStorage.getItem('subscriptions'));

        if (localStorageItems.length) {
            subscriptionsState.push(...localStorageItems);
        }
        updateState()
    }

    addForm.addEventListener('submit', handleSubmit);
    main.addEventListener('stateUpdated', saveInLocalStorage);


    loadFromLocalStorage()

    return divEl;
}