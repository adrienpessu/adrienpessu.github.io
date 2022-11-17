---
marp: true
theme: gaia
paginate: true
footer: @adrienpessu
---

Open source + Security = ❤️ 
===


###### by Adrien Pessu ([@adrienpessu][GitHub])   ![h:50](../../assets/github.png)

[GitHub]: https://github.com/adrienpessu
---

# Introduction

* forteresse
* tout est accessible donc on verra les bug de sécu
* si on est plusieurs entreprises à utiliser un projet open source. On aura plusieurs cas d'usage
---
# Agenda

* :factory: OWASP
* :memo: Open source security foundation 
* :gear: MITRE
* :tv: How to open source

---

# :factory: OWASP

The *Open Web Application Security Project®* (OWASP) is a __nonprofit foundation__ that works to improve the security of software. 
- open-source software projects, 
- hundreds of local chapters worldwide, 
- tens of thousands of members, 
- and leading educational and training conferences

---

# :factory: OWASP

![h:300 center](assets/top10owasp.png)


https://owasp.org/Top10/fr/

---


# :factory: OWASP

![w:600 center](assets/owaspprojects.png)

---

# :factory: OWASP ZAP (Zed Attack Proxy)


- Proxy
- App Scanner

---

# :factory: OWASP Dependency-check

![h:100](assets/dc.svg)

 

`dependency-check --project "myproject" --scan [project_path] --out [output_path]`

---   
# :factory: OWASP AMASS

Network mapping of attack surfaces and external asset discovery. Using Information Gathering Techniques :
- API : Pastebin, Twitter, GitHub, ....
- Certificates: Digitorus, FacebookCT, GoogleCT, ...
- DNS: Brute forcing, Reverse DNS sweeping, NSEC zone walking, ..

Routing, Scraping, Web Archives, WHOIS

`amass enum -d example.com`

---

# :memo: Open source security foundation 



--- 


# :gear: MITRE

- American not-for-profit organization
- *"provide evidence-based, objective and nonpartisan insights for government policymaking"*


---

# :gear: MITRE

- CVE : Common Vulnerabilities and Exposures
  
![h:250](assets/cve_log4j2.png)

- ATT&CK : knowledge base of adversary tactics and techniques based on real-world observations

---

# :tv: How to open source but safely
<!-- _class: invert -->

## CodeQL && Secret scanning

![h:350](assets/codeql_pr.png)

---


# :tv: How to open source but safely
<!-- _class: invert -->

![h:400](assets/dependabot.png)

---


# :tv: How to open source but safely
<!-- _class: invert -->

![h:350](assets/github_disclose.webp)

---


# Conclusion

All over the world

We should contribute : 
- Code
- Doc
- Talks
- Blog posts
- ...

