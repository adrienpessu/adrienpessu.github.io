+++
title = "CORS, XSS, CSRF, SQL injection #BackToTheBasics"
date = 2019-02-01T12:20:41+01:00  # Schedule page publish date.
draft = false

# Talk start and end times.
#   End time can optionally be hidden by prefixing the line with `#`.
time_start = 2019-02-08T12:05:41+01:00
time_end = 2019-02-08T13:05:41+01:00

# Abstract and optional shortened version.
abstract = ""

# Name of event and optional event URL.
event = "Devfest Paris"
event_url = "https://devfest-paris-2019.firebaseapp.com/schedule/2018-02-08?sessionId=114"

# Location of event.
location = "Devfest Paris"

# Is this a selected talk? (true/false)
selected = true

# Projects (optional).
#   Associate this talk with one or more of your projects.
#   Simply enter the filename (excluding '.md') of your project file in `content/project/`.
#   E.g. `projects = ["deep-learning"]` references `content/project/deep-learning.md`.
projects = []

# Tags (optional).
#   Set `tags = []` for no tags, or use the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["Conf", "securite", "Xss", "cors", "csrf"]

# Links (optional).
url_pdf = ""
url_slides = "https://adrienpessu.github.io/slides/cors_xss_csrf_sqlInjection/#/"
url_video = ""
url_code = "https://github.com/adrienpessu/cors-xss-csrf-sqli-backtothebasics"

# Does the content use math formatting?
math = false

# Does the content use source code highlighting?
highlight = true

# Featured image
# Place your image in the `static/img/` folder and reference its filename below, e.g. `image = "example.jpg"`.
[header]
image = ""
caption = ""

+++
Pas besoin d'être RSSI ou DevOpsSec pour se soucier de sécurité. Que l'on soit développeur back ou front, la sécurité est l'affaire de tous.
Pourtant, on la confie souvent aveuglement à nos frameworks. Mais alors comment vérifier la sécurité de nos données et de nos utilisateurs.
A travers quelques démos, nous allons voir les failles les plus basiques et pourtant les plus répandus : CORS, XSS, CSRF et SQL injection