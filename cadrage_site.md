# Cadrage bout-en-bout — Site KPANDJI AUTOMOBILES

Document de cadrage du **site entier** à l’état actuel. Il décrit l’existant, le métier, le modèle de données, les flux cibles, et des prompts prêts à coller dans une IA générative.

**Fichier :** `cadrage_site.md`  
**Complément détaillé « Opportunité membre » :** `cadrage_opportuinité.md`  
**Projet :** KPANDJI AUTOMOBILES — Next.js 16 (App Router) + React 19 + Prisma 7 + Clerk + PostgreSQL (Neon) + Tailwind 4  
**Date :** 26 août 2026  
**Statut global :** vitrine publique et tunnel leads + membres (invitation / approbation) opérationnels. Espace client et back-office « contrat / versement / messagerie interne » encore en coquille.

---

## 1. Intention

Ce document sert deux usages :

1. **Alignement produit / technique** — une photographie fidèle du site tel qu’il est aujourd’hui, et de ce qui reste à brancher.
2. **Prompt d’implémentation** — sections 13–15 à coller dans une IA de code, avec le contexte des sections 2–12.

Ne pas traiter le site comme un e-commerce générique. C’est le site d’un **constructeur automobile ivoirien** (Abidjan, Cocody Riviera Palmeraie) avec :

- une **vitrine** (modèles, showroom, SAV, contact) ;
- deux **programmes commerciaux** (Sira flottes, Privilège diaspora) ;
- un **espace membre sur invitation** (Prestige) ;
- un **back-office admin** (membres + inboxes de leads).

---

## 2. Stack et conventions (ne pas violer)

| Couche | Choix |
|---|---|
| Framework | Next.js **16** App Router — lire `node_modules/next/dist/docs/` avant d’écrire des APIs. |
| UI | React 19, Tailwind 4, Framer Motion, polices DM Sans + Cormorant. |
| Auth | Clerk (`@clerk/nextjs`). Rôle / statut dans `publicMetadata` **et** table `User`. |
| Middleware | `proxy.ts` (Clerk `clerkMiddleware`). |
| DB | PostgreSQL via Prisma 7, client généré dans `generated/prisma`. Accès : `prisma` depuis `lib/db`. |
| i18n | FR/EN via `KpLocaleProvider`, `useLocale().tr()`, composant `<Tr />`. Cookie / locale serveur : `lib/i18n`. |
| Design admin | `adminCardClass`, `adminCardGlow`, `adminPrimaryButtonClass`, `AdminPageHeader`, `AdminCountLine`. |
| Design client | `KpPageHeader`, cartes `rounded-sm border border-white/10 bg-white/2`. |
| Pattern inbox admin | RSC Prisma + table client (œil / supprimer / modal) — copier `privilege-contact`. |

Règles repo :

- Ne pas inventer de librairie de paiement / CMS.
- Ne pas renommer les tables mal orthographiées (`Opportunites`, `Renumeration`, `datePayement`) sans migration dédiée.
- Ne pas committer sauf demande explicite.
- Vérifier l’UI dans le navigateur après tout changement visible.

---

## 3. Métier

**KPANDJI AUTOMOBILES** conçoit, assemble et commercialise des véhicules pensés pour le terrain africain.

### 3.1 Gamme vitrine (fichiers `data/modeles.ts`)

Showroom / essai / fiches `/modeles/[id]` :

| id | Nom |
|---|---|
| `djetranplus` | DJETRAN PLUS |
| `djetran` | DJETRAN |
| `lathaye` | LATHAYE |

Fiches PDF footer (aussi Souralai, hors showroom 3D) : Djetran BVA/BVM, Djetran Plus, Lathaye, Souralai.

### 3.2 Deux programmes « Opportunités » (vitrine)

| Programme | Route | Cible | Lead |
|---|---|---|---|
| **Sira** | `/sira` | Flottes & institutions | `SiraContact` → `/admin/sira-message` |
| **Privilège** | `/privilege` | Diaspora & particuliers | `PrivilegeContact` → `/admin/privilege-contact` |

Sira (contenu marketing, pas encore en base) :

- Bronze — BANCO, min. 28 véhicules
- Argent — SOURALAI, min. 30 véhicules
- Or — LATHAYE 1, min. 30 véhicules

Privilège — deux chemins marketing :

1. **Acheter & rouler** — cash ou 6–24 mois.
2. **Acheter & rentabiliser** — véhicule en flotte élite ; client **70 %** des revenus, KPANDJI **30 %**.

