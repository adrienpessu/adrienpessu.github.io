+++
title = "Votre mot de passe n'est pas sécurisé"
subtitle = "Nous utilisons tous les jours des mots de passe et tous les jours, le mot de passe est un vecteur de piratage"
summary = ""
date = 2019-12-31T00:00:00Z
draft = false

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Adrien Pessu"]

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["MotDePasse", "Password", "Security", "Securité"]
categories = []

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["deep-learning"]` references 
#   `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
# projects = ["internal-project"]

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
[image]
  # Caption (optional)
  caption = ""

  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = ""
+++

Il est évident que lorsque nous utilisons une application Web comme une boite Mail, Facebook ou notre compte en banque, nous exigions que nos données soient isolées (voir [Multi-tenant](https://adrien.pessu.net/post/multitenant/)). Tous les utilisateus utilisent la même application mais l'accès à nos données passe par l'**authentification**. Nous devons alors renseigner un identifiant utilisateur (pseudonyme ou email) et un mot de passe. Ces deux informations sont donc la clé pour accéder à vos données. Cette clé est-elle suffisamment sécurisée pour protéger vos données ayant le plus de valeurs?


# 1. 8 caractères avec une majuscule, un chiffre et un caractère spécial

Pour aider les utilisateurs dans la sécurisation des données, certains développeurs forcent leurs utilisateurs à prendre un format de mot de passe particulier. En fonction de la complexité du mot de passe, un attaquant va mettre plus ou moins de temps à tester toutes les combinaisons possibles par la technique du [brute-force](https://fr.wikipedia.org/wiki/Attaque_par_force_brute).

Le format du mot de passe va donc définir le nombre minimum de combinaisons possibles. Par exemple, avec le format 8 caractères avec une majuscule, un chiffre et un caractère spécial, la compléxité sera calculé comme ceci :
Les 26 lettres minuscules (a-z), 26 lettres majuscules (A-Z), 10 chiffres (0-9) et 29 caractères spéciaux (+, /`~!@#$%^&*()-_=;:'",<.>?) font 87 caractères. Sur une longueur de 8 caractères, on peut donc faire le calcul suivant : 8^90 = 1.8971375900641885e+81 

À titre de comparaison, si l'on oppose ce nombre avec les formats suivants : 

- 8 caractères majuscules et miniscules : 9.134385233318143e+46
- 4 caractères majuscules et miniscules : 2.028240960365167e+31
- 6 chiffres : 60466176

On peut rapidement venir à la conclusion que l'entropie (le nombre de combinaisons) va devenir de plus en plus importante lorsque l'on augmente la longueur et le nombre de caractères. Donc le mot de passe de votre banque avec une longueur fixe de 6 caractères, n'acceptant que des chiffres, est loin d'être suffisant quand il s'agit de protéger votre argent.

La longueur variable augmente aussi l'entropie du mot de passe. Dans notre calcul, pour un mot de passe compris entre 8 et 12 caractères, il faudra additionner les entropies, donc 8^90 + 8^90 + 9^90 + 10^90 + 11^90 + 12^90. 

En tant que développeur, nous devons encourager nos utilisateurs à saisir le mot de passe le plus long possible ainsi que de pouvoir tous les caractères possibles.

En tant qu'utilisateur, il n'est pas évident de retenir un mot de passe. Plutôt que les mots de passe les plus utilsés comme "123456", ou "password", ll est donc préférable d'utiliser une longue phrase ("ceciestunmotdepassetresdifficile")

Il faudrait aussi éviter d'utiliser un mot existant dans le dictionnaire. Car, une autre méthode d'attaque pour découvrir un mot de passe est de tester tous les mots du dictionnaire.

# 2 Si je mets le même mot de passe partout, je n'aurai qu'un seul mot de passe à retenir

Une fois un mot passe suffisamment "complexe" à deviner, on pourrait l'utiliser sur toutes les applications. Un mot de passe, que l'on a divulgué à personne et qui est trop complexe pour être calculé, peut être sécurisé sauf si une des applications que vous utilisez à subit une attaque et que les listes des combinaisons identifiant / mot de passe de tous les utilisateurs sont divulguées. Ainsi, il suffit pour une personne mal intentionnée de récupérer cette liste et de tester les combinaisons sur d'autres applications.

Pour vérifier son adresse mail, il existe le site [haveibeenpwned.com](https://haveibeenpwned.com/) qui en rentrant une adresse mail, permet de savoir si elle est présente dans une [fuite de données](https://www.google.com/search?q=data+breach&source=lnms&tbm=nws&sa=X&ved=2ahUKEwjWz-Lx5d_mAhU5AGMBHWO4By4Q_AUoAXoECAsQAw&biw=1392&bih=766).


La solution la plus simple est d'utiliser un gestionnaire de mot de passe, comme *remembear*, *dashlane* ou *keypass*. Ainsi, le gestionnaire pourra générer un mot de passe complexe et non retenable par un humain pour chaque application Web.  

Si un mot de passe du gestionnaire de mot de passe fait partie d'une fuite de données, il suffit juste de le changer seulement sur l'application qui a été attaquée.

# 3 Je m'inscris avec mon compte google, facebook, linkedIn comme ça je n'ai pas de mot de passe à gérer

L'authentification unique (ou Single Sign-On) permet d'utiliser une application pour s'authentifier sur d'autres applications. Par exemple, utiliser un compte Facebook pour s'authentifier sur d'autres sites.
En plus d'offrir à Facebook, les données sur les sites que vous consultez, votre compte Facebook devient un point de défaillance unique. C'est-à-dire que si votre compte Facebook est piraté, l'accès aux autres applications sera corrompu. 

# 4 L'email comme mot de passe

Il existe un autre moyen de s'authentifier sans mot de passe. 

Comme peut le proposer "Slack", pour se connecter, un lien est envoyé sur l'adresse mail de l'utilisateur, ce lien contient jeton, qui sera valable un certain temps, et lorsque l'on clique sur le lien, on se retrouve authentifié.

Le problème avec cette approche est que l'adresse mail est protégée par un identifiant et un mot de passe qui deviennent un point de défaillance unique.

D'ailleurs, dans tous les cas, si la boîte mail est corrompue, un attaquant pourra alors utiliser la fonction de réinitialisation de mot de passe présente sur toutes les applications et qui renvoi un mot de passe temporaire ou un lien pour réinitialiser l'authentification du compte.

# 5 Pour aller plus loin...

En plus d'un mot de passe, une bonne pratique est aussi d'utiliser l'authentification multi-facteur. C'est-à-dire, qu'en plus de l'authentification par identifiant et mot de passe, il faut utiliser un périphérique comme un smartphone avec l'application "Google authenificator" ou "Authy" qui fournit un code, une clé "yubikey" ou "Google Titan". Il conviendrait d'éviter la seconde authentification par [SMS](https://arstechnica.com/information-technology/2017/05/thieves-drain-2fa-protected-bank-accounts-by-abusing-ss7-routing-protocol/). 







