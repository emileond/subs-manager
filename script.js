import DOMPurify from 'dompurify';
import 'boxicons'

const subsContainer = document.querySelector('.subscriptions');
const subsListActive = document.querySelector('.subscriptions--list');
const subsListInactive = document.querySelector('.subscriptions--list__inactive')
const addForm = document.querySelector('.add-subscription');
const totalContainer = document.querySelector('.total')

let subscriptionsState = [];

function handleSubmit(e) {
    e.preventDefault();

    const name = DOMPurify.sanitize(e.currentTarget.itemName.value, {ALLOWED_TAGS: ['b']})
    const category = DOMPurify.sanitize(e.currentTarget.itemCat.value, {ALLOWED_TAGS: ['b']});
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
                <span>$${item.cost} / month</span>
                <label class="label toggle">
                    <div class="toggle-control"></div>
                    <input type="checkbox" value="${item.id}" ${item.isActive ? 'checked' : null}/>
                </label>
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
            <span>$${item.cost} / month</span>
            <label class="label toggle">
                <div class="toggle-control"></div>
                <input type="checkbox" value="${item.id}" ${item.isActive ? 'checked' : null}/>
            </label>
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
    const itemRef = subscriptionsState.find( item => item.id === id);

    itemRef.isActive = !itemRef.isActive;

    subsContainer.dispatchEvent(new CustomEvent('stateUpdated'));
}

function saveInLocalStorage() {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptionsState))
}

function loadFromLocalStorage() {
    const localStorageItems = JSON.parse(localStorage.getItem('subscriptions'));

    if (localStorageItems.length) {
        subscriptionsState.push(...localStorageItems);
    }
    subsContainer.dispatchEvent(new CustomEvent('stateUpdated'))
}

addForm.addEventListener('submit', handleSubmit);
subsContainer.addEventListener('stateUpdated', displaySubs);
subsContainer.addEventListener('stateUpdated', updateTotal);
subsContainer.addEventListener('stateUpdated', saveInLocalStorage);

subsContainer.addEventListener('click', function(e){
    const id = parseInt(e.target.value)
    if ( e.target.matches('input[type="checkbox"]') ) {
        toggleActive(id)
    }
})

loadFromLocalStorage()