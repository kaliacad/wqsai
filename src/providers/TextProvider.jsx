import { useState } from "react";
import { TextContext } from "../contexts/textContext";


export default function TextProvider({ children }) {
   const [sparqlText, setSPARQLText] = useState('');
   return (
      <TextContext.Provider value={{ sparqlText, setSPARQLText }}>
         {children}
      </TextContext.Provider>
   );
}