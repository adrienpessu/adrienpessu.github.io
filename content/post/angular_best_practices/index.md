+++
title = "Top 10 des meilleurs pratiques Angular 6+"
subtitle = "Les meilleurs pratiques pour garder une appplication maintenable"
summary = ""
date = 2019-04-16T00:00:00Z
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

Si vous êtes en train d'écrire un subscribe, arrêtez tout de suite. Car votre code sera difficilement maintenable avec ce que l'on appelle un [callback hell](http://callbackhell.com/). De plus, le problème de fuite mémoire potentiel, vu dans le point précédent, sera très difficile à éviter.

La solution est les opérateurs d'Rxjs. 
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

Lorsque le template contient un appel à une méthode, le moteur de rendu d'Angular va l'exécuter régulièrement. 
Si le résultat de cette méthode ne change pas au cours du cycle de vie du composant, il vaudrait mieux exécuter ce code qu'une fois dans la méthode `ngInit()` et stocker le résultat dans un attribut. C'est ensuite cet attribut qui devra inséré dans le template. Cette amélioration sera particulièrement intéressante si la méthode fait de longs calculs. 

# 4. Utiliser Ngrx avec précaution

[Ngrx](https://ngrx.io/) est l'implémentation du pattern Flux dans Angular. Ce pattern est très intéressant mais ce n'est pas la réponse à tout dans l'application. Ngrx amène un peu plus de complexité. Il faudra donc l'utiliser uniquement en cas de besoin. Et si vous avez vraiment besoin, vous le saurez. 
Le cas typique est lors de la réception d'une notification dans un composant, une donnée dans un composant "éloigner" (ni parent, ni enfant) a besoin d'être rafraîchi. 

# 5. Avoid ngModel

L'utilisation NgModel dans les formulaires réactifs a été déprécié à partir d'Angular 6.
C'est plutôt une bonne nouvelle, parce que les [Reactive form](https://angular.io/guide/reactive-forms) d'Angular ont de très bonnes fonctionnalités. Les formControl et les formGroup simplifient beaucoup les formulaires.

# 6. Petits composant

Faites de petit composant, la complexité de l'encapsulation sera largement compensée par la simplicité à maintenir chacun des composants.

# 7. Sous-modules

Il est intéressant de découper l'application en sous-module au fur et à mesure du développement dès qu'un domaine fonctionnel se dessine. Cela simplifirait la maintenance et le travail en équipe. 

# 8. Arborescence

Après avoir trouvé vos grands domaines fonctionnels en définissant des modules, il vous faudra un dossier par domaines. Il faudra prévoir un dossier `shared` pour les services, interfaces, authguard,... qui seront partagés par les composants de vos modules.

# 9. Éviter webpack

La configuration du build de l'application avec le cli est assez complète pour la plus part des applications. L'équipe d'Angular se charge de garder une configuration maintenable, alors autant en profiter.

# 10. Prettier et TSLint 

Prettier est un formatter avec peu d'options de paramétrage. Le but est de ne pas avoir à se soucier du formatage ni manuellement, ni dans la configuration du formatter.
Combiné à TSLint, votre IDE aura tout ce qu'il faut pour éviter 


