import { useState, useEffect } from "react";
import { useTextStore } from "./stores/useTextStore";
import { Query } from "./components/shared/query";
import { MonacoEditor } from "./components/shared/editor";
import { Resultat } from "./components/shared/resultat";
import { Footer } from "./components/layout/footer";
import { generateSparqlQuery } from "./api/sparql-generator";
import { useToast } from "@/components/hooks/use-toast";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function App() {
  const sparqlText = useTextStore((s) => s.sparqlText);
  const setSPARQLText = useTextStore((s) => s.setSPARQLText);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      const resp = await generateSparqlQuery(input);
      setText(resp);

      setMessage([
        ...message,
        { user: "me", msg: `${input}` },
        { user: "ai", msg: `${resp}` },
      ]);

      setInput("");
    } catch (err) {
      const known = [401, 403, 429, 500, 503];
      const knownTypes = ["insufficient_quota"];
      const isKnown = known.includes(err?.status) || knownTypes.includes(err?.type) || known.includes(Number(err?.code));

      // choose variant: warnings for auth/quota/rate limits, info for server messages, destructive for unknown
      let variant = undefined;
      if (!isKnown) variant = "destructive";
      else if (err?.type === "insufficient_quota" || err?.status === 429) variant = "warning";
      else if (err?.status === 401 || err?.status === 403) variant = "warning";
      else if (err?.status === 500 || err?.status === 503) variant = "info";
      else variant = "info";

      toast({
        title: isKnown ? "Info" : "Erreur inconnue",
        description: err?.message || "Impossible de générer la requête.",
        variant,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunQuery = async (query) => {
    try {
      const result = await generateSparqlQuery(query);
      // Assuming result is the data to display, perhaps set it to some state
      // For now, just log or handle as needed
      console.log(result);
    } catch (err) {
      const known = [401, 403, 429, 500, 503];
      const knownTypes = ["insufficient_quota"];
      const isKnown = known.includes(err?.status) || knownTypes.includes(err?.type) || known.includes(Number(err?.code));

      let variant = undefined;
      if (!isKnown) variant = "destructive";
      else if (err?.type === "insufficient_quota" || err?.status === 429) variant = "warning";
      else if (err?.status === 401 || err?.status === 403) variant = "warning";
      else if (err?.status === 500 || err?.status === 503) variant = "info";
      else variant = "info";

      toast({
        title: isKnown ? "Info" : "Erreur inconnue",
        description: err?.message || "Impossible de générer la requête.",
        variant,
      });
    }
  };

  useEffect(() => {
    setSPARQLText(text);
  }, [text, setSPARQLText]);

  return (
    <main role="main" className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-hidden">
        {/* Desktop layout - left vertical split for Query and AI, right for Result */}
        <div className="hidden md:block h-full min-h-0">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full min-h-0"
          >
            {/* Left side with Query and AI vertically */}
            <ResizablePanel defaultSize={50} minSize={30} className="min-h-0">
              <ResizablePanelGroup
                direction="vertical"
                className="min-h-[100px] h-full"
              >
                {/* Query Section */}
                <ResizablePanel
                  defaultSize={50}
                  minSize={20}
                  className="min-h-0"
                >
                  <div className="flex-1 min-h-0 overflow-auto">
                    <MonacoEditor text={text} />
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* AI Section */}
                <ResizablePanel
                  defaultSize={50}
                  minSize={20}
                  className="min-h-0"
                >
                  <div className="flex-1 min-h-0 overflow-auto">
                    <Query
                      text={text}
                      handleSubmit={handleSubmit}
                      message={message}
                      input={input}
                      handleChange={handleChange}
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right side with Resultat */}
            <ResizablePanel defaultSize={50} minSize={30} className="min-h-0">
              <div className="h-full min-h-0 flex flex-col">
                <div className="p-2 overflow-auto flex-grow min-h-0">
                  <Resultat text={text} />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile layout - single column with 3 rows */}
        <div className="md:hidden h-full min-h-0">
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] h-full"
          >
            {/* Query Section */}
            <ResizablePanel defaultSize={33} minSize={15} className="min-h-0">
              <div className="flex-1 min-h-0 overflow-auto">
                <MonacoEditor text={text} />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* User Query Section */}
            <ResizablePanel defaultSize={33} minSize={15} className="min-h-0">
              <div className="flex-1 min-h-0 overflow-auto">
                <Query
                  text={text}
                  handleSubmit={handleSubmit}
                  message={message}
                  input={input}
                  handleChange={handleChange}
                  isLoading={isLoading}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Resultat Section */}
            <ResizablePanel defaultSize={33} minSize={15} className="min-h-0">
              <div className="flex-1 min-h-0 overflow-auto p-3">
                <Resultat text={text} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <Footer />
    </main>
  );
}
