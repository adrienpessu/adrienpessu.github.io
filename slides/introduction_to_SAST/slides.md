---
marp: true
theme: gaia
paginate: true
footer: @adrienpessu
---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}
</style>

Introduction aux outils de tests de sécurité d'application statique (SAST)
===


###### by Adrien Pessu   ![h:50](../../assets/github.png)

![h:300 center](assets/NUX_Octodex.gif)

---

# Introduction

![h:300 center](assets/devsecops.png)

---

# Introduction

![h:400 center](assets/giphy_security.gif)

---

# Definition

OWASP

Static Code Analysis commonly refers to the running of Static Code Analysis tools that attempt to highlight possible vulnerabilities within '**static**' (non-running) source code by using techniques such as Taint Analysis and Data Flow Analysis.

---

# :factory: Goals


- 📝 An automated tool to analyse source code
  - Automate Code Review
- 🔍 Discover known security issues
- 🔁 Discover repetitive security issues
- #️⃣ Looks at the code without running the code
- Security analysis for Security Engineers / Researchers


---

# Search in code

```
grep setDangerousHTML index.ts
```

---

# Remediation

```
sed -i 's/setDangerousHTML/void/g' index.ts
```

---

# Merci de votre attention

![h:300 center](assets/applause.gif)

--- 

# :factory: Workflow


📝 Code => 🏗️ Models => 💬 Patterns => 📑 Results!

---

# :factory: Code

**Source Code Analysis** 
vs  
**Binary / Bytecode Analysis**

--- 

# :factory: Abstract Syntax Tree (AST)

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

![h:300 center](assets/ast.png)

---

# :factory: Control-flow graph

```java
if  (a > 10) {
  if (b > c) {
     c = b;
  } else {
    a = c;
  }
}
System.out.println(a);
System.out.println(b);
System.out.println(c);
```
---

# :factory: Control-flow graph

![w:1100 center](assets/control-flow.png)

---


# :factory: Data-flow graph

```java
int target = input();

String targetAsString = "Input: " + target

System.out.println(targetAsString)
```

![w:1100 center](assets/data-flow.png)

---   

![bg right:33%](assets/sink.webp)
# :factory: ⚡ Taint Analysis

- Sources (user controlled inputs)
- Sinks (dangerous methods / assignments)
- Sanitizers (secures the user data)
- Passthroughs (functions that track tainte- data)

<!-- Filter resuts -->

---

# :factory: Pattern


Using something insecure

- Configurations / Setting
- "Is debugging set to True?"

---

# :factory: Pattern


🏖️ Data flows into somewhere insecure

User Input => [some other stuff] => `sql.execute(input)`

---

# :factory: Results


- ⚠️ Security Issues
  - SQL Injection, Cross Site Scripting, ...
- ✨ Best Practices
  - Using Key Vaults, ...
- 🔎 Code Quality and Code Smells
  - Long Functions, Duplicated code, ...
- 👍 Positive Results
    - Using appropriate hashing algorithm  
    - automatic encoding, ...

---

# :factory: Configuration

- 📏 Configuration Rules (yaml, json, data tructure...)
  - Simpler to write
  - Complex flows can be very hard to declare
- ⚙️ Dynamic Queries (#️⃣ programming like language)
  - Harder to learn and write
  - Complex flows are easier

---

# Demo?

---

# Conclusion

- Easy to configure
- False positive (Context)
- Easy to add in Code Review / CI

Thanks to *@geekmasher*

---

# Slides

https://adrienpessu.github.io/slides/introduction_to_SAST/