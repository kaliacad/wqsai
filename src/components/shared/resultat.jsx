import { useState } from "react";
import Header from "../layout/header";
import { Element } from "./element";
import { ResultatSqueletton } from "./result-skeleton";
import { useToast } from "../hooks/use-toast";
import { useTextStore } from "../../stores/useTextStore";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function Resultat({ text }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const items = 15;

  const storeText = useTextStore((s) => s.sparqlText);
  const { toast } = useToast();

  const onClick = () => {
    const queryText = storeText || text || "";

    if (!queryText || queryText.trim().length === 0) {
      toast({
        title: "No query provided",
        description: "Please enter a SPARQL query in the editor before running.",
        variant: "warning",
      });
      return;
    }

    const runToast = toast({
      title: "Running query",
      description: "Sending query to Wikidata...",
      variant: "info",
    });

    const endpointUrl = "https://query.wikidata.org/sparql";
    const fullUrl = endpointUrl + "?query=" + encodeURIComponent(queryText);
    const headers = { Accept: "application/sparql-results+json", origin: "*" };

    setLoading(true);
    setData([]);

    fetch(fullUrl, { headers })
      .then(async (response) => {
        if (!response.ok) {
          const txt = await response.text().catch(() => "");
          throw new Error(`HTTP ${response.status} ${response.statusText} ${txt}`);
        }
        return response.json();
      })
      .then((dataResp) => {
        const bindings = dataResp?.results?.bindings || [];
        setData(bindings);
        setPage(1);

        if (bindings.length === 0) {
          runToast.update({
            title: "No results",
            description: "The query returned no items.",
            variant: "info",
          });
        } else {
          runToast.update({
            title: "Query succeeded",
            description: `Returned ${bindings.length} result(s).`,
            variant: "default",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
        runToast.update({
          title: "Query failed",
          description: error?.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const start = (page - 1) * items;
  const res = data.slice(start, start + items);
  const totalPages = Math.ceil(data.length / items);

  // Générer les numéros de page avec la logique de limitation et de points de suspension
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (page > 3) {
        pageNumbers.push("ellipsis-start");
      }
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(i);
        }
      }

      if (page < totalPages - 2) {
        pageNumbers.push("ellipsis-end");
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

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
        {data.length > 0 ? (
          <div className="h-full overflow-auto">
            <ul className="px-4 py-4">
              {res.map((item, index) => (
                <Element key={index} item={item} />
              ))}
            </ul>
            <div className="px-4 mt-4 pb-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage(page - 1);
                      }}
                      className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {pageNumbers.map((pageNumber, index) => {
                    if (pageNumber === "ellipsis-start" || pageNumber === "ellipsis-end") {
                      return (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(pageNumber);
                          }}
                          isActive={pageNumber === page}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) setPage(page + 1);
                      }}
                      className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-6 text-center text-sm text-gray-600">
            {!storeText || storeText.trim().length === 0 ? (
              <div>
                <div className="mb-2 font-medium">No SPARQL query</div>
                <div>Open the editor and enter a SPARQL query, then click Run.</div>
              </div>
            ) : (
              <div>
                <div className="mb-2 font-medium">No results</div>
                <div>The query returned no items. Try modifying the query.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
