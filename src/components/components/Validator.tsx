import type { AuxiliaryVerbsType, GrammarRuleType, WHQuestionType } from "@/types";

// Lista de palabras WH
export const WHQuestionTypes: WHQuestionType[] = [
  'what', 'where', 'when', 'why', 'who', 'how', 'which', 'whose', 'whom'
];

// Verbos modales
export const auxiliaryVerbs: AuxiliaryVerbsType = {
    modal: ['can', 'will', 'would', 'should', 'could', 'may', 'might', 'must'],
    toBe: [],
    do: [],
    perfect: []
};

// Solo Regla 6: WH QUESTION + modal + sujeto + verbo base ?
export const grammarRules: GrammarRuleType[] = [
  {
    id: 6,
    description: "Con verbos modales",
    pattern: "WH QUESTION + modal (can/will/should) + sujeto + verbo ?",
    validate: (parts) => {
      if (parts.length < 4) return false;
      const [whWord, modal, verbo] = parts.map(p => p.toLowerCase());
      
      // Verifica que el verbo esté en forma base (no termine en s, ed, ing)
      const isBaseForm = !verbo.endsWith("s") && !verbo.endsWith("ed") && !verbo.endsWith("ing");

      return WHQuestionTypes.includes(whWord as WHQuestionType) &&
             auxiliaryVerbs.modal.includes(modal) &&
             isBaseForm;
    }
  }
];

// Función para validar una pregunta WH con la única regla activa (modal)
export const validateWHQuestion = (question: string): { isValid: boolean; rule?: GrammarRuleType } => {
  const questionEndsWithQuestionMark = question.trim().endsWith('?');
  const cleanQuestion = question.replace(/[^\w\s]/gi, '').trim();
  const parts = cleanQuestion.split(/\s+/);

  const firstWord = parts[0].toLowerCase();
  if (!WHQuestionTypes.includes(firstWord as WHQuestionType) || !questionEndsWithQuestionMark) {
    return { isValid: false };
  }

  const modalRule = grammarRules[0]; // Solo tenemos una
  if (modalRule.validate(parts)) {
    return { isValid: true, rule: modalRule };
  }

  return { isValid: false };
};

export const getFeedbackMessage = (score: number): string => {
  if (score === 5) {
    return "¡Excelente! Has dominado perfectamente las preguntas WH en inglés.";
  } else if (score >= 4) {
    return "¡Muy bien! Estás cerca de dominar las preguntas WH en inglés.";
  } else if (score >= 3) {
    return "¡Buen trabajo! Con un poco más de práctica dominarás este tema.";
  } else if (score >= 2) {
    return "Vas por buen camino. Continúa practicando para mejorar.";
  } else if (score >= 1) {
    return "Has dado el primer paso. ¡La práctica te llevará a la perfección!";
  } else {
    return "No te desanimes. La práctica hace al maestro. ¡Inténtalo de nuevo!";
  }
};
