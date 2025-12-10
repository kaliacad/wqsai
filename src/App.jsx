import { useState, useContext } from "react";

import { TextContext } from "./contexts/textContext";
import Ai from "./components/Ai";
import Query from "./components/Query";
import Resultat from "./components/Resultat";
import Footer from "./components/Footer";
import getGPT from "./api/getGPT";

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
      <div className="flex-grow overflow-auto">
        {/* Desktop layout - left vertical split for Query and AI, right for Result */}
        <div className="hidden md:block h-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] h-full"
          >
            {/* Left side with Query and AI vertically */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <ResizablePanelGroup
                direction="vertical"
                className="min-h-[100px] h-full"
              >
                {/* Query Section */}
                <ResizablePanel defaultSize={50} minSize={20}>
                  <div className="flex-1 overflow-auto">
                    <Query text={text} />
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* AI Section */}
                <ResizablePanel defaultSize={50} minSize={20}>
                  <div className="flex-1 overflow-auto">
                    <Ai
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
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col">
                <div className="p-2 overflow-auto flex-grow">
                  <Resultat text={text} />
                </div>
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
              <div className="flex-1 overflow-auto">
                <Query text={text} />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* AI Section */}
            <ResizablePanel defaultSize={33} minSize={15}>
              <div className="flex-1 overflow-auto">
                <Ai
                  text={text}
                  handleSubmit={handleSubmit}
                  message={message}
                  input={input}
                  handleChange={handleChange}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Resultat Section */}
            <ResizablePanel defaultSize={33} minSize={15}>
              <div className="flex-1 overflow-auto p-3">
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

export default App;