### 3.3 Espace membre (cible métier, UI encore vide)

Une fois le prospect **invité puis approuvé**, l’espace `/client-prestige` doit exposer :

- ses **contrats** (formules Prestige et/ou Sira) ;
- sa **souscription** (période de validité) ;
- ses **versements** (`Renumeration`) vers un **compte de virement** ;
- une **messagerie** avec l’équipe.

Détail contrat : voir `cadrage_opportuinité.md`.

---

## 4. Acteurs

| Acteur | Clerk / Prisma | Ce qu’il peut faire aujourd’hui |
|---|---|---|
| **Visiteur** | Non connecté | Tout le site public. Formulaires de leads. |
| **Membre PENDING** | `CLIENT_USER` + `PENDING` | Forcé vers `/onboarding`. **N’accède pas** à la vitrine (middleware). |
| **Membre REJECTED** | `CLIENT_USER` + `REJECTED` | `/unauthorized` sur l’espace client. |
| **Membre APPROVED** | `CLIENT_USER` + `APPROVED` | `/client-prestige/*` (pages encore placeholder). |
| **Admin** | `ADMIN` | `/admin/*`. Un admin qui tape `/` est **redirigé vers `/admin`**. |

Fonctions clés : `lib/auth/roles.ts`, `lib/auth/routes.ts`, `lib/auth/membership.ts`, `lib/auth/server.ts` (`requireAdminUserId`, `syncClerkMembership`).

Source de vérité membership : JWT session → Clerk `publicMetadata` → table `User` (back-fill Clerk si la DB est en avance).

---

## 5. Carte du site — existant

### 5.1 Navigation publique (header)

`components/kp/KpHeader.tsx`

| Label FR | Route |
|---|---|
| Accueil | `/` |
| ShowRoom | `/showroom` |
| Opportunités | `/opportunities` |
| S.A.V. | `/sav` |
| Contact | `/contact` |

Utilitaires header : KPANDJI AUTOMOBILES → `/kpandji-automobiles`, Eco-Kpandji → `/ecologie`, Kpandji-Emplois → `/emplois`.  
CTA : « Réserver un essai » → `/essai`.  
Compte : modal login (`?clientLogin=1`) ou `/sign-up` (invitation). Logo / Accueil → `/`.

Shell : `KpAppShell` = header + children + footer sur **toutes** les pages (y compris admin / client).

### 5.2 Pages publiques

| Route | Rôle | Données |
|---|---|---|
| `/` | Home marketing | Statique |
| `/showroom` | Showroom virtuel | `data/modeles.ts` |
| `/modeles/[id]` | Fiche modèle | idem |
| `/catalogue` | Catalogue 2026 | Statique / PDF |
| `/opportunities` | Cartes Sira + Privilège | Statique |
| `/sira` | Programme flotte | Formulaire → `POST /api/sira-contact` |
| `/privilege` | Programme diaspora | Formulaire → `POST /api/privilege-contact` |
| `/sav` | Service après-vente | Formulaire « Écrire au SAV » → `POST /api/ecrire-sav` |
| `/service-apres-vente` | Alias SAV (éviter double footer) | Même composant |
| `/essai` | Réservation d’essai | `POST /api/essai` (`EssaiRequest`) |
| `/contact` | Formulaire contact | `POST /api/contact` (`Message_Contact`) |
| `/accessoires` | Boutique accessoires | Devis par e-mail, pas de panier |
| `/ecologie` | Page Eco-Kpandji | Statique |
| `/emplois` | Emplois | Statique |
| `/kpandji-automobiles` | Marque | Statique |
| `/unauthorized` | Accès refusé | |

Capture e-mail visiteur : `POST /api/visitor-email` → `VisitorEmail`.

### 5.3 Auth / onboarding

| Route | Rôle |
|---|---|
| `/sign-in` | Clerk (peu utilisé : login modal sur `/`) |
| `/sign-up` | Inscription **sur invitation** (`?token=`) |
| `/onboarding` | Salle d’attente + claim profil (`OnboardingFlow`) |
| `/onboarding/setup-mfa` | Tâche Clerk MFA pendant le sign-up |

APIs : `POST /api/onboarding/claim`, `GET /api/onboarding/status`, `POST /api/invitations/validate`, `POST /api/auth/sync`, webhook Clerk `POST /api/webhook/clerk`.

### 5.4 Espace client `/client-prestige`

Layout protégé : `app/(users)/client-prestige/layout.tsx`.  
`/` de l’espace **redirige** vers `/client-prestige/opportunite`.

