import { createContext, useContext, useState, ReactNode } from "react";

// Context 타입 정의
interface PlanContextType {
  title: string;
  setTitle: (title: string) => void;
}

// Context 생성
const PlanContext = createContext<PlanContextType | undefined>(undefined);

// Custom hook으로 Context 접근
export const usePlantContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlantContext must be used within a PlantProvider");
  }
  return context;
};

// Provider 구현
export const PlantProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("모임");

  return (
    <PlanContext.Provider value={{ title, setTitle }}>
      {children}
    </PlanContext.Provider>
  );
};
