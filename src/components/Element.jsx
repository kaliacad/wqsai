export default function Element({ item }) {
  const itemArray = Object.keys(item);
  console.log(item[itemArray[0]]);
  return (
    <li className="bg-[#eee] mb-2 px-1 py-2 text-slate-700 border-l-4 border-[#506efa] rounded">
      {itemArray.map((e, i) => (
        <p key={i} className="">
          {item[e].value}
        </p>
      ))}
    </li>
  );
}
