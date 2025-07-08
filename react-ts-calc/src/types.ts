export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForNewValue: boolean;
  memory: number;
}

export type CalculatorType = 'basic' | 'scientific';

export interface CalculatorProps {
  type: CalculatorType;
}