export async function generateSparqlQuery(question) {
  const apiUrl = "/openai-proxy/v1/chat/completions";

  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error(
      "OpenAI API key manquante. Ajoutez VITE_OPENAI_API_KEY dans .env (proxy Vite)."
    );
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Donne moi le code SPARQL de la requete qui trouver "${question}". Donne seulement le code SPARQL, commenté et utilise seulement le "wdt" et les "wd"`,
          },
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const detail =
        errorBody?.error?.message || response.statusText || "Erreur API OpenAI";

      if (errorBody?.error) {
        const err = new Error(errorBody.error.message || detail);
        err.type = errorBody.error.type;
        err.code = errorBody.error.code;
        err.status = response.status;
        throw err;
      }

      const err = new Error(detail);
      err.status = response.status;
      throw err;
    }

    const data = await response.json();

    if (!data?.choices?.length) {
      throw new Error(
        "Aucune réponse reçue de l'API ou format de réponse inattendu"
      );
    }

    const res = data.choices[0].message.content || "";
    const cleaned = res.includes("```")
      ? res.split("```")[1]?.replace("sparql", "").trim() || ""
      : res.trim();

    return cleaned;
  } catch (error) {
    console.error("Erreur lors de la requête de l'API :", error);
    throw error;
  }
}