| Route | État |
|---|---|
| `/client-prestige/opportunite` | Placeholder — aucune query Prisma |
| `/client-prestige/souscription` | Placeholder |
| `/client-prestige/versement` | Placeholder |
| `/client-prestige/message` | Placeholder |

Sidebar : `components/kp/SidebarClient.tsx`.

### 5.5 Espace admin `/admin`

Layout protégé. `/admin` redirige vers `/admin/invitations`.

| Section | Route | État |
|---|---|---|
| Invitations | `/admin/invitations` | **Opérationnel** |
| Validation | `/admin/membres` | **Opérationnel** (approve / reject) |
| Liste membres | `/admin/liste-membres` | **Opérationnel** (APPROVED, voir / supprimer) |
| Messages reçus | `/admin/message-recus` | **Opérationnel** (`Message_Contact`) |
| Envoyer un message | `/admin/envoyer-message` | **UI only** — timeout, pas d’API |
| Réponses | `/admin/reponses` | **UI only** — inbox vide en mémoire |
| Demandes d’essai | `/admin/demandes-essai` | **Opérationnel** |
| E-mails visiteurs | `/admin/email-visiteurs` | **Opérationnel** (`VisitorEmail` + `VisitorMessage` si présent) |
| Écrire au SAV | `/admin/ecrire-au-sav` | **Opérationnel** |
| Message Privilégié | `/admin/privilege-contact` | **Opérationnel** |
| Message SIRA | `/admin/sira-message` | **Opérationnel** |
| Opportunités / versements | — | **Absent** |

---

## 6. Flux existants (déjà en production fonctionnelle)

### 6.1 Lead public → inbox admin

```
Visiteur remplit un formulaire
  → POST /api/{essai|contact|ecrire-sav|sira-contact|privilege-contact|visitor-email}
  → insert Prisma
  → admin consulte / supprime dans /admin/…
```

Aucun e-mail transactionnel automatique. Relance = téléphone / mail manuel.

### 6.2 Invitation → membre approuvé

```
Admin POST /api/invitations { email, role }
  → Invitation PENDING, token, expire 14 jours, URL /sign-up?token=…
Prospect s’inscrit (Clerk)
  → POST /api/onboarding/claim (token + profil : nom, tel, pays)
  → User CLIENT_USER (ou ADMIN si invitation admin), status PENDING
  → middleware envoie tout le site vers /onboarding
Admin /admin/membres → POST /api/admin/users/[id]/decision { APPROVED | REJECTED }
  → syncClerkMembership
  → APPROVED : accès /client-prestige
  → REJECTED : /unauthorized
```

### 6.3 Comportement middleware (`proxy.ts`) — important

- Visiteur : pages publiques OK.
- Connecté **PENDING** : **toute page non API / non auth / non onboarding / non client-prestige** → `/onboarding`. Donc un membre en attente **ne peut pas** visiter l’accueil. C’est volontaire aujourd’hui.
- Connecté **ADMIN** sur `/`, onboarding ou client-prestige → `/admin`.
- `/admin/*` sans rôle admin → `/unauthorized`.
- `/client-prestige/*` sans `CLIENT_USER`+`APPROVED` (et sans admin via `canAccessPrestigeRoute`) → onboarding ou unauthorized. Le **layout** client refuse l’admin (`canAccessClientPrestigeRoute` = CLIENT_USER only).

---

## 7. Modèle de données

Fichier unique : `prisma/schema.prisma`. PostgreSQL.

### 7.1 Identité

```
Invitation 1 ─── 0..1 User
User.role     = ADMIN | CLIENT_USER
User.status   = PENDING | APPROVED | REJECTED
Invitation.status = PENDING | ACCEPTED | REVOKED | EXPIRED
```

`User` : `clerkUserId`, `email`, `fullName?`, `phone?`, `residenceCountry?`, `invitationId?`, `approvedAt?`, `approvedBy?`.

### 7.2 Leads publics (aucun lien User)

| Modèle | Champs utiles | Inbox admin |
|---|---|---|
| `EssaiRequest` | `modelIds` Json, name, email, phone, preferredDate?, timeSlot?, message? | `/admin/demandes-essai` |
| `Message_Contact` | nom, email, telephone?, sujet, texte | `/admin/message-recus` |
| `VisitorMessage` | name, email, phone?, subject, message | emails visiteurs (table messages) |
| `VisitorEmail` | email | `/admin/email-visiteurs` |
| `PrivilegeContact` | name, country, city, phone, email | `/admin/privilege-contact` |
| `SiraContact` | name, country, city, phone, email | `/admin/sira-message` |
| `EcrireSav` | name, contact, modeleVehicule, panne, localisation | `/admin/ecrire-au-sav` |

