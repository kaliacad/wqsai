// import { API_KEY } from "../../env";


async function getGPT(question) {
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  console.log(question);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Donne moi le code SPARQL de la requete qui trouver "${question}". Donne seulement le code SPARQL, commenté et utilise seulement le "wdt" et les "wd"`,
          },
        ],
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    // Vérifier si data, data.choices et data.choices[0] existent
    if (!data || !data.choices || !data.choices.length) {
      throw new Error(
        "Aucune réponse reçue de l'API ou format de réponse inattendu"
      );
    }

    const res = await data.choices[0].message.content;
    console.log(res.split("```")[0]);
    return res.split("```")[0];
  } catch (error) {
    console.error("Erreur lors de la requête de l'API :", error);
  }
}

export default getGPT;
