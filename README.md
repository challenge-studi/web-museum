# WebMuseum

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=bugs)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=coverage)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=challenge-studi_web-museum&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum)

Bienvenue dans le projet de musée développé avec Angular

# Installation

```bash
git clone https://github.com/challenge-studi/web-museum.git
```

```bash
npm install
```

## Serveur de Developpemment

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Presentation des outils utilisés

[SonarLint](https://docs.sonarsource.com/sonarqube-cloud/) : Pour assurer un code propre et de haute qualité.

[Gitmoji](https://gitmoji.dev/) : Pour des messages de commit amusants et informatifs.

[Jira](https://www.atlassian.com/fr/software/jira/guides/getting-started/basics#step-1-create-a-project) : Pour la gestion du projet.

[confluence](https://www.atlassian.com/fr/software/confluence) : pour le partage de documentation

## Déploiement

Le déploiement continu est configuré avec GitHub Actions et docker sur un VPS:

## docker

L'image docker est disponible ici :
https://hub.docker.com/r/ponche/museum/tags

```bash
docker run -p:8080:8080 -d ponche/museum:dev-latest
```

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=challenge-studi_web-museum)](https://sonarcloud.io/summary/new_code?id=challenge-studi_web-museum)
