import { createContext } from "react";
interface LoadingContextProps {
    isLoading: boolean
    setIsLoading: Function
}
const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setIsLoading: () => {},
});

export default LoadingContext;
