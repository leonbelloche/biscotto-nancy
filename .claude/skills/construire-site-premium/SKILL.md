---
name: construire-site-premium
description: "Installe la stack complète pour créer des sites web professionnels avec l'IA : UI/UX Pro Max, animations Framer Motion, et composants 21st.dev. Un skill, trois outils, zéro expérience en code requise."
---

# Construire Site Premium

Ce skill te guide pas à pas pour installer tout ce qu'il faut pour créer des sites web professionnels et animés avec Claude Code. Aucune expérience en code requise.

## Ce qui est installé

| Outil | Ce qu'il fait |
|-------|--------------|
| **UI/UX Pro Max** | Donne à Claude accès à 50+ styles design, 161 palettes de couleurs, 57 associations de polices. Tes sites ont l'air designés, pas générés. |
| **Framer Motion** | Ajoute des animations fluides : transitions de pages, effets au survol, révélations au scroll. Tes sites prennent vie. |
| **21st.dev Magic** | Une bibliothèque de 100+ composants React soignés que Claude peut utiliser. Des blocs prêts pour la production. |

## Fonctionnement

Quand ce skill est déclenché, guide l'utilisateur étape par étape. Sois encourageant et clair, pars du principe qu'il n'a aucune expérience en code. Si une étape échoue, ne t'arrête pas. Reconnais le problème, donne la commande manuelle, et continue.

### Étape 1 : Vérifier les prérequis

> Avant de commencer, je vérifie que tu as tout ce qu'il nous faut.

Lance cette commande silencieusement :
```bash
node --version 2>&1 && npm --version 2>&1
```

- Si Node.js est installé → dis "C'est bon, Node.js est installé. On y va."
- Si Node.js N'est PAS installé → dis :

> Tu as besoin de Node.js d'abord. Va sur https://nodejs.org et télécharge la version LTS. Installe-la, redémarre ton terminal, puis reviens et tape `/construire-site-premium`. Ça prend 2 minutes.

Arrête-toi ici si Node est absent.

### Étape 2 : Installer UI/UX Pro Max

> **Étape 1 sur 3 : UI/UX Pro Max**
>
> Ça donne à Claude une immense bibliothèque de design : 50+ styles, 161 palettes de couleurs, 57 associations de polices. Quand tu me demandes de créer un site, je pioche dans un vrai système de design au lieu de deviner. C'est pour ça que le résultat ne ressemble pas à du contenu AI générique.
>
> Installation en cours...

Lance :
```bash
npm install -g uipro-cli 2>&1
```

Puis :
```bash
uipro init --ai claude 2>&1
```

- En cas de succès → "UI/UX Pro Max est installé. Ta stack design est prête."
- En cas d'échec → "Petit problème. Tu peux réessayer manuellement plus tard : `npm install -g uipro-cli && uipro init --ai claude`. On continue."

### Étape 3 : Installer le Skill Framer Motion

> **Étape 2 sur 3 : Framer Motion**
>
> Ça m'apprend à ajouter de vraies animations à tes sites : transitions de pages fluides, effets au survol, révélations au scroll. Ce qui fait passer un site de 500€ à 10 000€ visuellement.
>
> Installation en cours...

Lance :
```bash
claude install-skill https://github.com/secondsky/claude-skills -- --name motion 2>&1
```

- En cas de succès → "Framer Motion est installé. Tes sites auront de vraies animations maintenant."
- En cas d'échec → essaie la méthode de secours :
```bash
npx -y @lobehub/market-cli skills install secondsky-claude-skills-motion --agent claude-code 2>&1
```
- Si les deux échouent → "Impossible d'installer automatiquement. Tu peux essayer manuellement : `claude install-skill https://github.com/secondsky/claude-skills -- --name motion`. On passe à la suite."

### Étape 4 : Configurer 21st.dev Magic

> **Étape 3 sur 3 : Composants 21st.dev**
>
> Ça me connecte à une bibliothèque de 100+ composants React magnifiquement designés. Au lieu de tout construire from scratch, je pioche dans des blocs prêts pour la production : boutons, navbars, sections hero, cartes, footers, tous pre-designés et prêts à l'emploi.
>
> Celle-là nécessite une clé API gratuite. Voici comment l'obtenir :
>
> 1. Va sur **https://21st.dev/magic/console**
> 2. Crée un compte ou connecte-toi (c'est gratuit)
> 3. Copie ta clé API
> 4. Colle-la ici quand je te la demande

Attends que l'utilisateur fournisse sa clé API.

Une fois qu'il la donne, ajoute le serveur MCP à sa config Claude Code :

Lis `~/.claude.json`, trouve l'objet `mcpServers`, et ajoute :

```json
"21st-dev-magic": {
  "command": "npx",
  "args": ["-y", "@21st-dev/magic@latest"],
  "env": {
    "API_KEY": "SA_CLE_ICI"
  }
}
```

Après avoir écrit la config :

> 21st.dev Magic est connecté. Tu devras redémarrer Claude Code pour que ça prenne effet, ferme et réouvre simplement ton terminal quand on aura terminé.

### Étape 5 : C'est parti !

> **Tout est prêt.** Voici ce que tu viens d'installer :
>
> - **UI/UX Pro Max** : 50+ styles, 161 palettes, 57 associations de polices
> - **Framer Motion** : animations fluides et professionnelles
> - **21st.dev Magic** : 100+ composants prêts pour la production
>
> **Pour créer ton premier site, dis-moi simplement :**
> - Ce que fait ton business
> - À qui il s'adresse
> - L'ambiance que tu veux (sombre, minimaliste, audacieux, dynamique, etc.)
>
> Je m'occupe du reste. Essaie quelque chose comme :
>
> *"Crée-moi une landing page pour mon activité de coaching ciblant les entrepreneurs. Thème sombre, moderne, avec des animations."*
>
> **Important :** Redémarre Claude Code d'abord pour que 21st.dev se charge. Ensuite, on construit quelque chose.

## Règles
- Guide l'utilisateur étape par étape, UNE ÉTAPE À LA FOIS
- Ne balance jamais toutes les instructions d'un coup
- Si une installation échoue, ne t'arrête pas, reconnais le problème, donne la commande manuelle, continue
- Reste encourageant et détendu tout au long
- Pars du principe que l'utilisateur n'a aucune expérience en code
- Une fois tout installé, invite-le à créer son premier site
