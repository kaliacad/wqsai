/* eslint-disable react/prop-types */
export default function Query({ text }) {
  const query = text.replace("```sparql", "").replace("```", "");
  return (
    <div className="flex-1 border-b border-[#eee]">
      <iframe
        style={{ width: "100%", "maxWidth": "100%", height: "100%" }}
        src={`https://query.wikidata.org/#${encodeURIComponent(query)}`}
      ></iframe>
    </div>
  );
}
