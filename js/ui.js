export function creerCarte(p) {
  const article = document.createElement("article");
  article.classList.add("carte");
  article.dataset.code = p.code;
  article.tabIndex = 0;

  const titre = document.createElement("h3");
  titre.textContent = p.nom;

  const capitale = document.createElement("p");
  capitale.textContent = `Capitale : ${p.capitale}`;

  const region = document.createElement("p");
  region.textContent = `Région : ${p.region}`;

  const population = document.createElement("p");
  population.textContent = `Population : ${p.population.toLocaleString("fr-FR")}`;

  article.append(titre, capitale, region, population);
  return article;
}

export function afficherListe(liste, conteneur) {
  const frag = document.createDocumentFragment();
  liste.forEach((p) => frag.append(creerCarte(p)));
  conteneur.replaceChildren(frag);
}

export function afficherDetail(p, zoneDetail) {
  zoneDetail.textContent = "";

  const titre = document.createElement("h3");
  titre.textContent = p.nom;

  const infos = document.createElement("p");
  infos.textContent = `${p.capitale} — ${p.region} — ${p.population.toLocaleString("fr-FR")} habitants`;

  zoneDetail.append(titre, infos);
  zoneDetail.hidden = false;
}
