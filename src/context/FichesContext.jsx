import { createContext, useState, useContext } from "react";

const Context = createContext();

export const FichesProvider = ({ children }) => {
  const [fiches, setFiches] = useState([]);
  const [ficheDetailIsOpen, setFicheDetailIsOpen] = useState(false);
  const [linkFileIsOpen, setLinkFileIsOpen] = useState(false);
  const [linkFicheToFileIsOpen, setLinkFicheToFileIsOpen] = useState(false);

  const [selectedFiche, setSelectedFiche] = useState({});
  const [selectedFicheFileList, setSelectedFicheFileList] = useState({});
  const [selectedUnlinkFiche, setSelectedUnlinkFiche] = useState({});
  const [selectedFicheForLinkToFile, setSelectedFicheForLinkToFile] = useState(
    {}
  );

  const data = {
    fiches,
    setFiches,
    ficheDetailIsOpen,
    setFicheDetailIsOpen,
    selectedFiche,
    setSelectedFiche,
    selectedFicheFileList,
    setSelectedFicheFileList,
    linkFileIsOpen,
    setLinkFileIsOpen,
    selectedUnlinkFiche,
    setSelectedUnlinkFiche,
    linkFicheToFileIsOpen,
    setLinkFicheToFileIsOpen,
    selectedFicheForLinkToFile,
    setSelectedFicheForLinkToFile,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useFiches = () => useContext(Context);
