import { chargerRegion, chercherPays } from "./api.js";
import { afficherListe, afficherDetail } from "./ui.js";

const conteneur = document.querySelector("#resultats-liste");
const selectRegion = document.querySelector("#filtre-region");
const zoneDetail = document.querySelector("#detail");
const statut = document.querySelector("#statut-resultats");
const champRecherche = document.querySelector("#pays");
const formulaire = document.querySelector("#recherche form");

let listeActuelle = [];

function afficherChargement() {
  statut.textContent = "Chargement…";
  conteneur.replaceChildren();
}

function afficherErreur(message, callbackReessayer) {
  conteneur.replaceChildren();

  const p = document.createElement("p");
  p.textContent = message;

  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.textContent = "Réessayer";
  bouton.addEventListener("click", callbackReessayer);

  conteneur.append(p, bouton);
  statut.textContent = message;
}

function rendre(liste) {
  listeActuelle = liste;

  if (liste.length === 0) {
    conteneur.replaceChildren();
    statut.textContent = "0 pays trouvé";
    return;
  }

  afficherListe(liste, conteneur);
  statut.textContent = `${liste.length} pays trouvés`;
}

async function chargerInitial() {
  afficherChargement();
  try {
    const liste = await chargerRegion("Europe");
    rendre(liste);
  } catch (err) {
    afficherErreur(
      "Impossible de charger les pays. Vérifiez votre connexion.",
      chargerInitial,
    );
  }
}

async function lancerRecherche(nom) {
  afficherChargement();
  try {
    const liste = await chercherPays(nom);
    rendre(liste);
  } catch (err) {
    afficherErreur("Aucun résultat ou erreur réseau.", () =>
      lancerRecherche(nom),
    );
  }
}

chargerInitial();

let minuteur;
champRecherche.addEventListener("input", () => {
  clearTimeout(minuteur);
  const valeur = champRecherche.value.trim();

  minuteur = setTimeout(() => {
    if (valeur.length >= 2) {
      lancerRecherche(valeur);
    } else if (valeur.length === 0) {
      chargerInitial();
    }
  }, 300);
});

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  clearTimeout(minuteur);
  const valeur = champRecherche.value.trim();
  if (valeur.length >= 2) lancerRecherche(valeur);
});

selectRegion.addEventListener("change", () => {
  const valeur = selectRegion.value;
  const filtres =
    valeur === "toutes"
      ? listeActuelle
      : listeActuelle.filter((p) => p.region === valeur);
  afficherListe(filtres, conteneur);
  statut.textContent = `${filtres.length} pays trouvés`;
});

conteneur.addEventListener("click", (e) => {
  const carte = e.target.closest(".carte");
  if (!carte) return;

  const p = listeActuelle.find((x) => x.code === carte.dataset.code);
  if (p) afficherDetail(p, zoneDetail);
});
