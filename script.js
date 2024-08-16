let gameState = {
    revenue: 0,
    customers: 0,
    churnRate: 0,
    rounds: 0,
    pricing: 50, // Default price per customer
    fixedCosts: 10000, // Monthly fixed costs
    variableCostPerCustomer: 10, // Cost per customer per month
    monthlyMarketingSpend: 2000, // Default marketing budget
    competitors: [],
    events: [],
    cards: [],
};

// Initialize the game
function initGame() {
    loadCards();
    loadEvents();
    loadCompetitors();
    updateStats();
}

// Load cards from a JSON file
function loadCards() {
    fetch('data/cards.json')
        .then(response => response.json())
        .then(data => {
            gameState.cards = data;
        });
}

// Load events from a JSON file
function loadEvents() {
    fetch('data/events.json')
        .then(response => response.json())
        .then(data => {
            gameState.events = data;
        });
}

// Load competitors from a JSON file
function loadCompetitors() {
    fetch('data/competitors.json')
        .then(response => response.json())
        .then(data => {
            gameState.competitors = data;
        });
}

// Update the player stats UI
function updateStats() {
    document.getElementById('revenue').innerText = `$${gameState.revenue.toFixed(2)}`;
    document.getElementById('customers').innerText = gameState.customers;
    document.getElementById('churn-rate').innerText = `${gameState.churnRate.toFixed(2)}%`;
}

// Draw a card
document.getElementById('draw-card-btn').addEventListener('click', function() {
    let card = gameState.cards[Math.floor(Math.random() * gameState.cards.length)];
    document.getElementById('drawn-card').innerText = card.name;
    applyCardEffect(card);
    gameState.rounds++;
    checkGameEnd();
});

// Apply the effects of a drawn card
function applyCardEffect(card) {
    // Example: Increase revenue or customers based on card type
    if (card.type === 'revenue') {
        gameState.revenue += card.amount;
    } else if (card.type === 'customers') {
        gameState.customers += card.amount;
    }
    updateStats();
}

// Check if the game should end
function checkGameEnd() {
    if (gameState.rounds >= 36) { // 3 years (12 rounds per year)
        endGame();
    }
}

// End the game and show results
function endGame() {
    alert(`Game Over! Your final revenue is $${gameState.revenue.toFixed(2)} and you have ${gameState.customers} customers.`);
    // Optionally, add logic to show the results on the page
}

// Example decision buttons
document.getElementById('marketing-btn').addEventListener('click', function() {
    gameState.monthlyMarketingSpend += 1000;
    alert('You invested $1000 more in marketing!');
    updateStats();
});

document.getElementById('technology-btn').addEventListener('click', function() {
    gameState.variableCostPerCustomer -= 1;
    alert('You reduced technology costs per customer by $1!');
    updateStats();
});

document.getElementById('pricing-btn').addEventListener('click', function() {
    gameState.pricing += 10;
    alert('You increased pricing by $10 per customer!');
    updateStats();
});

document.getElementById('partnership-btn').addEventListener('click', function() {
    gameState.revenue += 5000;
    alert('You formed a partnership and gained $5000 in revenue!');
    updateStats();
});

// Initialize the game on page load
window.onload = initGame;
