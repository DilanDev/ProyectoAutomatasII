export type WHQuestionType = 'what' | 'where' | 'when' | 'why' | 'who' | 'how' | 'which' | 'whose' | 'whom';

export type AuxiliaryVerbsType = {
  toBe: string[];
  do: string[];
  perfect: string[];
  modal: string[];
};

export type GrammarRuleType = {
  id: number;
  description: string;
  pattern: string;
  validate: (questionParts: string[]) => boolean;
};

export type QuestionResultType = {
  question: string;
  isValid: boolean;
  rule?: GrammarRuleType;
};

export type ScoreCategory = 
  | { value: 5; label: 'EXCELLENT' }
  | { value: 4; label: 'VERY_GOOD' }
  | { value: 3; label: 'GOOD' }
  | { value: 2; label: 'FAIR' }
  | { value: 1; label: 'NEEDS_IMPROVEMENT' }
  | { value: 0; label: 'TRY_AGAIN' };