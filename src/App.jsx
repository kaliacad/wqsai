import { useState, useContext } from "react";

import { TextContext } from "./contexts/textContext";
import Ai from "./components/Ai";
import Query from "./components/Query";
import Resultat from "./components/Resultat";
import Footer from "./components/Footer";
import getGPT from "./api/getGPT";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ApiKeyModal from "@/components/ApiKeyModal";

function App() {
  const { sparqlText, setSPARQLText } = useContext(TextContext);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [text, setText] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    query: true,
    ai: true,
    resultat: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const resp = await getGPT(input);
      setText(resp);

      setMessage([
        ...message,
        { user: "me", msg: `${input}` },
        { user: "ai", msg: `${resp}` },
      ]);

      setInput("");
    } catch (err) {
      alert({ message: err.message });
    }
  };

  setSPARQLText(text);

  return (
    <main role="main" className="h-screen max-h-full w-full flex flex-col">
      <ApiKeyModal />
      <div className="flex-grow overflow-auto">
        {/* Desktop layout - horizontal split for the top section */}
        <div className="hidden md:block h-full">
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] h-full"
          >
            {/* First row with Query and AI side by side */}
            <ResizablePanel defaultSize={60} minSize={20}>
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[100px]"
              >
                {/* Query Section */}
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="border-cyan-900 border-2 h-full flex flex-col">
                    <div
                      className="flex justify-between items-center p-2 bg-cyan-50 cursor-pointer"
                      onClick={() => toggleSection("query")}
                    >
                      <h3 className="font-medium">Query</h3>
                      {expandedSections.query ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </div>
                    {expandedSections.query && (
                      <div className="p-2 overflow-auto flex-grow">
                        <Query text={text} />
                      </div>
                    )}
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* AI Section */}
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="border-cyan-900 border-2 h-full flex flex-col">
                    <div
                      className="flex justify-between items-center p-2 bg-cyan-50 cursor-pointer"
                      onClick={() => toggleSection("ai")}
                    >
                      <h3 className="font-medium">AI</h3>
                      {expandedSections.ai ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </div>
                    {expandedSections.ai && (
                      <div className="p-2 overflow-auto flex-grow">
                        <Ai
                          text={text}
                          handleSubmit={handleSubmit}
                          message={message}
                          input={input}
                          handleChange={handleChange}
                        />
                      </div>
                    )}
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Second row with Resultat */}
            <ResizablePanel defaultSize={50} minSize={20}>
              <div className="border-cyan-900 border-2 h-full flex flex-col">
                <div
                  className="flex justify-between items-center p-2 bg-cyan-50 cursor-pointer"
                  onClick={() => toggleSection("resultat")}
                >
                  <h3 className="font-medium">Result</h3>
                  {expandedSections.resultat ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
                {expandedSections.resultat && (
                  <div className="p-2 overflow-auto flex-grow">
                    <Resultat text={text} />
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile layout - single column with 3 rows */}
        <div className="md:hidden h-full">
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] h-full"
          >
            {/* Query Section */}
            <ResizablePanel defaultSize={33} minSize={15}>
              <div className="border-cyan-900 border-2 h-full flex flex-col">
                <div
                  className="flex justify-between items-center p-2 bg-cyan-50 cursor-pointer"
                  onClick={() => toggleSection("query")}
                >
                  <h3 className="font-medium">Query</h3>
                  {expandedSections.query ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
                {expandedSections.query && (
                  <div className="p-2 overflow-auto flex-grow">
                    <Query text={text} />
                  </div>
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* AI Section */}
            <ResizablePanel defaultSize={33} minSize={15}>
              <div className="border-cyan-900 border-2 h-full flex flex-col">
                <div
                  className="flex justify-between items-center p-2 bg-cyan-50 cursor-pointer"
                  onClick={() => toggleSection("ai")}
                >
                  <h3 className="font-medium">AI</h3>
                  {expandedSections.ai ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
                {expandedSections.ai && (
                  <div className="p-2 overflow-auto flex-grow">
                    <Ai
                      text={text}
                      handleSubmit={handleSubmit}
                      message={message}
                      input={input}
                      handleChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Resultat Section */}
            <ResizablePanel defaultSize={33} minSize={15}>
              <div className="border-cyan-900 border-2 h-full flex flex-col">
                <div
                  className="flex justify-between items-center p-2 bg-cyan-50 cursor-pointer"
                  onClick={() => toggleSection("resultat")}
                >
                  <h3 className="font-medium">Result</h3>
                  {expandedSections.resultat ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
                {expandedSections.resultat && (
                  <div className="p-2 overflow-auto flex-grow">
                    <Resultat text={text} />
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default App;
