'use server'

import { ActivePlan, SearchResult } from "../plan/active-plan";
import { CustomAI } from "./custom-open-ai";

export async function getActivePlan(
    searchResult: SearchResult[],
    startDate: string,
    endDate: string
):Promise<ActivePlan[]> {
  const ai = CustomAI.create();
  const plans = await ai.makeActivePlan(searchResult, startDate, endDate);
  return plans;
}