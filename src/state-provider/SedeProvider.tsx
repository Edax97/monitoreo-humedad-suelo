import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SedeType {
  id: string;
  name: string;
}

interface SedeContextType {
  sedeSelected: SedeType | null;
  setSedeSelected: Dispatch<SetStateAction<SedeType | null>>;
}

const SedeContext = createContext<SedeContextType>(null!);
export const useSedeContext = () => useContext(SedeContext);

interface Props {
  children: ReactNode;
}
export function SedeProvider({ children }: Props) {
  const [sedeSelected, setSedeSelected] = useState<SedeType | null>(null);

  return (
    <SedeContext.Provider value={{ sedeSelected, setSedeSelected }}>
      {children}
    </SedeContext.Provider>
  );
}
