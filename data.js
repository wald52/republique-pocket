// data.js
// Une liste d'aides pour la démo.
// Rareté : 1 (Commune), 2 (Peu Commune), 3 (Rare), 4 (Légendaire/Secret)

const aidsDatabase = [
    // --- COMMUNES (Aides locales, petits montants) ---
    {
        id: "aid_001",
        name: "Pass Culture",
        description: "Crédit pour les activités culturelles des jeunes de 18 ans.",
        category: "Culture",
        cost: 300, // Puissance d'attaque
        budget: 200000000, // HP (Budget global approximatif)
        rarity: 1,
        image: "🎭"
    },
    {
        id: "aid_002",
        name: "Chèque Énergie",
        description: "Aide au paiement des factures d'énergie.",
        category: "Social",
        cost: 150,
        budget: 600000000,
        rarity: 1,
        image: "⚡"
    },
    {
        id: "aid_003",
        name: "Aide au permis de conduire",
        description: "Aide pour les apprentis majeurs.",
        category: "Transport",
        cost: 500,
        budget: 100000000,
        rarity: 1,
        image: "🚗"
    },
    
    // --- PEU COMMUNES (Aides classiques) ---
    {
        id: "aid_004",
        name: "APL (Aide Personnalisée au Logement)",
        description: "Réduit le montant du loyer.",
        category: "Logement",
        cost: 220,
        budget: 15000000000,
        rarity: 2,
        image: "🏠"
    },
    {
        id: "aid_005",
        name: "Prime d'Activité",
        description: "Complément de revenu pour les travailleurs modestes.",
        category: "Travail",
        cost: 180,
        budget: 9000000000,
        rarity: 2,
        image: "💼"
    },

    // --- RARES (Les piliers de l'Etat Providence) ---
    {
        id: "aid_006",
        name: "RSA (Revenu de Solidarité Active)",
        description: "Revenu minimum pour les personnes sans ressources.",
        category: "Solidarité",
        cost: 607,
        budget: 12000000000,
        rarity: 3,
        image: "🤝"
    },
    {
        id: "aid_007",
        name: "AAH (Alloc. Adultes Handicapés)",
        description: "Garantie de ressources pour les personnes handicapées.",
        category: "Santé",
        cost: 971,
        budget: 11000000000,
        rarity: 3,
        image: "♿"
    },

    // --- LÉGENDAIRES (Les aides massives aux entreprises/État) ---
    {
        id: "aid_008",
        name: "Crédit Impôt Recherche (CIR)",
        description: "Dispositif fiscal de soutien aux activités de R&D des entreprises.",
        category: "Entreprise",
        cost: 5000, // Très haute puissance
        budget: 7000000000,
        rarity: 4,
        image: "💎" // Dans le futur jeu, une carte brillante dorée
    },
    {
        id: "aid_009",
        name: "Exonérations Fillon",
        description: "Allègements généraux de cotisations sociales.",
        category: "Entreprise",
        cost: 8000,
        budget: 60000000000, // Le Boss final
        rarity: 4,
        image: "👑"
    }
];
