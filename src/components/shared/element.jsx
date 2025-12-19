export function Element({ item }) {
  const itemArray = Object.keys(item);
  console.log(item[itemArray[0]]);
  
  // Trouver l'URI Wikidata dans les propriétés
  const findWikidataUri = () => {
    for (const key of itemArray) {
      const value = item[key]?.value;
      if (typeof value === 'string' && value.startsWith('http://www.wikidata.org/entity/')) {
        return value;
      }
    }
    return null;
  };

  const wikidataUri = findWikidataUri();
  
  // Extraire l'ID Wikidata (Q123, P456, etc.) de l'URI
  const getWikidataId = (uri) => {
    if (!uri) return null;
    const match = uri.match(/\/entity\/([QP]\d+)$/);
    return match ? match[1] : null;
  };

  const wikidataId = getWikidataId(wikidataUri);
  const wikidataUrl = wikidataId ? `https://www.wikidata.org/wiki/${wikidataId}` : null;

  const content = (
    <div>
      {itemArray.map((e, i) => (
        <p key={i} className="">
          {item[e].value}
        </p>
      ))}
    </div>
  );

  if (wikidataUrl) {
    return (
      <li className="bg-[#eee] mb-2 px-1 py-2 text-slate-700 border-l-4 border-[#506efa] rounded hover:bg-[#ddd] transition-colors cursor-pointer">
        <a 
          href={wikidataUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block no-underline text-inherit"
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li className="bg-[#eee] mb-2 px-1 py-2 text-slate-700 border-l-4 border-[#506efa] rounded">
      {content}
    </li>
  );
}
