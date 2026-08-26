# Cadrage — Fonctionnalité Opportunité

Document de cadrage bout-en-bout. Il décrit l’existant, le métier, le modèle de données, le flux cible et un prompt prêt à coller dans une IA générative pour implémenter la fonctionnalité.

**Fichier :** `cadrage_opportuinité.md`  
**Projet :** KPANDJI AUTOMOBILES — Next.js (App Router) + Prisma + Clerk + PostgreSQL  
**Date :** 17 août 2026  
**Statut :** le modèle Prisma existe ; l’UI métier (admin + espace client) n’est pas encore branchée sur la base.

---

## 1. Intention du document

Ce cadrage sert deux usages :

1. **Alignement produit / technique** — une seule source de vérité sur ce qu’est une « opportunité » dans KPANDJI.
2. **Prompt d’implémentation** — section 12 à coller telle quelle dans une IA de code, avec le contexte des sections 2 à 11.

Ne pas confondre les deux couches du mot « opportunité » :

| Couche | Rôle | État actuel |
|---|---|---|
| **A. Vitrine publique** | Marketing. Présente deux programmes commerciaux (Sira, Privilège). | Implémentée (contenu statique). |
| **B. Espace membre** | Opérationnel. Une formule d’investissement / de rentabilité **assignée à un membre**, avec dates, versements et compte de virement. | Schéma Prisma prêt. Pages client en placeholder. Aucun écran admin. |

La fonctionnalité à construire est **la couche B**. La couche A reste le tunnel d’acquisition qui alimente la couche B.

---

## 2. Contexte métier KPANDJI

KPANDJI AUTOMOBILES commercialise des véhicules premium en Côte d’Ivoire, avec deux programmes publics :

### 2.1 Sira — flottes & institutions

- Cible : flottes (entreprises, institutions).
- Offre publique : `/sira`.
- Palier catalogue (contenu marketing, pas encore des formules DB) :
  - **Sira Bronze** — modèle BANCO, minimum 28 véhicules.
  - **Sira Argent** — modèle SOURALAI, minimum 30 véhicules.
  - **Sira Or** — modèle LATHAYE 1, minimum 30 véhicules.
- Lead : formulaire `SiraContact` → inbox admin `/admin/sira-message`.

### 2.2 Privilège — diaspora & particuliers

- Cible : particuliers, notamment diaspora.
- Offre publique : `/privilege`.
- Deux chemins marketing :
  1. **Acheter & rouler** — cash ou 6–24 mois.
  2. **Acheter & rentabiliser** — le véhicule entre dans la flotte élite ; KPANDJI gère ; le client perçoit **70 %** des revenus, KPANDJI **30 %**.
- Lead : formulaire `PrivilegeContact` → inbox admin `/admin/privilege-contact`.

### 2.3 Ce que « opportunité » signifie côté membre

Une fois le prospect devenu **membre approuvé**, une opportunité n’est plus une page marketing. C’est un **contrat opérationnel** :

- une **formule nommée** (`nomFormule`) ;
- une **période** (`dateDebutFormule` → `dateFin`) ;
- rattachée à **un utilisateur** ;
- de type **Prestige** ou **Sira** ;
- pouvant générer des **rémunérations** (versements) vers un **compte de virement**.

C’est ce contrat que l’admin crée et que le membre consulte dans `/client-prestige/opportunite`, `/client-prestige/souscription` et `/client-prestige/versement`.

---

## 3. Acteurs

| Acteur | Rôle Clerk / Prisma | Accès |
|---|---|---|
| **Visiteur** | Non authentifié | `/opportunities`, `/sira`, `/privilege`. Peut laisser un contact. |
| **Membre en attente** | `CLIENT_USER` + `PENDING` | Onboarding `/onboarding`. Pas d’espace client. |
| **Membre approuvé** | `CLIENT_USER` + `APPROVED` | Espace `/client-prestige/*`. Voit **ses** opportunités, souscriptions, versements. |
| **Admin** | `ADMIN` | Espace `/admin/*`. Invite, approuve, (cible) crée et assigne les opportunités, saisit les rémunérations. |

Règles d’auth déjà en place :

- `canAccessClientPrestigeRoute` : uniquement `CLIENT_USER` + `APPROVED`.
- `requireAdminUserId` : uniquement `ADMIN` (Clerk `publicMetadata.role === "admin"`).
- Layout client : `app/(users)/client-prestige/layout.tsx`.
- Layout admin : `app/(users)/admin/layout.tsx`.
- Middleware : `proxy.ts`.

