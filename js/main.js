import { pays } from "./data.js";
import { afficherListe, afficherDetail } from "./ui.js";

const conteneur = document.querySelector("#resultats-liste");
const selectRegion = document.querySelector("#filtre-region");
const zoneDetail = document.querySelector("#detail");
const statut = document.querySelector("#statut-resultats");

function rendre(liste) {
  afficherListe(liste, conteneur);
  statut.textContent = `${liste.length} pays trouvés`;
}

rendre(pays);

selectRegion.addEventListener("change", () => {
  const valeur = selectRegion.value;
  const filtres =
    valeur === "toutes" ? pays : pays.filter((p) => p.region === valeur);
  rendre(filtres);
});

conteneur.addEventListener("click", (e) => {
  const carte = e.target.closest(".carte");
  if (!carte) return;

  const p = pays.find((x) => x.code === carte.dataset.code);
  if (p) afficherDetail(p, zoneDetail);
});
