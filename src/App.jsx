import { useState, useContext } from "react";
import { TextContext } from "./contexts/textContext";
import Ai from "./components/Ai";
import Query from "./components/Query";
import Resultat from "./components/Resultat";
import Split from "react-split";
import Footer from "./components/Footer";
import getGPT from "./api/getGPT";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function App() {
  const { sparqlText, setSPARQLText } = useContext(TextContext);
  console.log(sparqlText);
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
    <main role="main" className="h-screen max-h-full w-[100%] flex flex-col">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>
              <Query text={text} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <Ai
                text={text}
                handleSubmit={handleSubmit}
                message={message}
                input={input}
                handleChange={handleChange}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle />
        <ResizablePanel>
          <Resultat text={text} />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Footer />
    </main>
  );
}

export default App;
