# TP2 - Défauts d'accessibilité corrigés

Reprise du TP1 pour corriger les problèmes d'accessibilité.

## Titre de page pas assez clair

Le title était juste "ExploMonde", ça dit pas ce que fait la page. Je l'ai changé pour "ExploMonde – Recherche de pays".

## Pas de lien d'évitement

Un utilisateur au clavier était obligé de passer par tout le menu avant d'arriver au contenu. J'ai ajouté un lien en tout début de page qui renvoie direct vers le main (#main-content).

## Résultats pas annoncés

Le texte "3 pays trouvés" ne serait pas lu par un lecteur d'écran si le contenu change (recherche dynamique plus tard). J'ai mis role="status" dessus pour que ce soit annoncé automatiquement.

## Navigation clavier

Testé en passant Tab sur toute la page : tous les liens, l'input et le bouton sont accessibles dans un ordre logique, rien ne bloque.

## Limite

Le lien d'évitement reste visible tout le temps alors qu'il devrait normalement être caché et n'apparaître qu'au focus. Mais comme le CSS est interdit dans ce TP je peux pas faire ce comportement, donc je le laisse visible en permanence pour l'instant.