### 7.3 Contrats / argent (schéma prêt, **zéro UI**)

```
User 1 ── N PrestigeOpportunity
User 1 ── N SiraOpportunity
User 1 ── N CompteVirement
User 1 ── N Renumeration
Opportunites 1 ── N PrestigeOpportunity | SiraOpportunity
PrestigeOpportunity | SiraOpportunity 1 ── N Renumeration
CompteVirement 1 ── N Renumeration   (onDelete: Restrict)
```

**PrestigeOpportunity / SiraOpportunity** (identiques) : `nomFormule`, `dateDebutFormule`, `dateFin`, `userId`, `opportunitesId`.

**CompteVirement** : `compteBancaire`, `numeroCarte`, `validiteCarte`, `userId`.

**Renumeration** : `montant Decimal(12,2)`, `datePayement`, `siraOpportunityId?`, `prestigeOpportunityId?`, `compteVirementId`, `userId`.

Invariants à faire respecter **en API** (pas en schema) :

- exactement un de `siraOpportunityId` XOR `prestigeOpportunityId` ;
- `userId` = user du contrat = user du compte ;
- `montant` > 0 ;
- pas de DELETE contrat/compte s’il existe des versements.

`Opportunites` est un **conteneur** sans nom : à chaque assignation, créer 1 conteneur + 1 ligne Prestige **ou** Sira.

### 7.4 Absent du schéma

- Messagerie membre ↔ admin (pas de table Message interne).
- Catalogue formules Sira Bronze/Argent/Or.
- Panier / commandes accessoires.
- Statut KYC dédié (le `User.status` d’approbation n’est pas un KYC bancaire).

---

## 8. APIs existantes

Toutes admin : `runtime = "nodejs"` + `requireAdminUserId()` → 403.

| Méthode | Route | Rôle |
|---|---|---|
| GET/POST | `/api/invitations` | Liste / créer invitation |
| GET | `/api/invitations/validate` | Vérifier token |
| POST | `/api/onboarding/claim` | Lier Clerk ↔ invitation + profil |
| GET | `/api/onboarding/status` | État onboarding |
| POST | `/api/auth/sync` | Sync membership |
| POST | `/api/webhook/clerk` | Webhook |
| GET | `/api/admin/users` | Liste users |
| POST | `/api/admin/users/[id]/decision` | Approve / reject |
| DELETE | `/api/admin/users/[id]` | Supprimer membre |
| POST | `/api/essai` | Lead essai |
| POST | `/api/contact` | Lead contact (`message_Contact`) |
| POST | `/api/ecrire-sav` | Lead SAV |
| POST | `/api/sira-contact` | Lead Sira |
| POST | `/api/privilege-contact` | Lead Privilège |
| POST | `/api/visitor-email` | Capture e-mail |
| DELETE | `/api/admin/essai-requests/[id]` | |
| DELETE | `/api/admin/message-contact/[id]` | |
| DELETE | `/api/admin/ecrire-sav/[id]` | |
| DELETE | `/api/admin/sira-contact/[id]` | |
| DELETE | `/api/admin/privilege-contact/[id]` | |
| DELETE | `/api/admin/visitor-messages/[id]` | |

**Manquant :** toute API `opportunites`, `versements`, `comptes-virement`, messagerie interne.

---

## 9. Matrice existant vs cible

| Bloc | Existant | Cible V1 restante |
|---|---|---|
| Vitrine, showroom, fiches, i18n, design | Fait | Maintenance |
| Leads + inboxes admin | Fait | RAS |
| Invitation / onboarding / approval | Fait | RAS |
| Assigner un contrat Prestige/Sira | Schéma only | Admin + client — **priorité 1** |
| Compte virement + rémunérations | Schéma only | Admin + client — **priorité 1** |
| Messagerie membre ↔ admin | UI factice | Table + APIs + deux espaces — **priorité 2** |
| Calcul auto 70/30, Stripe, e-mails | Non | Hors V1 |
| Espace `/client-sira` séparé | Non | Hors V1 (badge programme dans Prestige) |
| Boutique accessoires panier | Non | Hors V1 (rester sur e-mail) |
| Membre PENDING qui visite l’accueil | Bloqué par middleware | Décision produit : garder ou autoriser la vitrine |