Un admin **n’utilise pas** l’espace `/client-prestige`. Un membre **ne voit jamais** les opportunités des autres membres.

---

## 4. Parcours d’acquisition (déjà en place)

```
Visiteur
  → /opportunities  (cartes Sira + Privilège)
  → /sira  ou  /privilege
  → formulaire de contact (SiraContact / PrivilegeContact)
  → admin voit le lead (/admin/sira-message ou /admin/privilege-contact)
  → admin envoie une invitation (/admin/invitations)  [email + rôle CLIENT_USER]
  → le prospect s’inscrit via /sign-up?token=…
  → User créé (status PENDING)
  → onboarding / attente d’approbation
  → admin approuve (/admin/membres)
  → membre accède à /client-prestige  (redirige vers /client-prestige/opportunite)
```

À ce stade, **aucune opportunité n’est encore assignée**. C’est le trou fonctionnel à combler.

---

## 5. Modèle de données (source de vérité)

Fichier : `prisma/schema.prisma`.

### 5.1 Entités

```
User 1 ─── N PrestigeOpportunity
User 1 ─── N SiraOpportunity
User 1 ─── N CompteVirement
User 1 ─── N Renumeration

Opportunites 1 ─── N PrestigeOpportunity
Opportunites 1 ─── N SiraOpportunity

PrestigeOpportunity 1 ─── N Renumeration
SiraOpportunity     1 ─── N Renumeration
CompteVirement      1 ─── N Renumeration
```

### 5.2 `Opportunites` (conteneur)

Table mappée `Opportunites` (faute d’orthographe historique : **ne pas renommer** sans migration dédiée).

| Champ | Type | Sens |
|---|---|---|
| `id` | UUID | Identifiant du lot / dossier opportunité. |
| `createdAt` | DateTime | Date de création. |

C’est un **conteneur**. Il n’a pas de nom, ni de type. Il regroupe des lignes Prestige et/ou Sira créées ensemble (ex. un dossier d’affectation).

**Règle d’implémentation proposée :** à chaque assignation admin, créer **un** `Opportunites` puis **une** ligne `PrestigeOpportunity` **ou** `SiraOpportunity` (jamais les deux pour le même contrat). Un membre peut avoir plusieurs contrats, donc plusieurs `Opportunites`.

### 5.3 `PrestigeOpportunity` / `SiraOpportunity`

Structures **identiques**, tables séparées pour isoler les deux programmes.

| Champ | Type | Sens |
|---|---|---|
| `id` | UUID | Identifiant du contrat. |
| `nomFormule` | String | Nom métier de la formule (ex. `Acheter & rentabiliser — DJETRAN`, `Sira Or`). |
| `dateDebutFormule` | DateTime | Début de validité. |
| `dateFin` | DateTime | Fin de validité. |
| `userId` | UUID | Membre bénéficiaire (`User.id` Prisma, **pas** `clerkUserId`). |
| `opportunitesId` | UUID | Conteneur parent. |
| `createdAt` | DateTime | Horodatage. |

Cascade : suppression du `User` ou de l’`Opportunites` parent → suppression des contrats.

### 5.4 `CompteVirement`

Coordonnées de paiement du membre.

| Champ | Type | Sens |
|---|---|---|
| `id` | UUID | |
| `compteBancaire` | String | IBAN / RIB / n° de compte. |
| `numeroCarte` | String | N° de carte (données sensibles — voir §9). |
| `validiteCarte` | String | Validité (ex. `12/28`). |
| `userId` | UUID | Propriétaire. |
| `createdAt` | DateTime | |

Un membre peut avoir plusieurs comptes. Une rémunération pointe vers **un** compte.

### 5.5 `Renumeration` (typo historique de « Rémunération »)

Un versement effectué par KPANDJI vers le membre.

| Champ | Type | Sens |
|---|---|---|
| `id` | UUID | |
| `montant` | Decimal(12, 2) | Montant versé. |
| `datePayement` | DateTime | Date du paiement (typo `Payement` conservée). |
| `siraOpportunityId` | UUID? | Contrat Sira **ou** null. |
| `prestigeOpportunityId` | UUID? | Contrat Prestige **ou** null. |
| `compteVirementId` | UUID | Compte crédité. **Obligatoire.** `onDelete: Restrict`. |
| `userId` | UUID | Membre. Doit être le même que celui du contrat et du compte. |
| `createdAt` | DateTime | |

