+++
title = "Comment supprimer les branches locales qui ont été supprimées sur le remote ?"
subtitle = ""
summary = ""
date = 2020-07-01T00:00:00Z
draft = false

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Adrien Pessu"]

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["CI", "git"]
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

Pour simplifier la navigation entre les branches en local, il peut être intéressant de supprimer les anciennes branches qui n'existent plus sur le `remote`

Il suffit, en ligne de commande, de se placer dans le répertoire de notre projet.
Et de lancer la commande suivante :  
```
git fetch -p && for branch in $(git branch -vv | grep ': gone]' | awk '{print $1}'); do git branch -D $branch; done
```

Pour rappel, une fois qu'une branche est mergée sur une branche principale, il faut la supprimer automatiquement.

