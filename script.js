const subsContainer = document.querySelector('.subscriptions');
const subsList = document.querySelector('.subscriptions--list');
const addForm = document.querySelector('.add-subscription');
const totalContainer = document.querySelector('.total')

let subscriptionsState = [];

function handleSubmit(e) {
    e.preventDefault();

    const name = e.currentTarget.itemName.value;
    const category = e.currentTarget.itemCat.value;
    const cost = parseFloat(e.currentTarget.itemCost.value);

    if (!name) return;

    const subsItem = {
        name: name,
        id: Date.now(),
        cost: cost,
        category: category
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
    const html = subscriptionsState.map(item => `
        <div class="subscriptions--card">
            <img src="https://logo.clearbit.com/${item.name}.com"/>
            <div class="subscriptions--card__details">
                <h4>${item.name}</h4>
                <span>${item.category}</span>
            </div>
            <div class="subscriptions--card__price">
                <span>$${item.cost} / month</span>
        </div>
        </div>
    `).join(' ')

    subsList.innerHTML = html;
}

function updateTotal() {
    const total = subscriptionsState.reduce((tots, obj) => obj.cost + tots, 0);

    console.log('new total is ' + total);

    const html = `<h3>Total: $${total}</h3>`;

    totalContainer.innerHTML = html;
}

addForm.addEventListener('submit', handleSubmit);
subsContainer.addEventListener('stateUpdated', displaySubs)
subsContainer.addEventListener('stateUpdated', updateTotal)