**Invariant métier (à faire respecter en API, pas encore en schema) :**

- exactement **un** des deux : `siraOpportunityId` XOR `prestigeOpportunityId` ;
- `userId` = `userId` du contrat ;
- `compteVirement.userId` = `userId` de la rémunération ;
- `montant` > 0.

`onDelete: SetNull` sur le contrat : si le contrat est supprimé, l’historique de paiement peut rester, orphelin. Préférer **interdire la suppression** d’un contrat qui a déjà des versements.

---

## 6. État actuel du code (ne pas casser)

### 6.1 Déjà implémenté

| Élément | Chemin |
|---|---|
| Page vitrine | `app/opportunities/page.tsx` + `components/kp/OpportunitiesPageContent.tsx` |
| Lien header public | `components/kp/KpHeader.tsx` → `/opportunities` |
| Pages programmes | `/sira`, `/privilege` |
| Leads | `SiraContact`, `PrivilegeContact` + APIs + tables admin |
| Auth membres | invitation → claim → onboarding → approval |
| Espace client (coquille) | `app/(users)/client-prestige/*` + `SidebarClient` |
| Schéma Prisma | modèles ci-dessus |

### 6.2 Placeholders à remplacer

| Page | Comportement actuel |
|---|---|
| `/client-prestige` | Redirect vers `/client-prestige/opportunite` |
| `/client-prestige/opportunite` | Message « Aucune opportunité disponible » — **aucune query Prisma** |
| `/client-prestige/souscription` | « Bientôt disponible » |
| `/client-prestige/versement` | « Aucun versement enregistré » — **aucune query Prisma** |

### 6.3 Manquant totalement

- Aucune route admin « Opportunités ».
- Aucune API `GET/POST/PATCH/DELETE` sur `Opportunites`, `PrestigeOpportunity`, `SiraOpportunity`, `CompteVirement`, `Renumeration`.
- Aucune entrée dans `SidebarAdmin`.
- Le client Prisma (`lib/db/index.ts`) n’exporte que `InvitationStatus`, `UserRole`, `UserStatus`. Les nouveaux delegates existent via `prisma.opportunites`, `prisma.prestigeOpportunity`, etc., une fois le client généré.

---

## 7. Flux cible bout-en-bout

### 7.1 Vue d’ensemble

```
[Public]  Découverte Sira / Privilège
    ↓
[Lead]    Contact enregistré
    ↓
[Admin]   Invitation + approbation du membre
    ↓
[Admin]   Création d’une opportunité
          1. Choisir le membre (User APPROVED, CLIENT_USER)
          2. Choisir le programme : PRESTIGE | SIRA
          3. Saisir nomFormule, dateDebutFormule, dateFin
          4. Créer Opportunites + PrestigeOpportunity ou SiraOpportunity
    ↓
[Membre]  Voit le contrat dans Opportunité
          Voit le détail / période dans Souscription
          Enregistre un CompteVirement
    ↓
[Admin]   Saisit une rémunération
          1. Choisir le membre
          2. Choisir un de ses contrats (Prestige ou Sira)
          3. Choisir un de ses comptes de virement
          4. Saisir montant + datePayement
    ↓
[Membre]  Voit l’historique dans Versement
```

### 7.2 Diagramme des statuts d’un contrat

```
brouillon admin (formulaire)
        ↓ POST
   CONTRAT ACTIF     si aujourd’hui ∈ [dateDebutFormule, dateFin]
   CONTRAT À VENIR   si aujourd’hui < dateDebutFormule
   CONTRAT EXPIRÉ    si aujourd’hui > dateFin
        ↓
   (optionnel, v2) CONTRAT CLOS manuellement
```

**V1 :** pas de champ `status` en base. Le statut est **dérivé des dates** côté lecture.

### 7.3 Navigation cible

**Admin — nouvelle section sidebar** « Opportunités » :

| Label FR | Route | Rôle |
|---|---|---|
| Opportunités | `/admin/opportunites` | Liste de tous les contrats Prestige + Sira, filtres membre / programme / dates. |
| Nouvelle opportunité | `/admin/opportunites/nouveau` ou modal sur la liste | Formulaire de création. |
| Détail | `/admin/opportunites/[id]` | Fiche contrat + liste des rémunérations + actions. |
| Versements | `/admin/versements` | Liste globale des `Renumeration` + création. |

