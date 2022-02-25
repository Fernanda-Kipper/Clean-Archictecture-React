<h1 align="center" style="color: #805ad5; font-weight: bold;">
  Clean Architecture
</h1>

<p align="center">
 <a href="#tech">Technolgies</a> • 
 <a href="#clone">Clone</a> • 
 <a href="#contribute">Contribute</a> •
 <a href="#license">License</a>
</p>

<p align="center">
<b>This application consists in a polling platform for programmers with login but its main objective is to apply the concepts of Clean Architecture and Test Driven Development in a Frontend application using React JS</b>
</p>


<h2 id="tech">Technologies</h2>
  This application architecture is organized in the following lawyers:

  - **Domain** - the use cases of the application AK business rules
  - **Infrastructure** - implementation of dependencies of the domain some times using third party libraries, making the domain layer decoupled from the implementation with 3rd party libraries 
  - **Presentation** - interface, presentation responsible for making the communication of your use cases to users
  - **Main** - unique location in an application where modules are composed together

<h2 id="clone">Clone</h2>

<h4> Prerequisites</h4>

- Node >= 10.16 e npm >= 5.6 
- Package manager - NPM or YARN

<h4>Starting</h4>

```bash
git clone https://github.com/Fernanda-Kipper/Clean-Archictecture-React.git clean-react
npm install
```

<h5>Start server </h5>

```bash
  cd clean-react
  npm start
```

<h2 id="contribute">Contribute 🚀</h2>

If you want to contribute, clone this repo, create your work branch and get your hands dirty!

```bash
git clone https://github.com/Fernanda-Kipper/Clean-Archictecture-React.git
git checkout -b feature/NAME
```

 At the end, open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!

[How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)


<h2 id="license">License 📃 </h2>

This project is under [MIT](LICENSE) license


