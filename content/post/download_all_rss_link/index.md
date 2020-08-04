+++
title = "Comment télécharger les mp3 d'un flux rss ?"
subtitle = ""
summary = ""
date = 2020-07-01T00:00:00Z
draft = false

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Adrien Pessu"]

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["bash"]
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

Imaginons l'url d'un flux rss `https://test.com/rss`, ce flux rss est un fichier xml contenant une balise ayant l'url du fichier que l'on veut télécharger.

Nous pourrons télécharger ces fichiers avec la commande suivante : 
```
for i in `curl https://test.com/rss | xmlstarlet sel -t -v "//link"` ; do curl -L -o ${i##*/}.mp3  $i ; done
```

Afficher le contenu du rss
```
curl https://test.com/rss 
```

Selectionner uniquement le contenu de toutes balises `link` du flux rss de `https://test.com`

```
curl https://test.com/rss | xmlstarlet sel -t -v "//link"
```

Télécharger le flux rss `https://test.com/rss` en suivant les redirections (-L) dans le repertoire courant avec pour nom de fichier la dernière partie de l'url

```
curl -L -o ${i##*/}.mp3  $i
```