**Client — routes existantes, contenu réel :**

| Route | Contenu |
|---|---|
| `/client-prestige/opportunite` | Cartes / tableau des contrats du membre connecté (Prestige + Sira). |
| `/client-prestige/souscription` | Détail de la (ou des) formule(s) : nom, dates, statut dérivé. |
| `/client-prestige/versement` | Historique des rémunérations + gestion du/des `CompteVirement`. |

---

## 8. Spécification des écrans

### 8.1 Conventions UI (obligatoires)

Reprendre **strictement** le design system existant :

- Admin : `AdminPageHeader`, `AdminCountLine`, `adminCardClass`, `adminCardGlow`, `adminPrimaryButtonClass`, `adminSecondaryButtonClass`, `adminFieldClass`, `adminLabelClass` (`components/kp/adminStyles.ts`).
- Client : `KpPageHeader`, cartes `rounded-sm border border-white/10 bg-white/2`.
- Tables admin : même pattern que `PrivilegeContactTable` / `SiraContactTable` (colonnes, icône œil, icône poubelle, modal détail, i18n `tr()` / `<Tr />`).
- Bilingue FR/EN partout (`useLocale`, `Tr`).
- Server Components pour le fetch Prisma ; Client Components seulement pour interactions (modals, forms).
- Dates : `toISOString()` côté serveur, format `fr-FR` / `en-US` côté client.

### 8.2 Admin — liste des opportunités

Colonnes : membre (nom + email), programme (Prestige / Sira), nom de formule, début, fin, statut dérivé, nb de versements, actions (voir / supprimer si 0 versement).

Tri : `createdAt desc`.

Empty state : « Aucune opportunité assignée pour le moment. »

### 8.3 Admin — création

Champs :

1. Membre — select des `User` `status = APPROVED` et `role = CLIENT_USER` (label : `fullName` ou email).
2. Programme — radio `PRESTIGE` | `SIRA`.
3. Nom de la formule — texte libre, requis.
4. Date de début — `datetime-local` ou date, requis.
5. Date de fin — requise, **strictement postérieure** à la date de début.

Transaction Prisma :

```
1. create Opportunites
2. create PrestigeOpportunity OU SiraOpportunity
   { nomFormule, dateDebutFormule, dateFin, userId, opportunitesId }
```

### 8.4 Admin — versement

Champs :

1. Membre.
2. Contrat du membre (liste fusionnée Prestige + Sira, label = `nomFormule` + programme + dates).
3. Compte de virement du membre (s’il n’en a pas : bloquer avec message).
4. Montant (Decimal, min 0.01).
5. Date de paiement.

Créer `Renumeration` avec **un seul** des deux FK contrat renseigné.

### 8.5 Client — Opportunité

Pour le `User` lié au `clerkUserId` de la session :

- Charger `prestigeOpportunities` + `siraOpportunities` (`orderBy: dateDebutFormule desc`).
- Afficher programme, nomFormule, dates, statut dérivé.
- Empty state : conserver le copy actuel (« Aucune opportunité disponible pour le moment… »).

### 8.6 Client — Souscription

Même données, présentation « contrat / adhésion » : une fiche par formule, mise en avant de la période de validité. Pas de souscription self-service en V1 (l’admin assigne).

### 8.7 Client — Versement

- Liste des `renumerations` du membre (montant, date, formule liée, compte).
- Bloc « Compte de virement » : créer / lister. En V1, pas d’édition du numéro de carte une fois créé (suppression + recréation, ou édition limitée à `validiteCarte` si déjà des versements → interdite).
- Empty state versements : copy actuel.

---

## 9. APIs cibles

Toutes les routes admin : `runtime = "nodejs"` + `requireAdminUserId()` → 403 sinon.

Toutes les routes client : résoudre le `User` Prisma via `clerkUserId` ; ne jamais accepter un `userId` provenant du body.

