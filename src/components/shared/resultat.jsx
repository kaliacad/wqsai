import { useState } from "react";
import Header from "../layout/header";
import {Element} from "./element";
import { ResultatSqueletton } from "./result-skeleton";

export function Resultat({ text }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const items = 15;

  const onClick = () => {
    const endpointUrl = "https://query.wikidata.org/sparql";
    const fullUrl = endpointUrl + "?query=" + encodeURIComponent(text);
    const headers = { Accept: "application/sparql-results+json", origin: "*" };
    setLoading(true);

    fetch(fullUrl, { headers })
      .then((response) => response.json())
      .then((data) => {
        setData(data.results.bindings);
        setPage(1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
        setLoading(false);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  const handleClickNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleClickPrev = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const start = (page - 1) * items;
  const res = data.slice(start, start + items);
  const totalPages = Math.ceil(data.length / items);

  // Générer les numéros de page avec la logique de limitation et de points de suspension
  const pageNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (page > 3) {
      pageNumbers.push("...");
    }
    let startPage = Math.max(2, page - 1);
    let endPage = Math.min(totalPages - 1, page + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (page < totalPages - 2) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  if (loading) {
    return (
      <aside className="h-[100%] flex flex-col">
        <Header onClick={onClick} />
        <div className="overflow-scroll">
          {"application/sparql-results+json".split("").map(function (d, i) {
            return <ResultatSqueletton key={`${d + i}`} />;
          })}
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-full min-h-0 flex flex-col">
      <Header onClick={onClick} />
      <div className="min-h-0 flex-1">
        {data.length > 0 && (
          <div className="h-full overflow-auto">
            <ul className="px-4 py-4">
              {res.map((item, index) => (
                <Element key={index} item={item} />
              ))}
            </ul>
            <div className="flex justify-between px-4 mt-4">
              <button
                onClick={handleClickPrev}
                disabled={page === 1}
                className="bg-[#506efa] text-white px-3 py-1 rounded-md"
              >
                Previous
              </button>
              <div className="flex">
                {pageNumbers.map((pageNumber, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof pageNumber === "number" &&
                      handlePageClick(pageNumber)
                    }
                    className={`px-3 py-1 rounded-md mx-1 ${
                      pageNumber === page
                        ? "bg-[#506efa] text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    disabled={typeof pageNumber !== "number"}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
              <button
                onClick={handleClickNext}
                disabled={start + items >= data.length}
                className="bg-[#506efa] text-white px-3 py-1 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
