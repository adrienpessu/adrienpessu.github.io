+++
title = "Comment trouver le processus occupant un port sous MacOS"
subtitle = ""
summary = ""
date = 2020-03-02T00:00:00Z
draft = false

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Adrien Pessu"]

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["macos", "network"]
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

Pour connaitre le processu qui occupe un port HTTP sous MacOS


```
lsof -nP -iTCP:8080
```

pour le port 8080

Ensuite, il suffit de noter le PID et de lancer la commande 


```
kill $PID
```

ou 

```
kill -9 $PID
```

Il devrait être envisagé de trouver le processus parent avec 

```
ps -ef | grep $PID
```
