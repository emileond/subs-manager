const subsContainer = document.querySelector('.subscriptions');
const subsListActive = document.querySelector('.subscriptions--list');
const subsListInactive = document.querySelector('.subscriptions--list__inactive')
const addForm = document.querySelector('.add-subscription');
const totalContainer = document.querySelector('.total')

const btnAddSub = document.querySelector('#btn-addNew')
const modalOuter = document.querySelector('.modal-outer')

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

    console.log(subsItem.id)

    // Push new item into state
    subscriptionsState.push(subsItem)
    console.log(`There are now ${subscriptionsState.length} items in the state`)

    // Clear the form
    e.target.reset();

    // Fire custom event
    subsContainer.dispatchEvent(new CustomEvent('stateUpdated'));

}

function displaySubs() {
    const inactivesubs = subscriptionsState.filter(item => !item.isActive);
    const activesubs = subscriptionsState.filter(item => item.isActive);

    const activeCards = activesubs.map(item => `
        <div class="subscriptions--card">
            <img src="https://logo.clearbit.com/${item.name}.com"/>
            <div class="subscriptions--card__details">
                <h4>${item.name}</h4>
                <span>${item.category}</span>
            </div>
            <div class="subscriptions--card__price">
                <label class="switch">
                    <input type="checkbox" value="${item.id}" ${item.isActive ? 'checked' : null}/>
                    <span class="slider round"></span>
                </label>
                <span>$${item.cost} / month</span>
        </div>
        </div>
    `).join('')

    const inactiveCards = inactivesubs.map(item => `
    <div class="subscriptions--card">
        <img src="https://logo.clearbit.com/${item.name}.com"/>
        <div class="subscriptions--card__details">
            <h4>${item.name}</h4>
            <span>${item.category}</span>
        </div>
        <div class="subscriptions--card__price">
            <label class="switch">
                <input type="checkbox" value="${item.id}" ${item.isActive ? 'checked' : null}/>
                <span class="slider round"></span>
            </label>
            <span>$${item.cost} / month</span>
    </div>
    </div>
`).join('')

    subsListActive.innerHTML = activeCards;
    subsListInactive.innerHTML = inactiveCards;
}

function updateTotal() {
    const activeSubs = subscriptionsState.filter(item => item.isActive)
    const total = activeSubs.reduce((tots, obj) => obj.cost + tots, 0);

    console.log('new total is ' + total);

    const html = `<h2>Total: $${total}</h2>`;

    totalContainer.innerHTML = html;
}

function toggleActive(id) {
    const itemRef = subscriptionsState.find(item => item.id === id);

    itemRef.isActive = !itemRef.isActive;

    subsContainer.dispatchEvent(new CustomEvent('stateUpdated'));
}

function saveInLocalStorage() {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptionsState))
}

function loadFromLocalStorage() {
    const localStorageItems = JSON.parse(localStorage.getItem('subscriptions'));

    if (localStorageItems.length) {
        subscriptionsState.push(...localStorageItems);
    }
    subsContainer.dispatchEvent(new CustomEvent('stateUpdated'))
}
function showModal(e) {
    e.preventDefault();
    modalOuter.classList.add('visible')
}

function closeModal(e) {
    const isOutside = !e.target.closest('.modal-inner');
    isOutside ? modalOuter.classList.remove('visible') : null
}

addForm.addEventListener('submit', handleSubmit);
subsContainer.addEventListener('stateUpdated', displaySubs);
subsContainer.addEventListener('stateUpdated', updateTotal);
subsContainer.addEventListener('stateUpdated', saveInLocalStorage);

btnAddSub.addEventListener('click', showModal);
modalOuter.addEventListener('click', closeModal)

subsContainer.addEventListener('click', function (e) {
    const id = parseInt(e.target.value)
    if (e.target.matches('input[type="checkbox"]')) {
        toggleActive(id)
    }
})

loadFromLocalStorage()