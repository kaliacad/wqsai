export const init = () => {
    let lang = null;
    
    lang = window.localStorage.getItem("lang") || null;
 
  
    if (!lang) {
      window.localStorage.setItem("lang", "fr");
    }
   
    return { lang};
  };
  