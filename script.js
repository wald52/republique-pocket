// script.js

// Variable globale pour stocker les données chargées depuis le JSON
let aidsDatabase = [];

// Charger la collection utilisateur depuis le localStorage ou initialiser
let userCollection = JSON.parse(localStorage.getItem('republicPocketCollection')) || {};

// Éléments du DOM
const boosterPack = document.getElementById('booster-pack');
const revealArea = document.getElementById('reveal-area');
const collectionGrid = document.getElementById('collection-grid');
const btnOpen = document.getElementById('btn-open');

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    // On désactive le bouton le temps du chargement
    btnOpen.disabled = true;
    btnOpen.textContent = "Chargement des aides...";

    await loadAidsData(); // Chargement des données réelles
    updateCollectionUI();
    
    // Réactivation du bouton
    btnOpen.disabled = false;
    btnOpen.textContent = "Ouvrir un dossier";

    // Clic sur le bouton ouvrir
    btnOpen.addEventListener('click', openBooster);
});

// Fonction pour charger et transformer les données de full_data.json
async function loadAidsData() {
    try {
        const response = await fetch('full_data.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        
        // On transforme les résultats bruts en "Cartes" pour le jeu
        aidsDatabase = data.results.map(aid => {
            // 1. Nettoyage de la description (enlever les balises HTML <p>, <ul>, etc.)
            const tmpDiv = document.createElement("div");
            tmpDiv.innerHTML = aid.description;
            let cleanDesc = tmpDiv.textContent || tmpDiv.innerText || "";
            cleanDesc = cleanDesc.substring(0, 120) + (cleanDesc.length > 120 ? "..." : "");

            // 2. Détermination de la catégorie principale pour l'emoji
            const categoryString = (aid.categories && aid.categories.length > 0) 
                ? aid.categories[0] 
                : "Autre";
            
            // 3. Génération des stats de jeu (Gamification)
            // Comme le JSON n'a pas de "rareté" ou de "coût", on les génère aléatoirement
            // ou basés sur des mots clés pour rendre le jeu fun.
            const rarity = determineRarity(); 
            const cost = Math.floor(Math.random() * 200) + 10; // Coût administratif (mana)
            // On utilise un budget fictif si non présent, ou basé sur des montants s'ils existaient
            const budget = Math.floor(Math.random() * 5000000) + 10000; 

            return {
                id: aid.id.toString(), // On garde l'ID unique de l'API
                name: aid.name,
                description: cleanDesc,
                category: categoryString,
                cost: cost,
                budget: budget,
                rarity: rarity,
                image: getCategoryEmoji(categoryString)
            };
        });

        console.log(`Base de données chargée avec succès : ${aidsDatabase.length} aides disponibles.`);

    } catch (error) {
        console.error("Impossible de charger les données :", error);
        revealArea.innerHTML = "<p style='color:white'>Erreur de chargement des données. Vérifiez que full_data.json est bien présent.</p>";
    }
}

// Fonction utilitaire pour attribuer une rareté aléatoire (Poids de tirage)
function determineRarity() {
    const rand = Math.random() * 100;
    if (rand < 60) return 1;       // Commune
    else if (rand < 85) return 2;  // Peu Commune
    else if (rand < 98) return 3;  // Rare
    else return 4;                 // Légendaire
}

// Fonction utilitaire pour attribuer un emoji selon la catégorie
function getCategoryEmoji(categoryStr) {
    const cat = categoryStr.toLowerCase();
    if (cat.includes("sport")) return "⚽";
    if (cat.includes("culture") || cat.includes("art") || cat.includes("patrimoine")) return "🎭";
    if (cat.includes("eau") || cat.includes("mer")) return "🌊";
    if (cat.includes("énergie") || cat.includes("environnement") || cat.includes("climat")) return "🌱";
    if (cat.includes("jeunesse") || cat.includes("éducation") || cat.includes("scolaire")) return "🎓";
    if (cat.includes("santé") || cat.includes("soin")) return "🏥";
    if (cat.includes("agriculture") || cat.includes("forêt")) return "🚜";
    if (cat.includes("numérique") || cat.includes("tech")) return "💻";
    if (cat.includes("urbanisme") || cat.includes("logement")) return "🏗️";
    if (cat.includes("entreprise") || cat.includes("économi")) return "💼";
    return "🏛️"; // Emoji par défaut (Administration)
}

// Fonction d'ouverture de booster
function openBooster() {
    if (aidsDatabase.length === 0) {
        alert("Les données ne sont pas encore chargées.");
        return;
    }

    if (revealArea.innerHTML !== "") {
        revealArea.innerHTML = "";
    }

    boosterPack.classList.add('opening');
    btnOpen.disabled = true;
    btnOpen.textContent = "Ouverture en cours...";

    setTimeout(() => {
        boosterPack.classList.remove('opening');
        generateBoosterContent();
        btnOpen.disabled = false;
        btnOpen.textContent = "Ouvrir un autre dossier";
    }, 1000);
}

// Générer 5 cartes aléatoires
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

// Tirer une carte au hasard dans la base chargée
function drawRandomCard() {
    // On détermine d'abord la rareté qu'on veut obtenir pour ce tirage
    // Cela permet de garder la logique de "chance" même avec 3000 cartes
    const targetRarity = determineRarity();

    // On filtre la base pour ne garder que les cartes de cette rareté
    // (Note : comme on génère la rareté aléatoirement au chargement, la distribution est homogène)
    const pool = aidsDatabase.filter(aid => aid.rarity === targetRarity);
    
    // Sécurité si le pool est vide
    const finalPool = pool.length > 0 ? pool : aidsDatabase;

    // On prend une carte au hasard dans ce sous-ensemble
    const randomIndex = Math.floor(Math.random() * finalPool.length);
    return finalPool[randomIndex];
}

// Affichage des cartes (Similaire à avant, mais adapté aux nouvelles données)
function displayCards(cards) {
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card`;
        
        // Effet de retournement au clic
        cardElement.onclick = () => cardElement.classList.toggle('flipped');

        // Délai d'apparition
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
        
        setTimeout(() => {
            cardElement.classList.add('flipped');
        }, 500 + (index * 300));
    });
}

// Mise à jour de l'interface de collection
function updateCollectionUI() {
    collectionGrid.innerHTML = "";
    
    // On n'affiche que les cartes possédées pour éviter d'afficher les 3000 vides
    // Ou alors on affiche un résumé. Ici, affichons la liste des acquis.
    const ownedIds = Object.keys(userCollection);
    
    if (ownedIds.length === 0) {
        collectionGrid.innerHTML = "<p style='color:#888; width:100%; text-align:center;'>Votre classeur est vide.</p>";
        return;
    }

    // Pour afficher les infos, on doit retrouver l'objet dans aidsDatabase
    // Si la base n'est pas encore chargée (ex: chargement initial), on attend
    if (aidsDatabase.length === 0) return;

    // On trie par nom pour que ce soit propre
    const ownedCards = ownedIds.map(id => aidsDatabase.find(aid => aid.id === id)).filter(x => x !== undefined);
    
    ownedCards.forEach(aid => {
        const count = userCollection[aid.id];
        const div = document.createElement('div');
        div.className = `collection-item owned rarity-${aid.rarity}`; // Ajout classe rareté pour style
        div.innerHTML = `
            <span style="font-size:1.2rem">${aid.image}</span>
            <strong>${aid.name}</strong><br>
            <small>Quantité : ${count}</small>
        `;
        collectionGrid.appendChild(div);
    });
    
    // Ajout d'un compteur total
    const totalHeader = document.querySelector('.collection-section h3');
    if(totalHeader) totalHeader.innerText = `Votre Classeur (${ownedIds.length} aides uniques collectées)`;
}

function formatBudget(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + " Md€";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + " M€";
    if (num >= 1000) return (num / 1000).toFixed(1) + " k€";
    return num + " €";
}
