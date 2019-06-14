+++
title = "Comment debugger l'intégration continue"
subtitle = ""
summary = ""
date = 2019-06-14T00:00:00Z
draft = false

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Adrien Pessu"]

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["CI", "Gitlab", "Gitlabci", "Continious", "integration"]
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

Quand l'intégration continue s'exécute sur un serveur sans accès SSH, il est difficile de debugger. C'est très contraignant de devoir faire une modification dans le fichier de configuration de l'intégration continue et d'attendre tout le déploiement.

Heureusement Docker est là pour nous aider.
Il suffit, en ligne de commande, de se placer dans le répertoire de notre projet.
Et de lancer la commande suivante :  
```
docker run -it --volume=$(pwd):/my-project --workdir="/my-project" --memory=2g --memory-swap=2g --memory-swappiness=0 --entrypoint=/bin/bash node:lts
```

Cette commande lance un container docker `node:lts` (à changer en fonction de votre environnement). L'option `-it` va lancer l'invité de commande dans le container. L'option `--volume=$(pwd):/my-project` va ajouter un volume docker avec le continu du répertoire courant dans le répertoire `/my-project`. L'option `--workdir="/my-project"` va placer l'invité de commande dans le répertoire `/my-project`. Les options `--memory-swap=2g --memory-swappiness=0` vont limiter les ressources de ce container. Et enfin, l'option `-entrypoint=/bin/bash` indique que l'on utilise `bash` comme interpréteur de commande.
