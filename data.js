// data.js - Version Étendue
// Base de données des aides publiques (État, Régions, Départements, Sécu)
// Stats : 
// - Cost (Attaque) : Montant unitaire perçu par le bénéficiaire (est. moyenne)
// - Budget (PV) : Budget global annuel du dispositif pour l'État
// - Rarity : 1 (Commune), 2 (Peu Commune), 3 (Rare), 4 (Légendaire)

const aidsDatabase = [
    // ==========================================
    // ⚪ RARETÉ 1 : AIDES COMMUNES & PONCTUELLES
    // (Petits montants ou aides très ciblées)
    // ==========================================
    {
        id: "aid_c_01",
        name: "Pass Culture",
        description: "Crédit pour les activités culturelles des 15-18 ans.",
        category: "Jeunesse",
        cost: 300,
        budget: 260000000,
        rarity: 1,
        image: "🎭"
    },
    {
        id: "aid_c_02",
        name: "Pass'Sport",
        description: "Déduction de 50€ pour l'inscription dans un club sportif.",
        category: "Sport",
        cost: 50,
        budget: 100000000,
        rarity: 1,
        image: "⚽"
    },
    {
        id: "aid_c_03",
        name: "Chèque Énergie",
        description: "Aide au paiement des factures de gaz et d'électricité.",
        category: "Social",
        cost: 150,
        budget: 600000000,
        rarity: 1,
        image: "⚡"
    },
    {
        id: "aid_c_04",
        name: "Forfait Mobilités Durables",
        description: "Prise en charge par l'employeur/État des trajets vélo/covoiturage.",
        category: "Écologie",
        cost: 400,
        budget: 50000000,
        rarity: 1,
        image: "🚲"
    },
    {
        id: "aid_c_05",
        name: "Aide au Brevet (Bafa)",
        description: "Aide de la CAF pour financer la formation d'animateur.",
        category: "Jeunesse",
        cost: 200,
        budget: 15000000,
        rarity: 1,
        image: "⛺"
    },
    {
        id: "aid_c_06",
        name: "Chèque Eau (Communal)",
        description: "Aide sociale facultative gérée par les CCAS des communes.",
        category: "Commune",
        cost: 50,
        budget: 5000000,
        rarity: 1,
        image: "💧"
    },
    {
        id: "aid_c_07",
        name: "Prime Vélo Électrique",
        description: "Aide à l'achat d'un vélo à assistance électrique.",
        category: "Écologie",
        cost: 400,
        budget: 60000000,
        rarity: 1,
        image: "🔋"
    },
    {
        id: "aid_c_08",
        name: "Allocation de Rentrée Scolaire (ARS)",
        description: "Aide pour assumer le coût de la rentrée pour les enfants.",
        category: "Famille",
        cost: 400,
        budget: 2000000000,
        rarity: 1,
        image: "🎒"
    },
    {
        id: "aid_c_09",
        name: "Aide Juridictionnelle",
        description: "Prise en charge des frais de justice par l'État.",
        category: "Justice",
        cost: 400,
        budget: 620000000,
        rarity: 1,
        image: "⚖️"
    },
    {
        id: "aid_c_10",
        name: "Tarif Social Cantine",
        description: "Repas à 1€ ou tarifs réduits selon le quotient familial.",
        category: "Commune",
        cost: 4,
        budget: 50000000, // Est. subventions
        rarity: 1,
        image: "🍽️"
    },

    // ==========================================
    // 🟢 RARETÉ 2 : AIDES PEU COMMUNES (RÉGIONS & SOCIAL)
    // (Aides structurantes du quotidien)
    // ==========================================
    {
        id: "aid_pc_01",
        name: "APL (Logement)",
        description: "L'aide la plus célèbre. Réduit le loyer des foyers modestes.",
        category: "Logement",
        cost: 220,
        budget: 15000000000,
        rarity: 2,
        image: "🏠"
    },
    {
        id: "aid_pc_02",
        name: "Prime d'Activité",
        description: "Complément de revenu pour les travailleurs à bas salaire.",
        category: "Travail",
        cost: 185,
        budget: 9000000000,
        rarity: 2,
        image: "💼"
    },
    {
        id: "aid_pc_03",
        name: "Bourse sur Critères Sociaux",
        description: "Aide du CROUS pour les étudiants.",
        category: "Études",
        cost: 500,
        budget: 2300000000,
        rarity: 2,
        image: "🎓"
    },
    {
        id: "aid_pc_04",
        name: "Aide Permis (Région IdF)",
        description: "Aide spécifique de la région Île-de-France pour le permis.",
        category: "Région",
        cost: 1300,
        budget: 15000000,
        rarity: 2,
        image: "🚗"
    },
    {
        id: "aid_pc_05",
        name: "MaPrimeRénov'",
        description: "Financement des travaux de rénovation énergétique.",
        category: "Logement",
        cost: 3000,
        budget: 2500000000,
        rarity: 2,
        image: "🔨"
    },
    {
        id: "aid_pc_06",
        name: "Continuité Territoriale",
        description: "Aide au voyage pour les résidents d'Outre-mer et Corse.",
        category: "Région",
        cost: 400,
        budget: 45000000,
        rarity: 2,
        image: "✈️"
    },
    {
        id: "aid_pc_07",
        name: "APA (Autonomie)",
        description: "Allocation Personnalisée d'Autonomie pour les personnes âgées (Département).",
        category: "Département",
        cost: 600,
        budget: 6000000000,
        rarity: 2,
        image: "👵"
    },
    {
        id: "aid_pc_08",
        name: "PCH (Handicap)",
        description: "Prestation de Compensation du Handicap (Département).",
        category: "Département",
        cost: 900,
        budget: 2000000000,
        rarity: 2,
        image: "🦾"
    },
    {
        id: "aid_pc_09",
        name: "Bonus Écologique Auto",
        description: "Aide à l'achat d'une voiture électrique neuve.",
        category: "Écologie",
        cost: 5000,
        budget: 1000000000,
        rarity: 2,
        image: "🚙"
    },
    {
        id: "aid_pc_10",
        name: "Allocations Familiales",
        description: "Versées à partir du 2ème enfant. Un classique de la CAF.",
        category: "Famille",
        cost: 140,
        budget: 12000000000,
        rarity: 2,
        image: "👨‍👩‍👧‍👦"
    },
    {
        id: "aid_pc_11",
        name: "Garantie Jeunes (CEJ)",
        description: "Contrat d'Engagement Jeune : allocation + accompagnement.",
        category: "Travail",
        cost: 520,
        budget: 600000000,
        rarity: 2,
        image: "🤝"
    },

    // ==========================================
    // 🟣 RARETÉ 3 : AIDES RARES (MINIMA SOCIAUX & BUSINESS)
    // (Les filets de sécurité et soutiens BPI)
    // ==========================================
    {
        id: "aid_r_01",
        name: "RSA",
        description: "Revenu de Solidarité Active. Le dernier filet de sécurité.",
        category: "Solidarité",
        cost: 607,
        budget: 15000000000, // Financé par Départements
        rarity: 3,
        image: "🛡️"
    },
    {
        id: "aid_r_02",
        name: "AAH",
        description: "Allocation aux Adultes Handicapés. Garantie de ressources.",
        category: "Solidarité",
        cost: 971,
        budget: 11000000000,
        rarity: 3,
        image: "♿"
    },
    {
        id: "aid_r_03",
        name: "ASPA (Min. Vieillesse)",
        description: "Allocation de Solidarité aux Personnes Âgées.",
        category: "Retraite",
        cost: 961,
        budget: 3500000000,
        rarity: 3,
        image: "👴"
    },
    {
        id: "aid_r_04",
        name: "Bourse French Tech",
        description: "Subvention Bpifrance pour les startups en création.",
        category: "Entreprise",
        cost: 30000, // Gros montant unitaire
        budget: 50000000, // Petit budget global = Rare
        rarity: 3,
        image: "🚀"
    },
    {
        id: "aid_r_05",
        name: "Aide Embauche Alternant",
        description: "Prime pour l'entreprise qui recrute un apprenti.",
        category: "Entreprise",
        cost: 6000,
        budget: 4000000000,
        rarity: 3,
        image: "🔧"
    },
    {
        id: "aid_r_06",
        name: "ARE (Chômage)",
        description: "Allocation d'Aide au Retour à l'Emploi (Unédic).",
        category: "Assurance",
        cost: 1100,
        budget: 35000000000,
        rarity: 3,
        image: "📉"
    },
    {
        id: "aid_r_07",
        name: "Défiscalisation Mécénat",
        description: "Réduction d'impôt pour les dons aux associations.",
        category: "Fiscalité",
        cost: 1000, // Variable
        budget: 1600000000,
        rarity: 3,
        image: "❤️"
    },
    {
        id: "aid_r_08",
        name: "Dotation Jeune Agriculteur",
        description: "Aide à l'installation pour les nouveaux agriculteurs.",
        category: "Agriculture",
        cost: 20000,
        budget: 70000000,
        rarity: 3,
        image: "🚜"
    },

    // ==========================================
    // 🟡 RARETÉ 4 : LÉGENDAIRES (STATE LEVEL & MACRO-ECO)
    // (Les milliards de l'État, Fiscalité lourde, Plans massifs)
    // ==========================================
    {
        id: "aid_l_01",
        name: "Crédit Impôt Recherche (CIR)",
        description: "Le moteur fiscal de la R&D française. Très puissant.",
        category: "Entreprise",
        cost: 150000, // Très grosse attaque (montant par entreprise)
        budget: 7000000000,
        rarity: 4,
        image: "💎"
    },
    {
        id: "aid_l_02",
        name: "Exonérations Fillon",
        description: "Allègements généraux de cotisations. Le 'Boss' du budget.",
        category: "Entreprise",
        cost: 500, // Petit montant unitaire mais...
        budget: 70000000000, // ...PV infinis !
        rarity: 4,
        image: "👑"
    },
    {
        id: "aid_l_03",
        name: "PAC (Politique Agricole)",
        description: "Subventions européennes gérées par l'État pour l'agriculture.",
        category: "Agriculture",
        cost: 30000,
        budget: 9000000000,
        rarity: 4,
        image: "🌾"
    },
    {
        id: "aid_l_04",
        name: "Plan France 2030",
        description: "Plan d'investissement massif pour l'industrie du futur.",
        category: "Investissement",
        cost: 1000000, // Gigantesque
        budget: 54000000000, // Budget pluriannuel
        rarity: 4,
        image: "🇫🇷"
    },
    {
        id: "aid_l_05",
        name: "Remboursement Soins (Sécu)",
        description: "La base du système. Prise en charge maladie universelle.",
        category: "Santé",
        cost: 300,
        budget: 200000000000, // Le monstre sacré (ONIAM + CPAM)
        rarity: 4,
        image: "🏥"
    },
    {
        id: "aid_l_06",
        name: "CITE / MaPrimeRénov Global",
        description: "L'ensemble du dispositif de transition énergétique.",
        category: "Écologie",
        cost: 4000,
        budget: 3500000000,
        rarity: 4,
        image: "🌍"
    },
    {
        id: "aid_l_07",
        name: "PGE (Prêt Garanti État)",
        description: "L'État se porte garant pour sauver les entreprises (Carte Historique).",
        category: "Finance",
        cost: 50000,
        budget: 140000000000, // Montant garanti
        rarity: 4,
        image: "🏦"
    }
];
