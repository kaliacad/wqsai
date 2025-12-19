# Wikidata Query with AI

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/kaliacad/wqsai/graphs/commit-activity)
[![GitHub contributors](https://badgen.net/github/contributors/kaliacad/wqsai)](https://GitHub.com/kaliacad/wqsai/graphs/contributors/)
[![GitHub branches](https://badgen.net/github/branches/kaliacad/wqsai)](https://github.com/kaliacad/wqsai/)
[![GitHub forks](https://badgen.net/github/forks/kaliacad/wqsai/)](https://GitHub.com/kaliacad/wqsai/network/)
[![GitHub issues](https://badgen.net/github/issues/kaliacad/wqsai/)](https://GitHub.com/kaliacad/wqsai/issues/)
[![GitHub commits](https://badgen.net/github/commits/kaliacad/wqsai)](https://GitHub.com/kaliacad/wqsai/commit/)
[![GitHub total-pull-requests](https://badgen.net/github/prs/kaliacad/wqsai)](https://GitHub.com/kaliacad/wqsai/pull/)
[![Phabricator](https://img.shields.io/badge/Phabricator-Workboard-blue)](https://phabricator.wikimedia.org/tag/wdqsai/)
[![Telegram](https://img.shields.io/badge/Telegram-Community-blue)](https://t.me/+AAgc4H95G9liZDhk)

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

- Node.js and pnpm installed
- Basic understanding of SPARQL and Wikidata

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/kaliacad/wqsai
   cd wqsai
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

## Usage

1. Start the development server:

   ```sh
   pnpm dev
   ```

2. Open your browser and navigate to `http://localhost:5173`.

## Getting Started

To get started with querying, you can run this example SPARQL query to see the results:

```sparql
SELECT ?pays ?paysLabel ?capitaleLabel ?codeISO2 WHERE {
  # Trouver les instances de pays (wd:Q6256)
  ?pays wdt:P31 wd:Q6256.
  
  # Filtrer pour les pays du continent africain (wd:Q15)
  ?pays wdt:P30 wd:Q15.
  
  # Optionnel : obtenir la capitale
  OPTIONAL { ?pays wdt:P36 ?capitale. }
  
  # Optionnel : obtenir le code ISO 3166-1 alpha-2
  OPTIONAL { ?pays wdt:P297 ?codeISO2. }
  
  # Service pour les labels en français
  SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "fr,en". 
  }
}
ORDER BY ?paysLabel
```

This query will return African countries with their capitals and ISO codes. Simply copy and paste it into the editor and click "Run Query" to see the results.

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

## Explore and Interact

Have fun with the project!

We are deeply committed to fostering genuine open-source contributions. Consequently, we maintain a strict policy against the use of plagiarized source code. Any Pull Requests (PRs) that do not adhere to our Terms and Conditions will be identified as spam and subsequently closed by our maintainers.

## Contributors

<a href="https://github.com/kaliacad/wqsai/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kaliacad/wqsai" />
</a>
