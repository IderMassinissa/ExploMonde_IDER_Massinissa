const BASE = "https://countries.dev";

function normaliser(brut) {
  return {
    code: brut.alpha2Code,
    nom: brut.name,
    capitale: brut.capital ?? "Non renseignée",
    region: brut.region ?? "Inconnue",
    population: brut.population ?? 0,
    drapeau: brut.flags?.svg ?? "",
  };
}

export async function chercherPays(nom) {
  const url = `${BASE}/name/${encodeURIComponent(nom)}`;
  const reponse = await fetch(url);

  if (!reponse.ok) {
    throw new Error(`Erreur HTTP ${reponse.status}`);
  }

  const donnees = await reponse.json();
  return donnees.map(normaliser);
}

export async function chargerRegion(region) {
  const url = `${BASE}/region/${encodeURIComponent(region)}`;
  const reponse = await fetch(url);

  if (!reponse.ok) {
    throw new Error(`Erreur HTTP ${reponse.status}`);
  }

  const donnees = await reponse.json();
  return donnees.map(normaliser);
}
