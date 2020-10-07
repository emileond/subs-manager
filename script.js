const subsContainer = document.querySelector('.subscriptions');
const subsList = document.querySelector('.subscriptions--list');
const addForm = document.querySelector('.add-subscription');

let subscriptionsState = [];

function handleSubmit(e) {
    e.preventDefault();

    const name = e.currentTarget.itemName.value;

    const price = 5.00;

    const category = 'Entertainment';

    const subsItem = {
        name: name,
        id: toString(Date.now()),
        price: price,
        category: category
    }

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
            <img src="https://logo.clearbit.com/${item.name}.com" />
            <div class="subscriptions--card__details">
                <h4>${item.name}</h4>
            </div>
            <div class="subscriptions--card__price">
                <span>$${item.price} / month</span>
        </div>
        </div>
    `).join()

    subsList.innerHTML = html;
}


addForm.addEventListener('submit', handleSubmit);
subsContainer.addEventListener('stateUpdated', displaySubs)