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
    btnOpen.disabled = true;
    btnOpen.textContent = "Chargement des aides...";

    await loadAidsData(); // Chargement des données réelles
    updateCollectionUI();
    
    btnOpen.disabled = false;
    btnOpen.textContent = "Ouvrir un dossier";

    // Clic sur le bouton ouvrir
    btnOpen.addEventListener('click', openBooster);
});

// Fonction pour charger et transformer les données de clean_data.json
async function loadAidsData() {
    try {
        const response = await fetch('clean_data.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        
        // On transforme les résultats bruts en "Cartes" pour le jeu
        aidsDatabase = data.results.map(aid => {
            const tmpDiv = document.createElement("div");
            tmpDiv.innerHTML = aid.description;
            let cleanDesc = tmpDiv.textContent || tmpDiv.innerText || "";
            
            // Nettoyage du texte des motifs indésirables ("🚩" et tirets)
            cleanDesc = cleanDesc.replace(/🚩\s*/g, ''); 
            cleanDesc = cleanDesc.replace(/[\s\r\n]*_{50,}[\s\r\n]*/g, ' ').trim();

            // *** IMPORTANT ***
            // Nous ne tronquons plus la description ici, pour que le modal utilise le texte complet.
            // Le CSS s'occupera de la troncature pour l'affichage miniature.

            const categoryString = (aid.categories && aid.categories.length > 0) 
                ? aid.categories[0] 
                : "Autre";
            
            const rarity = determineRarity(); 
            const cost = Math.floor(Math.random() * 200) + 10;
            const budget = Math.floor(Math.random() * 5000000) + 10000; 

            return {
                id: aid.id.toString(),
                name: aid.name,
                // Stocke la description complète et nettoyée
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
        revealArea.innerHTML = "<p style='color:white'>Erreur de chargement des données. Vérifiez que clean_data.json est bien présent.</p>";
    }
}

// Fonction utilitaire pour attribuer une rareté aléatoire (Poids de tirage)
function determineRarity() {
    const rand = Math.random() * 100;
    if (rand < 60) return 1;
    else if (rand < 85) return 2;
    else if (rand < 98) return 3;
    else return 4;
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
    return "🏛️";
}

// Fonction d'ouverture de booster (Reste inchangée)
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

// Générer 5 cartes aléatoires (Reste inchangée)
function generateBoosterContent() {
    const boosterCards = [];
    
    for (let i = 0; i < 5; i++) {
        const card = drawRandomCard();
        boosterCards.push(card);
        
        if (!userCollection[card.id]) {
            userCollection[card.id] = 0;
        }
        userCollection[card.id]++;
    }
    
    localStorage.setItem('republicPocketCollection', JSON.stringify(userCollection));
    updateCollectionUI();
    
    displayCards(boosterCards);
}

// Tirer une carte au hasard dans la base chargée (Reste inchangée)
function drawRandomCard() {
    const targetRarity = determineRarity();
    const pool = aidsDatabase.filter(aid => aid.rarity === targetRarity);
    const finalPool = pool.length > 0 ? pool : aidsDatabase;
    const randomIndex = Math.floor(Math.random() * finalPool.length);
    return finalPool[randomIndex];
}

// Affichage des cartes nouvellement tirées
function displayCards(cards) {
    // ... dans la fonction displayCards(cards)
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card`;
    
        // Attache l'événement de clic pour le modal
        cardElement.onclick = (e) => {
            e.stopPropagation(); 
            showFullCardDetails(card);
        };
    
        // *** NOUVEAU : Gestion des effets visuels au survol ***
        cardElement.addEventListener('mousemove', handleCardMove);
        cardElement.addEventListener('mouseleave', handleCardLeave);
        // Pour le mobile :
        cardElement.addEventListener('touchmove', handleCardMove);
        cardElement.addEventListener('touchend', handleCardLeave);
        // *** FIN NOUVEAU ***

        // Délai d'apparition
        cardElement.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
    
        // ... (Le innerHTML du cardElement reste inchangé) ...
        // Note : Pensez à adapter l'innerHTML avec votre dernière version si elle a changé
    
        cardElement.innerHTML = `
            <div class="card-face card-back">
                RF
            </div>
            <div class="card-face card-front rarity-${card.rarity}">
                ${(card.rarity >= 3) ? '<div class="card-glow"></div>' : ''} <div class="card-title">${card.name}</div>
                <div class="card-image">${card.image}</div>
                <div class="card-desc">${card.description}</div>
                <div class="card-stats">
                    <span>⚔️ ${card.cost}</span>
                    <span>❤️ ${formatBudget(card.budget)}</span>
                </div>
            </div>
        `;
        revealArea.appendChild(cardElement);
    
        // Flip initial pour l'effet "wow"
        setTimeout(() => {
            cardElement.classList.add('flipped');
        }, 500 + (index * 300));
    });
}

// Mise à jour de l'interface de collection
function updateCollectionUI() {
    
    collectionGrid.innerHTML = "";
    
    const ownedIds = Object.keys(userCollection);
    const throttledMove = throttle(handleCardMove, 16);
    
    if (ownedIds.length === 0) {
        collectionGrid.innerHTML = "<p style='color:#888; width:100%; text-align:center;'>Votre classeur est vide.</p>";
        return;
    }

    if (aidsDatabase.length === 0) return;

    const ownedCards = ownedIds
        .map(id => aidsDatabase.find(aid => aid.id === id))
        .filter(x => x !== undefined);
    
    ownedCards.forEach(aid => {
        const count = userCollection[aid.id];
        const div = document.createElement('div');
        div.className = `collection-item owned rarity-${aid.rarity}`; 
        
        // *** NOUVEAU *** : Attache l'événement pour ouvrir le modal depuis la collection
        div.onclick = (e) => {
            e.stopPropagation();
            showFullCardDetails(aid);
        };
        // *** FIN NOUVEAU ***

        // *** NOUVEAU : Gestion des effets visuels au survol ***
        div.addEventListener('mousemove', throttledMove);
        div.addEventListener('mouseleave', handleCardLeave);
        // Pour le mobile :
        div.addEventListener('touchmove', throttledMove);
        div.addEventListener('touchend', handleCardLeave);
        // *** FIN NOUVEAU ***

        div.innerHTML = `
            <div class="card-face card-front rarity-${aid.rarity}" style="transform: rotateY(180deg); position:relative;">
                ${(aid.rarity >= 3) ? '<div class="card-glow"></div>' : ''}
                <span class="card-image" style="font-size:1.2rem">${aid.image}</span>
                <strong class="card-title">${aid.name}</strong><br>
                <small>Quantité : ${count}</small>
                </div>
            <div class="card-face card-back" style="transform: rotateY(0deg);"></div>
        `;
        collectionGrid.appendChild(div);
    });
    
    const totalHeader = document.querySelector('.collection-section h3');
    if(totalHeader) totalHeader.innerText = `Votre Classeur (${ownedIds.length} aides uniques collectées)`;
}


// *** NOUVELLE FONCTION ***
// Gère l'affichage de la carte agrandie (le modal)
function showFullCardDetails(cardData) {
    // ... au début de showFullCardDetails
    document.body.classList.add('modal-open');
    // Si un modal est déjà ouvert, on ne fait rien ou on le ferme d'abord (ici on suppose qu'il n'y en a qu'un)
    if (document.getElementById('full-card-overlay')) return;

    // 1. Création de l'overlay (fond noir transparent)
    const overlay = document.createElement('div');
    overlay.id = 'full-card-overlay';
    overlay.className = 'full-card-overlay';
    
    // 2. Création de la carte agrandie
    const fullCard = document.createElement('div');
    // On utilise les classes 'card' et 'rarity-X' pour garder le style de base
    fullCard.className = `card full-card rarity-${cardData.rarity}`;

    // On injecte le HTML de la carte agrandie (avec la description complète)
    fullCard.innerHTML = `
        <div class="card-face card-front full-card-content">
            <span class="full-card-image">${cardData.image}</span>
            <div class="full-card-title">${cardData.name}</div>
            
            <div class="full-card-desc-full">
                ${cardData.description}
            </div>
            
            <div class="full-card-stats">
                <span>⚔️ Coût administratif: ${cardData.cost}</span>
                <span>❤️ Budget estimé: ${formatBudget(cardData.budget)}</span>
            </div>
            <div class="full-card-category">Catégorie principale: ${cardData.category}</div>
        </div>
    `;

    // 3. Assemblage et affichage
    overlay.appendChild(fullCard);
    document.body.appendChild(overlay);

    // 4. Fermeture : Un clic sur l'overlay (à l'extérieur de la carte) ferme le modal
    overlay.addEventListener('click', (e) => {
        // e.target est l'élément sur lequel le clic a eu lieu
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            document.body.classList.remove('modal-open');
        }
    });
}
// *** FIN NOUVELLE FONCTION ***

function formatBudget(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + " Md€";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + " M€";
    if (num >= 1000) return (num / 1000).toFixed(1) + " k€";
    return num + " €";
}

// Fonction pour calculer et appliquer la rotation 3D
function handleCardMove(event) {
    const card = event.currentTarget; // La carte sur laquelle la souris est
    const rect = card.getBoundingClientRect(); // Position et taille de la carte

    // Calcule la position X et Y de la souris (ou du doigt) par rapport à la carte
    let clientX, clientY;
    if (event.touches) {
        // Pour les appareils mobiles (touch)
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        // Pour la souris
        clientX = event.clientX;
        clientY = event.clientY;
    }

    // 1. Calcul des coordonnées par rapport au centre de la carte (de -0.5 à 0.5)
    // offsetX/Y : position de la souris dans la carte (0 à width/height)
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    // center_x / center_y : position relative au centre (de -0.5 à 0.5)
    const center_x = (offsetX / rect.width) - 0.5; 
    const center_y = (offsetY / rect.height) - 0.5;

    // 2. Calcul de l'angle de rotation
    // Plus la souris est à droite, plus rotateY doit être positif (et inversement).
    // Plus la souris est en bas, plus rotateX doit être négatif (et inversement).
    // On utilise 10 degrés maximum pour un effet subtil.
    const rotateY = center_x * 20; // Multiplié par 20 (max 10 deg)
    const rotateX = center_y * -20; // Négatif pour que le bas penche vers l'arrière

    // Détermine si la carte doit être retournée (180°) ou non (0°)
    let flipRotation = 'rotateY(0deg)';
    if (card.classList.contains('flipped')) {
        flipRotation = 'rotateY(180deg)'; 
    }
    // Note : Le .collection-item est considéré comme non-retourné (0deg)
    
    // 3. Application de la transformation
    // Note : On utilise la transformation 'translateZ' pour l'effet 3D de pop-out
    card.style.transform = `perspective(1000px) ${flipRotation} rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    
    // Ajout d'un effet de lumière (optionnel)
    const lightX = center_x * -50 + 50; // Position du spot lumineux (0-100%)
    const lightY = center_y * -50 + 50; 
    card.style.boxShadow = `
        ${-center_x * 10}px ${-center_y * 10}px 15px rgba(0, 0, 0, 0.5),
        inset ${lightX}% ${lightY}% 50px rgba(255, 255, 255, 0.15)
    `;

    // *** NOUVEAU : Met à jour les variables CSS pour l'effet de brillance ***
    // Seules les cartes rares (rareté 3 et 4) auront un effet de brillance dynamique
    if (card.classList.contains('rarity-3') || card.classList.contains('rarity-4')) {
        const glowElement = card.querySelector('.card-glow');
        if (glowElement) {
            // Positionne le centre de la brillance
            glowElement.style.setProperty('--mouse-x', `${offsetX}px`);
            glowElement.style.setProperty('--mouse-y', `${offsetY}px`);
        }
    }
}

// Fonction pour réinitialiser la rotation
function handleCardLeave(event) {
const card = event.currentTarget;
    
    // Détermine si la carte doit être retournée (180°) ou non (0°)
    let flipRotation = 'rotateY(0deg)';
    if (card.classList.contains('flipped')) {
        flipRotation = 'rotateY(180deg)'; 
    }
    
    // *** LIGNE CORRIGÉE : On ajoute flipRotation ***
    // Réinitialise l'effet de mouvement tout en conservant l'état retourné
    card.style.transform = `perspective(1000px) ${flipRotation} scale(1)`;
    card.style.boxShadow = '';

    // *** NOUVEAU : Réinitialise les variables CSS pour l'effet de brillance ***
    // (Non strictement nécessaire car l'opacité passe à 0, mais bonne pratique)
    const glowElement = card.querySelector('.card-glow');
    if (glowElement) {
        glowElement.style.setProperty('--mouse-x', `50%`); // Revient au centre
        glowElement.style.setProperty('--mouse-y', `50%`);
    }
}
