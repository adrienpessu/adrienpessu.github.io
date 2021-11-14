+++
title = "Oauth2, safe and secure"
subtitle = "L'implémentation d'Auth2 n'est pas évidente et nous faisons souvent les erreurs."
summary = ""
date = 2021-11-15T00:00:00Z
draft = true

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Adrien Pessu"]

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["Auth2", "Authorisation", "Security", "Securité"]
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

# définition
## Utilisation avec google par example
## On est dans une PWA et avec une API stateless alors attention

étape :
1: génère un state avec l'identifiant de l'utilisateur courant (chiffré)
2: on redirige vers le provider
3: Le provider redirige vers notre server
4: on récupère le state et on vérifie que c'est bien celui que l'on a envoyé
5: on récupère le token temporaire pour récupérer un token permanent
6: On stocke le token permanent


# Et si on hacker vous envoyait son lien de redirection, alors vous allez authorise son compte à accéder à votre compte provider

étape :
1: génère un state avec l'identifiant de l'utilisateur courant (chiffré)
2: on redirige vers le provider
3: Le provider redirige vers notre server
4: on récupère le state et on vérifie qu'il est valide
5: on stocke temporairement le token associé à l'identifiant 
6: on redirige vers le front pour refaire un requête avec l'access token correspondant à notre application
6: On vérifie que l'utilisateur courant (à partir de l'access token de notre application) est bien celui du state
7: on récupère le token temporaire pour récupérer un token permanent
8: On stocke le token permanent