---

## 10. Flux cibles restants

### 10.1 Opportunité / souscription / versement (priorité 1)

```
Admin choisit un User APPROVED CLIENT_USER
  → programme PRESTIGE | SIRA
  → nomFormule, dateDebutFormule, dateFin (> début)
  → create Opportunites + PrestigeOpportunity|SiraOpportunity

Membre
  → /client-prestige/opportunite : ses contrats (statut dérivé des dates)
  → /client-prestige/souscription : fiches période / formule
  → enregistre CompteVirement (masquer n° carte •••• 1234)

Admin
  → saisit Renumeration (membre, contrat XOR, compte, montant, date)

Membre
  → /client-prestige/versement : historique
```

Écrans admin à ajouter : `/admin/opportunites`, `/admin/versements` + section sidebar.

Spécification complète : **`cadrage_opportuinité.md`**.

### 10.2 Messagerie interne (priorité 2)

Aujourd’hui : `/admin/envoyer-message` et `/admin/reponses` et `/client-prestige/message` sont des coquilles.

Cible minimale :

- Nouvelle table Prisma du type `MemberMessage` (`fromUserId`, `toUserId` ou `direction`, `subject`, `body`, `createdAt`, `readAt?`).
- Membre : liste + composer vers « l’équipe » (tous les ADMIN, ou un destinataire système).
- Admin : inbox réelle + envoi vers un membre APPROVED.
- Brancher les 3 pages existantes. Ne pas mélanger avec `Message_Contact` (leads publics).

### 10.3 Hors cadrage immédiat

- Notifications e-mail (Resend, etc.).
- Paiement en ligne.
- Worker / cron d’expiration d’invitations (`EXPIRED` existe en enum, pas de job visible).
- Catalogue formules en base (Bronze / Argent / Or restent du copy).

---

## 11. Fichiers de référence

| Besoin | Chemin |
|---|---|
| Schéma | `prisma/schema.prisma` |
| Prisma client | `lib/db/index.ts` |
| Middleware | `proxy.ts` |
| Rôles | `lib/auth/roles.ts` |
| Membership | `lib/auth/membership.ts` |
| Header / nav | `components/kp/KpHeader.tsx` |
| Sidebar admin | `components/kp/SidebarAdmin.tsx` |
| Sidebar client | `components/kp/SidebarClient.tsx` |
| Pattern inbox | `app/(users)/admin/privilege-contact/page.tsx` + `PrivilegeContactTable.tsx` |
| DELETE admin | `app/api/admin/privilege-contact/[id]/route.ts` |
| Styles admin | `components/kp/adminStyles.ts` |
| Placeholders client | `app/(users)/client-prestige/{opportunite,souscription,versement,message}/page.tsx` |
| Modèles véhicules | `data/modeles.ts` |
| Cadrage contrat | `cadrage_opportuinité.md` |

---

## 12. Critères d’acceptation globaux (quand les V1 seront faites)

1. Un visiteur parcourt vitrine, showroom, Sira, Privilège, SAV, contact, essai **sans compte**.
2. Chaque formulaire public crée une ligne Prisma visible dans l’admin correspondant.
3. Un admin invite, le prospect s’inscrit, attend, est approuvé, entre dans `/client-prestige`.
4. Un admin assigne une formule ; le membre la voit (lui seul).
5. Un membre enregistre un compte ; un admin saisit un versement ; le membre le voit.
6. Impossible de supprimer un contrat/compte déjà versé.
7. FR/EN sur tous les écrans nouveaux.
8. `/opportunities` (vitrine) n’est pas cassé.
9. Design system admin/client respecté.
10. Messagerie interne (si livrée) persistée, distincte des leads `/contact`.

---

## 13. Prompt IA — Phase A : Opportunité + versements

