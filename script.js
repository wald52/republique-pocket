// script.js

// Charger la collection depuis le localStorage ou initialiser
let userCollection = JSON.parse(localStorage.getItem('republicPocketCollection')) || {};

// Éléments du DOM
const boosterPack = document.getElementById('booster-pack');
const revealArea = document.getElementById('reveal-area');
const collectionGrid = document.getElementById('collection-grid');
const btnOpen = document.getElementById('btn-open');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    updateCollectionUI();
    
    // Clic sur le bouton ouvrir
    btnOpen.addEventListener('click', openBooster);
});

// Fonction d'ouverture de booster
function openBooster() {
    if (revealArea.innerHTML !== "") {
        // Nettoyer si déjà ouvert
        revealArea.innerHTML = "";
    }

    // Animation visuelle
    boosterPack.classList.add('opening');
    btnOpen.disabled = true;
    btnOpen.textContent = "Ouverture en cours...";

    // Délai pour simuler l'ouverture (1s)
    setTimeout(() => {
        boosterPack.classList.remove('opening');
        generateBoosterContent();
        btnOpen.disabled = false;
        btnOpen.textContent = "Ouvrir un autre dossier";
    }, 1000);
}

// Générer 5 cartes aléatoires avec poids de rareté
function generateBoosterContent() {
    const boosterCards = [];
    
    for (let i = 0; i < 5; i++) {
        const card = drawRandomCard();
        boosterCards.push(card);
        
        // Ajouter à la collection utilisateur
        if (!userCollection[card.id]) {
            userCollection[card.id] = 0;
        }
        userCollection[card.id]++;
    }

    // Sauvegarder
    localStorage.setItem('republicPocketCollection', JSON.stringify(userCollection));
    updateCollectionUI();
    
    // Afficher les cartes
    displayCards(boosterCards);
}

// Algorithme de tirage (Poids)
function drawRandomCard() {
    const rand = Math.random() * 100;
    let selectedRarity;

    // 60% Commune, 30% Peu Commune, 9% Rare, 1% Légendaire
    if (rand < 60) selectedRarity = 1;
    else if (rand < 90) selectedRarity = 2;
    else if (rand < 99) selectedRarity = 3;
    else selectedRarity = 4;

    // Filtrer les aides par rareté
    const pool = aidsDatabase.filter(aid => aid.rarity === selectedRarity);
    
    // Si le pool est vide (cas d'erreur), prendre une commune
    if (pool.length === 0) return aidsDatabase[0];

    // Choisir une carte au hasard dans le pool
    const randomAid = pool[Math.floor(Math.random() * pool.length)];
    return randomAid;
}

// Création du HTML pour les cartes
function displayCards(cards) {
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card`;
        cardElement.onclick = () => cardElement.classList.toggle('flipped'); // Retourner au clic

        // Délai d'apparition en cascade
        cardElement.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;

        cardElement.innerHTML = `
            <div class="card-face card-back">
                RF
            </div>
            <div class="card-face card-front rarity-${card.rarity}">
                <div class="card-title">${card.name}</div>
                <div class="card-image">${card.image}</div>
                <div class="card-desc">${card.description}</div>
                <div class="card-stats">
                    <span>⚔️ ${card.cost}</span>
                    <span>❤️ ${formatBudget(card.budget)}</span>
                </div>
            </div>
        `;
        revealArea.appendChild(cardElement);
        
        // Auto-flip après un petit délai pour l'effet "wow"
        setTimeout(() => {
            cardElement.classList.add('flipped');
        }, 500 + (index * 300));
    });
}

function updateCollectionUI() {
    collectionGrid.innerHTML = "";
    aidsDatabase.forEach(aid => {
        const count = userCollection[aid.id] || 0;
        const div = document.createElement('div');
        div.className = `collection-item ${count > 0 ? 'owned' : ''}`;
        div.innerHTML = `
            <strong>${aid.name}</strong><br>
            <small>${count > 0 ? 'x' + count : 'Non acquis'}</small>
        `;
        collectionGrid.appendChild(div);
    });
}

function formatBudget(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + " Md€";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + " M€";
    return num + " €";
}
