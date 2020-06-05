+++
title = "Liste des meilleurs pratiques Angular"
subtitle = "Les meilleurs pratiques pour garder une appplication maintenable"
summary = ""
date = 2020-02-01
draft = false

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Adrien Pessu"]

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["Angular", "Front", "TypeScript", "Web"]
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

# 1. Éviter les fuites de mémoire

RxJs est un super outil, mais il faut l'utiliser avec précaution. 
En effet, l'application va continuer de surveiller les changements sur l'`Observable`, dès l'utilisation de  `.subscribe()` même quand le composant de l'appel où n'est plus utilisé. Il faudrait rafraîchir la page pour éviter que l'application prenne trop de mémoire sur le navigateur, et sur une `Single Page Application` ce n'est pas envisageable.

Heureusement, il existe des solutions.
Tout d'abord, pour le cas le plus courant, les appels d'API ne retournent qu'une seule valeur à la fois (même si c'est un tableau, c'est quand même une valeur) donc il n'y a pas de raison de souscrire à un observable pour plus d'une valeur. Il faut donc utiliser la fonction `take()` comme ceci : 
```
this.apiService.getUsers().pipe(take(1)).subscribe(result => this.users = result);
```

La deuxième solution est pour les souscriptions plus longues comme par exemple les [sockets](https://fr.wikipedia.org/wiki/Socket), c'est-à-dire une souscription dont on ne connaît pas la fin.
La stratégie sera de manuellement se désinscrire à la fin du cycle de vie du composant. 

```
export class NotificationComponent implements OnInit {

  notifications: Notification: [];
  subscriptions: Subscription[] = [];

  constructor(private socketService: SocketService) {}

  getUsers(){
    this.subscriptions.push(this.socketService.getNotifications().subscribe(result => this.notifications = result));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
```

# 2. Pas de subscribe dans un subscribe.

Si vous êtes en train d'écrire un `subscribe` dans un `subscribe`, arrêtez tout de suite. Vous risquez un problème de fuite mémoire, (cf dans le point précédent). De plus, votre code sera difficilement maintenable avec ce que l'on appelle un [callback hell](http://callbackhell.com/).

Les opérateurs d'Rxjs vont vous aidez à trouver la solution.
Les deux les plus utilés dans ce contexte seraient : 

- forkJoin
```
forkJoin(this.apiService.call1(), this.apiService.call2())
  .pipe(take(1))
  .subscribe(
    ([result1, result2]) => {}
  );
```

- mergeMap
```
this.apiService.call1.pipe(
  take(1),
  mergeMap(result1 =>
    this.apiService.call2(result1.id2).pipe(
      take(1),
      map(result2 => {})
    )
  )
);
```

# 3. Éviter les fonctions dans les templates

Quand le template contient un appel à une méthode, le moteur de rendu d'Angular va l'exécuter régulièrement.

Si le résultat de cette méthode ne change pas au cours du cycle de vie du composant, il faudrait exécuter ce code qu'une fois dans la méthode `ngInit()` et stocker le résultat dans un attribut. C'est ensuite cet attribut qui devra inséré dans le template. Cette amélioration sera particulièrement intéressante si la méthode fait de longs calculs. 

# 4. Utiliser Ngrx avec précaution

[Ngrx](https://ngrx.io/) est l'implémentation du pattern Flux dans Angular. Ce pattern est très intéressant mais ce n'est pas la réponse à tout dans l'application. Ngrx amène un peu plus de complexité. Il faudra donc l'utiliser uniquement en cas de besoin. 

> Si vous avez vraiment besoin de Ngrx, vous le saurez. 

Le cas typique est lors de la réception d'une notification dans un composant, une donnée dans un composant "éloigner" (ni parent, ni enfant) a besoin d'être rafraîchi. 

Plus généralement, lorsque vous avez besoin de partager des données entre pllusieurs composants qui n'ont pas de parenté direct.

# 5. Éviter ngModel

L'utilisation NgModel dans les formulaires réactifs a été déprécié à partir d'Angular 6.
C'est plutôt une bonne nouvelle, parce que les [Reactive forms](https://angular.io/guide/reactive-forms) d'Angular ont de très bonnes fonctionnalitées. Les formControl et les formGroup simplifient beaucoup la gestion des formulaires.

# 6. Petits composant

Faites de petit composant, la complexité de l'encapsulation sera largement compensée par la simplicité à maintenir chacun des composants.

# 7. Sous-modules

Il est intéressant de découper l'application en sous-module au fur et à mesure du développement dès qu'un domaine fonctionnel se dessine. Cela simplifirait la maintenance et le travail en équipe. 

# 8. Arborescence

Après avoir trouvé vos grands domaines fonctionnels en définissant des modules, il vous faudra un dossier par domaines. Il faudra prévoir un dossier `shared` pour les services, interfaces, authguard,... qui seront partagés par les composants de vos modules.


# 9. Éviter webpack

La configuration du build de l'application avec le cli est assez complète pour la plus part des applications. L'équipe d'Angular se charge de garder une configuration maintenable et upgradable, alors autant en profiter.

# 10. Prettier et TSLint 

Prettier est un formatter avec peu d'options de paramétrage. Le but est de ne pas avoir à se soucier du formatage ni manuellement, ni dans la configuration du formatter.
Combiné à TSLint, votre IDE aura tout ce qu'il faut pour éviter 

# 11. Aot

Aot, signifie Ahead Of time (En avance). En construisant votre application avec `ng build` et en ajoutant l'option `--aot`, vous allez indiquer au moteur de construction d'Angular de compiler votre code html, css et typescript avant de que le navigateur de vos utilisateurs télécharge votre application. 

Le bénéfice est un temps d'exécution réduit car l'effort est fourni au moment de la construction et non au moment de l'exécution.

# 12. Lazy loading

Le lazy loading (chargement fainéant) est un mécanisme qui permet de télécharger les composants que si l'utilisateur en à besoin. 

Comme vu précédement, notre application est découpée en modules fonctionnels (voir §7). En configurant le lazy loading de module, les modules fonctionnels ne vont se télécharger que lorsque l'utilisateur va accéder au composant de ce module. 

L'application saura quand charger un module en fonction des routes.

Pour aller, Je vous invite à accéder à la [documentation officielle](https://angular.io/guide/lazy-loading-ngmodules).

Depuis Angular 9, il est possible d'activer le lazy loading pour seulement un composant. Pour ceci, je vous invite à regarder l'article suivant : [Angular 9: Lazy Loading Components](https://dev.to/angular/angular-9-lazy-loading-components-o04). Comme vous pouvez le voir, le lazy loading de composant ajoute du code "boilerplate", il n'est donc pas à ajouter sur tous les composants. Il est de plus préférable de l'ajouter pour des composants très indépendants. 

# 13. Toujours à jour

L'équipe d'Angular produit une version majeure tous les 6 mois. Qui dit version majeure dit changement bloquant. Mais les nouvelles fonctionnalités apportées par ces mises à jour sont tellement intéressantes qu'il serait dommage de ne pas en profiter.

La mise à jour des dépendances node peuvent être complexe, car certaines versions de package ne fonctionnent qu'avec des versions spécifiques d'autres pdépendances. Il est parfois difficile de s'y retouver.

Heureusement, l'équipe Angular propose deux outils pour rendre cette tâche triviale.

- [update.angular.io](https://update.angular.io/)

C'est un petit site web qui fournit les tâches à réaliser pour faire une mise à jour de version en fonction de la version de départ, de la version cible et de quelques autres paramètres. 

- `ng update`

La cli d'angular est aussi là pour nous aider. la commande `ng update` ou `ng update [nom de dépendance Angular]` va mettre à jour la version d'un ou de toutes les dépendances Angular en surveillant la compatibilité des versions des autres dépendances.

Bien sûr, angular fournit de bonnes documentations pour aller plus loin dans les modifications bloquantes : 
[https://v8.angular.io/](https://v8.angular.io/guide/deprecations)

# 14. *ngFor avec trackBy 

Dans un template html, la modification du contenu d'une liste d'éléments avec ngFor peut prendre beaucoup de temps, surtout si la liste est conséquente.

Pour aider le moteur de rendu, vous devriez définir une fonction `trackBy` qui va indiquer à Angular comment comparer les éléments de la liste. 

```
trackByItems(index: number, item: Item): number { return item.id; }

<div *ngFor="let item of items; trackBy: trackByItems">
  ({{item.id}}) {{item.name}}
</div>
```

# 15. schematics (public ou privé)

Pour simplifier la configuration, vous pouvez utiliser des `schematics`. 

C'est une fonctionnalité de la CLI, qui permet de ajouter ou modifier les fichiers de votre projet pour ajouter ou configurer une fonctionnalité dans votre application.

Il existe déjà beaucoup de schematics, nottament pour ajouter le support des services workers, NgRx, angular material, Boostrap et pleins d'autres

Vous pouvez également créer vous même vos schematics pour utiliser vos conventions de création de composants ou de service, ou bien pour ajouter la configuration de vos outils ou API interne.

Les schematics peuvent vous faire gagner beaucoup de temps de configuration et permet de garder de la consistence dans vos projet.

# 16. Mettre le code métier dans des services

Dans l'organisation du code, placer le code métier dans des services permet de : 
- partager du code métier entre plusieurs composants,
- se donner la possibilité d'externaliser ce code côté serveur en minimisant l'impact dans l'application,
- découper le code avec un fichier par domaine métier

# 17. Typescript

Ce langage en plus du typage apporte beaucoup de fonctionnalités intéressantes, et comme avec tous langages, on peut faire des choses comme beaucoup moins bien.

Il faut donc étudier le langage :
- utiliser le mode strict
- créer des types, des interfaces ou des classes selon le besoin
- utiliser les enum, map,...

# 18. Chargement différentiel

Votre code en Typescript est transpilé en Javascript pour pouvoir être exécuté dans le navigateur de vos utilisateurs.

Dans le fichier de configuration de typescript, il est défini la cible de la transpilation, c'est-à-dire, la version de Javascript. Cette version est importante puisqu'elle va définir quels seront les navigateurs supportés par votre application.

Le chargement différentiel (Differential loading) va créer plusieurs bundles, un par version de Javascript (à configurer). Ceci permet de ne pas pénaliser les navigateurs récents avec un gros bundle contenant du code pour une ancienne version de Javascript inutilement et de garder un large spectre de navigateur compatible.

# 19. use cli 

La CLI d'Angular est un outil très puissant. En plus de générer l'application, des composants et des services, la CLI peut aussi lancer les déploiements sur firebase (seul hébergeur pour le moment).

Pour configurer ceci, il suffit d'utiliser une autre fonctionnalité de la CLI mentionnée plus tôt, les schematics :

```
ng add @angular/fire
ng run my-app:deploy
```

La CLI est pleine de ressource, utilisez-là.


# 22. Angular Element

Angular element permet de transformer un composant Angular en un web component.

L'intérêt peut être très divers : 
- intégrer un ou plusieurs composants dans une application n'utilisant pas Angular (Vanilla ou un autre framework front)
- faire du [micro-frontend](https://www.youtube.com/watch?v=pXnYjCI33Mc)
- s'approcher le plus possible du navigateur (Use the platform)

Attention, si vous utilisez un système de gestion d'état, comme "NgRx", car l'accès à l'état peut être complexe. De plus, un Angular element embarque les library dont il a besoin pour fonctionner, le poid du composant peut donc rapidement augmenter.

Pour aller plus loin, rendez-vous sur la [documentation officielle](https://angular.io/guide/elements#transforming-components-to-custom-elements)