```
Tu travailles dans le repo KPANDJI AUTOMOBILES (Next.js 16 App Router, Prisma 7, Clerk, PostgreSQL, i18n FR/EN).
Lis node_modules/next/dist/docs/ avant d’écrire du code Next.
Lis cadrage_opportuinité.md et cadrage_site.md.

Objectif UNIQUE : brancher la fonctionnalité métier Opportunité (couche membre). Ne pas modifier la vitrine /opportunities.

Métier :
- Admin assigne à un User CLIENT_USER APPROVED un contrat PRESTIGE ou SIRA
  (nomFormule, dateDebutFormule, dateFin > début).
- Transaction : create Opportunites puis PrestigeOpportunity OU SiraOpportunity.
- Membre voit ses contrats dans /client-prestige/opportunite et /client-prestige/souscription.
- Membre CRUD CompteVirement (compteBancaire, numeroCarte, validiteCarte) — masquer la carte (•••• 1234).
- Admin saisit Renumeration (montant Decimal > 0, datePayement) liée à UN contrat (sira XOR prestige) + UN compte du même user.
- Membre voit l’historique dans /client-prestige/versement.

Auth :
- Admin APIs : requireAdminUserId() (lib/auth/server.ts).
- Client : prisma.user.findFirst({ where: { clerkUserId } }). Jamais faire confiance à un userId du body sur /api/me/*.

UI : imiter app/(users)/admin/privilege-contact/* et components/kp/adminStyles.ts.
Ajouter section « Opportunités » dans SidebarAdmin (liste + versements).
Remplacer les 3 placeholders client opportunite / souscription / versement.
Pages RSC pour le GET Prisma. Client components seulement pour forms / modals / delete.
Statut contrat dérivé des dates (à venir / actif / expiré). Pas de nouvel enum.
DELETE contrat ou compte interdit s’il a des rémunérations.

Ne PAS : self-service membre, calcul 70/30, e-mails, Stripe, /client-sira, rename schema, messagerie interne, markdown extra, commit.

Livrable : code bilingue, design system, Prisma branché.
```

---

## 14. Prompt IA — Phase B : Messagerie interne membre ↔ admin

```
Tu travailles dans le repo KPANDJI AUTOMOBILES (Next.js 16, Prisma 7, Clerk, FR/EN).
Lis node_modules/next/dist/docs/ et cadrage_site.md §10.2.

Objectif : remplacer les coquilles de messagerie interne. Ne pas toucher Message_Contact (leads /contact).

Aujourd’hui :
- /client-prestige/message = placeholder
- /admin/envoyer-message = formulaire qui simule un envoi (setTimeout)
- /admin/reponses = inbox useState([]) vide
- Pas de modèle Prisma pour les messages membres

À faire :
1. Ajouter un modèle Prisma (ex. MemberThread / MemberMessage) : expéditeur User, destinataire User, subject, body, createdAt, readAt optionnel. Migration.
2. Membre APPROVED : liste ses messages + composer vers l’équipe (users role ADMIN).
3. Admin : inbox réelle + répondre + composer vers un CLIENT_USER APPROVED (brancher AdminSendMessage et AdminMessagesInbox).
4. APIs admin protégées par requireAdminUserId ; APIs membre scoped au clerkUserId.
5. i18n + design system existant. RSC pour listes si possible.

Hors scope : e-mail, pièces jointes, temps réel, opportunité/versement.

Ne pas committer sauf demande.
```

---

## 15. Prompt IA — lecture seule / audit (si on veut un état des lieux sans coder)

```
Tu es dans le repo KPANDJI AUTOMOBILES. Ne modifie aucun fichier.
Produis un rapport : pages publiques, APIs, modèles Prisma utilisés vs orphelins, placeholders, et dettes (middleware PENDING vs accueil, double footer /service-apres-vente, messagerie non persistée, typos schema).
Base-toi sur cadrage_site.md. Réponds en français, factuel.
```

---

## 16. Glossaire

| Terme | Sens ici |
|---|---|
| Opportunité (vitrine) | Programme Sira ou Privilège sur `/opportunities`. |
| Opportunité (métier) | Contrat `PrestigeOpportunity` ou `SiraOpportunity`. |
| Prestige | Nom de l’espace membre (`/client-prestige`), même si le contrat est Sira. |
| Privilège | Programme public diaspora (`/privilege`), leads `PrivilegeContact`. |
| Formule | `nomFormule` d’un contrat. |
| Souscription | Vue membre de la période du contrat. |
| Versement / rémunération | Ligne `Renumeration`. |
| Lead | Formulaire public → inbox admin, sans compte. |
| Claim | Liaison Clerk user ↔ Invitation + profil. |
| Conteneur | Ligne `Opportunites`. |

---

## 17. Décision produit ouverte (à trancher)

Le middleware envoie tout membre `PENDING` hors de la vitrine (y compris `/` et le logo Accueil).  
Si le métier veut qu’un inscrit en attente **continue de visiter le site public**, il faudra restreindre cette redirection aux routes authentifiées seulement (`/client-prestige`, `/admin`), pas à `/`.

Cette décision n’est **pas** dans la Phase A opportunités.
)
