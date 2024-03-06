import { useContext } from "react";
import { context } from "../context/context";

function useStatesContext() {
  return useContext(context);
}

export default useStatesContext;