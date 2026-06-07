import { AuthTool } from "./types";
import raw from "@/src/data/auth-tools.json";

const tools = raw as unknown as AuthTool[];

export function getTools(): AuthTool[] {
  return tools;
}

export function getToolByName(id: string): AuthTool | undefined {
  return tools.find((t) => t.id === id);
}

const learningCurveOrder: Record<string, number> = {
  Easy: 0,
  Medium: 1,
  Advanced: 2,
};

export function getAlternatives(slug: string): AuthTool[] {
  return tools
    .filter((t) => t.id !== slug)
    .sort((a, b) => {
      const curveDiff = (learningCurveOrder[a.learning_curve] ?? 1) - (learningCurveOrder[b.learning_curve] ?? 1);
      if (curveDiff !== 0) return curveDiff;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 5);
}
