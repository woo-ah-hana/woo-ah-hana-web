"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Plan } from "../business/plan/plan";
import useCommunityStore from "@/app/store/community-store";

interface PlanContextType {
  plan: Plan;
  updatePlan: (updatedPlan: Plan) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlanContext must be used within a PlanProvider");
  }
  return context;
};

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const community = useCommunityStore((state) => state.community);

  const initialPlan = Plan.create(
    "default-id",
    community.id,
    "",
    new Date().toISOString(),
    new Date().toISOString(),
    "",
    [],
    [],
    []
  );

  const [plan, setPlan] = useState<Plan>(initialPlan);

  const updatePlan = (updatedPlan: Plan) => {
    setPlan((prevPlan) => {
      const updated = new Plan(
        prevPlan.getId(),
        prevPlan.getCommunityId(),
        updatedPlan.title,
        updatedPlan.startDate,
        updatedPlan.endDate,
        updatedPlan.category,
        updatedPlan.locations,
        updatedPlan.memberIds,
        prevPlan.getMemberNames()
      );
      
      return updated;
    });
  };

  const contextValue = useMemo(
    () => ({
      plan,
      updatePlan,
    }),
    [plan]
  );

  return (
    <PlanContext.Provider value={contextValue}>{children}</PlanContext.Provider>
  );
};
