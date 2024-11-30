# Wikidata Query with AI

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/kaliacad/wikidataqueriIA/graphs/commit-activity)
[![GitHub contributors](https://badgen.net/github/contributors/kaliacad/wikidataqueriIA)](https://GitHub.com/kaliacad/wikidataqueriIA/graphs/contributors/)
[![GitHub branches](https://badgen.net/github/branches/kaliacad/wikidataqueriIA)](https://github.com/kaliacad/wikidataqueriIA/)
[![GitHub forks](https://badgen.net/github/forks/kaliacad/wikidataqueriIA/)](https://GitHub.com/kaliacad/wikidataqueriIA/network/)
[![GitHub issues](https://badgen.net/github/issues/kaliacad/wikidataqueriIA/)](https://GitHub.com/kaliacad/wikidataqueriIA/issues/)
[![GitHub commits](https://badgen.net/github/commits/kaliacad/wikidataqueriIA)](https://GitHub.com/kaliacad/wikidataqueriIA/commit/)
[![GitHub total-pull-requests](https://badgen.net/github/prs/kaliacad/wikidataqueriIA)](https://GitHub.com/kaliacad/wikidataqueriIA/pull/)

### WikidataQuery + Resultat

![](./screenshots/wikidata-query-with-data.png)

### WikidataQuery + While fetching data

![](./screenshots/wikidata-query-white-fetching-data.png)

This project enables users to write and execute SPARQL queries on Wikidata directly within an Express.js application, without needing to visit the Wikidata website.

## Features

- Execute SPARQL queries
- Retrieve and display query results in a user-friendly interface
- Built with React and Vite for a modern front-end experience

## Prerequisites

- Node.js and npm installed
- Basic understanding of SPARQL and Wikidata

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/kaliacad/wikidataqueriIA.git
   cd wikidataqueriIA
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Add .env file
   ```sh
   app
      - api
      - docs
      - web
         .env.example
   ```
   ```js
   VITE_OPEN_AI_API_KEY=AIzaSyExample-YourGoogleAPIKey12345678
   ```

## Usage

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`.

## Folder Structure

- `public/` - Static assets
- `src/` - Source code for the React front-end
- `index.html` - Main HTML file
- `package.json` - Project metadata and dependencies
- `vite.config.js` - Vite configuration

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

#

👉 **Explore and Interact**:

Have fun with the project!

## ⚠ Disclaimer

We are deeply committed to fostering genuine open-source contributions. Consequently, we maintain a strict policy against the use of plagiarized source code. Any Pull Requests (PRs) that do not adhere to our Terms and Conditions will be identified as spam and subsequently closed by our maintainers.

Please be aware that we do not accept responsibility for any potential damages resulting from the scripts or programs included in this repository. These projects are publicly curated and do not undergo stringent malware or virus checks. Therefore, neither the maintainers nor the owner of this repository can be held accountable for any issues arising from running any of the programs or applications found within this repository.

##### <p align="center">Hurray! Now you are a part of the open-source community 🚀🚀🚀</p>


## Contributors

<a href="https://github.com/kaliacad/wikidataqueriIA/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kaliacad/wikidataqueriIA" />
</a>