| Méthode | Route | Action |
|---|---|---|
| GET | `/api/admin/opportunites` | Liste contrats Prestige+Sira, include user + `_count.remunerations`. |
| POST | `/api/admin/opportunites` | Body `{ userId, program: "PRESTIGE"\|"SIRA", nomFormule, dateDebutFormule, dateFin }`. |
| GET | `/api/admin/opportunites/[id]` | Détail. `id` = id du contrat **ou** de l’`Opportunites` : choisir **id du contrat** + query `?program=`. Plus simple : deux routes séparées. |
| DELETE | `/api/admin/opportunites/[id]` | Uniquement si 0 rémunération. |
| GET | `/api/admin/versements` | Liste rémunérations. |
| POST | `/api/admin/versements` | Création (invariants §5.5). |
| GET | `/api/me/opportunites` | Contrats du membre connecté. |
| GET | `/api/me/versements` | Rémunérations du membre. |
| GET/POST | `/api/me/comptes-virement` | Liste / création. |
| DELETE | `/api/me/comptes-virement/[id]` | Interdit si le compte a des rémunérations (`Restrict`). |

**Préférence V1 plus simple :** pages Server Components qui lisent Prisma directement (comme `/admin/privilege-contact` et `/admin/sira-message`), et **seulement** POST/DELETE via Route Handlers. Éviter un GET JSON inutile si la page RSC suffit.

### 9.1 Résolution de l’utilisateur connecté

```
auth() → clerkUserId
prisma.user.findFirst({ where: { clerkUserId } })
```

Si absent → 401 / redirect onboarding.

---

## 10. Règles, limites V1, hors périmètre

### V1 — à faire

- CRUD admin des contrats Prestige **et** Sira.
- Lecture client des contrats + versements.
- CRUD compte de virement (création / suppression si inutilisé).
- Création admin des rémunérations.
- i18n FR/EN, design system existant, auth existante.
- Un membre peut avoir **plusieurs** contrats, des deux programmes.

### V1 — ne pas faire

- Catalogue public de formules en base (les palier Sira Bronze/Argent/Or restent du contenu marketing).
- Self-service : le membre ne crée pas son opportunité.
- Calcul automatique des 70/30.
- Notifications e-mail / Clerk lors d’un nouveau versement.
- Espace client Sira séparé (`/client-sira`) : tout passe par `/client-prestige` avec un badge de programme.
- Renommer les tables `Opportunites` / `Renumeration` / `datePayement`.
- Paiement en ligne (Stripe, etc.).
- Upload de justificatifs.
- Tableau de bord agrégé (CA, 70/30).

### Sécurité données bancaires

`CompteVirement.numeroCarte` est sensible. En V1 :

- n’afficher que les **4 derniers chiffres** dans les listes ;
- ne jamais logger le numéro complet ;
- routes client scoped au propriétaire ;
- pas de GET admin du numéro complet dans le HTML si ce n’est pas indispensable (masquer aussi côté admin).

---

## 11. Fichiers de référence à imiter

| Besoin | Fichier |
|---|---|
| Schéma | `prisma/schema.prisma` |
| Page admin liste + RSC Prisma | `app/(users)/admin/privilege-contact/page.tsx` |
| Table admin + delete | `app/(users)/admin/privilege-contact/PrivilegeContactTable.tsx` |
| DELETE admin | `app/api/admin/privilege-contact/[id]/route.ts` |
| Sidebar admin | `components/kp/SidebarAdmin.tsx` |
| Sidebar client | `components/kp/SidebarClient.tsx` |
| Placeholder client | `app/(users)/client-prestige/opportunite/page.tsx` |
| Auth admin API | `lib/auth/server.ts` → `requireAdminUserId` |
| Auth client layout | `app/(users)/client-prestige/layout.tsx` |
| Prisma client | `lib/db/index.ts` → `prisma` |
| Styles admin | `components/kp/adminStyles.ts` |
| Next.js de ce repo | Lire `node_modules/next/dist/docs/` avant d’écrire des APIs (version locale, breaking changes). |

---

## 12. Prompt prêt à coller pour une IA générative

Copier le bloc ci-dessous (éventuellement précédé des sections 5 à 10 si le contexte de session est vide).

