# Le Biscotto Nancy

Site vitrine one-page pour un restaurant italien fictif ("institution nancéienne
depuis 1962" — histoire et distinctions inventées pour la démonstration), créé
comme template premium réutilisable pour la vente de sites vitrines à des
clients (restaurants, salons, artisans...).

## Stack
- HTML / CSS / JS vanilla (pas de framework, pas de dépendance de build)
- Responsive (mobile-first), animations au scroll respectant `prefers-reduced-motion`
- Design system : palette "Nature Distilled" (terracotta / argile / olive / crème) et
  typographie Playfair Display SC + Karla, générés avec le skill `ui-ux-pro-max`

## Structure
- `index.html` — contenu et structure : hero, frise chronologique, plat signature,
  menu, portrait du chef, galerie avec lightbox, avis, formulaire de réservation,
  contact
- `style.css` — design system (tokens couleur/typo, composants, responsive)
- `script.js` — menu mobile, navbar au scroll, parallax du hero, compteurs
  animés, lightbox galerie, scrollspy nav, formulaire de réservation (mailto)

## À personnaliser avant mise en production
- Frise chronologique, mentions presse et adresse e-mail du formulaire
  (`contact@lebiscotto-nancy.fr`) sont des exemples à remplacer
- Le formulaire de réservation ouvre le client mail du visiteur ; à connecter
  à un vrai système de réservation si besoin

## Déploiement
Voir les instructions de déploiement Vercel fournies séparément.
