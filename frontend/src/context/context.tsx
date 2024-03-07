import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type TClient = {
  id?: number
  name: string
  email: string
  phone: string
  coordinates: {
    coord_x: number | string;
    coord_y: number | string;
  }
}

interface IContextProps {
  formRegister: TClient
  setFormRegister: Dispatch<SetStateAction<TClient>>
  clients: TClient[]
  setClients: Dispatch<SetStateAction<TClient[]>>
  clientsCopy: TClient[]
  setClientsCopy: Dispatch<SetStateAction<TClient[]>>
  registerModalEntrace: boolean
  setRegisterModalEntrace: Dispatch<SetStateAction<boolean>>
  visitOrderModalEntrace: boolean
  setVisitOrderModalEntrace: Dispatch<SetStateAction<boolean>>
  clientsVisitationOrder: TClient[]
  setClientsVisitationOrder: Dispatch<SetStateAction<TClient[]>>
}

export const context = createContext({} as IContextProps);

function Context({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<TClient[]>([]);
  const [clientsCopy, setClientsCopy] = useState<TClient[]>([]);
  const [clientsVisitationOrder, setClientsVisitationOrder] = useState<TClient[]>([]);

  const [registerModalEntrace, setRegisterModalEntrace] = useState<boolean>(false);
  const [visitOrderModalEntrace, setVisitOrderModalEntrace] = useState<boolean>(false);

  const [formRegister, setFormRegister] = useState<TClient>({
    name: "", email: "", phone: "", coordinates: { coord_x: "", coord_y: "" }
  });

  return (
    <context.Provider value={
      {
        clients,
        setClients,
        clientsCopy,
        setClientsCopy,
        registerModalEntrace,
        setRegisterModalEntrace,
        formRegister,
        setFormRegister,
        visitOrderModalEntrace,
        setVisitOrderModalEntrace,
        clientsVisitationOrder,
        setClientsVisitationOrder
      }}
    >
      {children}
    </context.Provider>
  )
}

export default Context;