```
Tu travailles dans le repo KPANDJI AUTOMOBILES (Next.js App Router, Prisma, Clerk, PostgreSQL, i18n FR/EN).

Objectif : implémenter la fonctionnalité MÉTIER « Opportunité » (couche membre), pas la vitrine marketing /opportunities qui existe déjà.

## Métier
Un admin assigne à un membre approuvé (User.role = CLIENT_USER, status = APPROVED) un contrat :
- programme PRESTIGE ou SIRA
- nomFormule (string)
- dateDebutFormule, dateFin
En base : créer d’abord Opportunites, puis PrestigeOpportunity OU SiraOpportunity (jamais les deux pour un même contrat).
Le membre consulte ses contrats dans /client-prestige/opportunite et /client-prestige/souscription.
Le membre enregistre un CompteVirement (compteBancaire, numeroCarte, validiteCarte).
L’admin saisit une Renumeration (montant Decimal, datePayement) liée à UN contrat (sira XOR prestige) + UN compte du même user.
Le membre voit l’historique dans /client-prestige/versement.

## Schéma (ne pas le modifier sauf nécessité de migration)
Modèles existants dans prisma/schema.prisma : Opportunites, PrestigeOpportunity, SiraOpportunity, CompteVirement, Renumeration, User.
Ne PAS renommer Opportunites / Renumeration / datePayement.
Invariant rémunération : exactement un de siraOpportunityId | prestigeOpportunityId ; userId cohérent avec le contrat et le compte ; montant > 0.
Interdire DELETE d’un contrat ou d’un compte s’il a des rémunérations.

## Auth
Admin APIs : requireAdminUserId() depuis lib/auth/server.ts.
Pages admin : layout app/(users)/admin/layout.tsx déjà protégé.
Pages client : layout app/(users)/client-prestige/layout.tsx déjà protégé.
Résoudre le membre via prisma.user.findFirst({ where: { clerkUserId } }).
Jamais faire confiance à un userId envoyé par le client sur les routes /api/me/*.

## UI
Imiter app/(users)/admin/privilege-contact/page.tsx + PrivilegeContactTable.tsx.
Styles : components/kp/adminStyles.ts, AdminPageHeader, AdminCountLine, Tr / useLocale.
Ajouter une section « Opportunités » dans components/kp/SidebarAdmin.tsx (liste + versements).
Remplacer les placeholders :
- app/(users)/client-prestige/opportunite/page.tsx
- app/(users)/client-prestige/souscription/page.tsx
- app/(users)/client-prestige/versement/page.tsx
Pages RSC pour le GET Prisma. Client components seulement pour forms / modals / delete.
Afficher le numéro de carte masqué (•••• 1234).
Statut contrat dérivé des dates (à venir / actif / expiré), pas de nouveau enum.

## Routes admin cibles
- /admin/opportunites — liste + création
- /admin/versements — liste + création
Route handlers POST/DELETE sous app/api/admin/… et app/api/me/…

## Hors V1
Pas de self-service membre, pas de calcul 70/30, pas d’e-mails, pas de Stripe, pas d’espace /client-sira, pas de refactor du schéma.

## Contraintes repo
Lire node_modules/next/dist/docs/ avant d’écrire du code Next.
Ne pas créer de markdown supplémentaire.
Ne pas committer sauf demande.
Après Prisma : s’assurer que le client est généré (delegates opportunites, prestigeOpportunity, siraOpportunity, compteVirement, renumeration).

Livrable : code fonctionnel, bilingue, branché sur Prisma, cohérent avec le design system.
```

---

## 13. Critères d’acceptation

1. Un admin peut assigner une formule Prestige à un membre approuvé.
2. Un admin peut assigner une formule Sira à un membre approuvé.
3. Le membre voit uniquement ses contrats, dès le clic sur « Opportunité » dans la sidebar client.
4. « Souscription » affiche les mêmes contrats sous forme de fiches période / formule.
5. Le membre peut enregistrer un compte de virement.
6. Un admin peut enregistrer un versement lié à un contrat et à un compte du même membre.
7. « Versement » affiche l’historique du membre connecté.
8. Impossible de supprimer un contrat ou un compte déjà utilisé par une rémunération.
9. Un visiteur non connecté / membre PENDING n’accède à rien de tout cela.
10. FR et EN fonctionnent sur tous les nouveaux écrans.
11. La page publique `/opportunities` n’est pas modifiée.

---

## 14. Glossaire

| Terme | Sens dans ce projet |
|---|---|
| Opportunité (vitrine) | Programme marketing Sira ou Privilège. |
| Opportunité (métier) | Contrat `PrestigeOpportunity` ou `SiraOpportunity`. |
| Formule | `nomFormule` — libellé du contrat. |
| Souscription | Vue membre du contrat (période de validité). |
| Versement / rémunération | Ligne `Renumeration` — argent versé au membre. |
| Compte de virement | `CompteVirement` — destination du paiement. |
| Conteneur | Ligne `Opportunites` — dossier technique parent. |
| Membre Prestige | `CLIENT_USER` approuvé ; l’espace s’appelle Prestige même si le contrat est Sira. |
)
