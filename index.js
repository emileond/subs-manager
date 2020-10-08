const main = document.querySelector('main');
const subsListActive = document.querySelector('.subscriptions--list');
const subsListInactive = document.querySelector('.subscriptions--list__inactive')
const totalContainer = document.querySelector('.total')

let subscriptionsState = [];

function updateState() {
    main.dispatchEvent(new CustomEvent('stateUpdated'));
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
        <div class="subscriptions--card inactive">
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
    `).join('');

        const inactiveEmptyState = `
        <p class="empty-state">Inactive items will appear here.</p>
        `;

        const activeEmptyState = `
        <p class="empty-state">Add a new subscription to start tracking your expenses</p>
        `;

    console.log(inactivesubs.length)
    console.log(activesubs.length)

    inactivesubs.length ? subsListInactive.innerHTML = inactiveCards : subsListInactive.innerHTML = inactiveEmptyState
    activesubs.length ? subsListActive.innerHTML = activeCards : subsListActive.innerHTML = activeEmptyState
    
}

function updateTotal() {
    const activeSubs = subscriptionsState.filter(item => item.isActive)
    const total = activeSubs.reduce((tots, obj) => obj.cost + tots, 0).toFixed(2);

    console.log('new total is ' + total);

    const html = `<h2>Total: $${total}</h2>`;

    totalContainer.innerHTML = html;
}

function saveInLocalStorage() {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptionsState))
}

function loadFromLocalStorage() {
    const localStorageItems = JSON.parse(localStorage.getItem('subscriptions'));


    if (localStorageItems) {
        subscriptionsState.push(...localStorageItems);
    }
    updateState()
}
function toggleActive(id) {
    const itemRef = subscriptionsState.find(item => item.id === id);

    itemRef.isActive = !itemRef.isActive;

    setTimeout(updateState, 250);
    ;
}

main.addEventListener('stateUpdated', displaySubs);
main.addEventListener('stateUpdated', updateTotal);
main.addEventListener('stateUpdated', saveInLocalStorage);

main.addEventListener('click', function (e) {
    const id = parseInt(e.target.value)

    if (e.target.matches('input[type="checkbox"]')) {

        toggleActive(id)
    }
})

loadFromLocalStorage()