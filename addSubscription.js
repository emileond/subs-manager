const main = document.querySelector('main');
const addForm = document.querySelector('.add-subscription');

const btnAddSub = document.querySelector('#btn-addNew')
const btnAddMobile = document.querySelector('.action-btn')
// const modalOuter = document.querySelector('.modal-outer')

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

    // Clear the form
    window.location.href = "index.html";

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

// function showModal(e) {
//     e.preventDefault();
//     modalOuter.classList.add('visible')
// }

// function closeModal(e) {
//     modalOuter.classList.remove('visible');
// }

// btnAddSub.addEventListener('click', showModal);
// btnAddMobile.addEventListener('click', showModal);

// modalOuter.addEventListener('click', (e) => {
//     const isOutside = !e.target.closest('.modal-inner');
//     isOutside ? closeModal() : null
// })



loadFromLocalStorage()