import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import Instructions from './components/components/Instructions';
import { getFeedbackMessage, grammarRules, validateWHQuestion } from './components/components/Validator';
import type { QuestionResultType } from './types';


function App() {
  const [questions, setQuestions] = useState<string[]>(Array(5).fill(''));
  const [results, setResults] = useState<QuestionResultType[]>([]);
  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("test");
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  //actualizar una pregunta
  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  //avanzar a la siguiente pregunta
  const handleNextQuestion = () => {
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  //volver a la pregunta anterior
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  //evaluar todas las preguntas
  const handleSubmit = () => {
    const questionResults: QuestionResultType[] = questions.map(question => {
      const validationResult = validateWHQuestion(question);
      return {
        question,
        isValid: validationResult.isValid,
        rule: validationResult.rule
      };
    });

    //puntuacion final
    const finalScore = questionResults.filter(result => result.isValid).length;

    setResults(questionResults);
    setScore(finalScore);
    setFeedback(getFeedbackMessage(finalScore));
    setSubmitted(true);
  };

  //reiniciar el cuestionario
  const handleReset = () => {
    setQuestions(Array(5).fill(''));
    setResults([]);
    setScore(0);
    setSubmitted(false);
    setFeedback('');
    setCurrentQuestionIndex(0);
    setActiveTab("test");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div>
        <img className='h-90 w-90 mr-8 shadow-2xl shadow-gray-500/50 rounded-md' src="/src/img/qr-code.png" alt="codigo qr de la apliacion desplegada" />
      </div>
      <Card className='w-full max-w-2xl shadow-lg shadow-gray-600/50'>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Validación de Preguntas WH en Inglés</CardTitle>
              <CardDescription>
                {submitted
                  ? "Resultados de tu evaluación"
                  : "Escribe 5 preguntas de tipo WH en inglés"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowInstructions(true)}>
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="test">Cuestionario</TabsTrigger>
              <TabsTrigger value="reference">Guía de Referencia</TabsTrigger>
            </TabsList>

            <TabsContent value="test">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <Progress value={(currentQuestionIndex + 1) * 20} className="h-2" />
                    <p className="text-center mt-2 text-sm text-gray-500">
                      Pregunta {currentQuestionIndex + 1} de 5
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor={`question-${currentQuestionIndex}`} className="block text-sm font-medium mb-1">
                        Pregunta {currentQuestionIndex + 1}:
                      </label>
                      <Input
                        id={`question-${currentQuestionIndex}`}
                        type="text"
                        value={questions[currentQuestionIndex]}
                        onChange={(e) => handleQuestionChange(currentQuestionIndex, e.target.value)}
                        placeholder="Escribe una pregunta WH en inglés..."
                        className="w-full"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        Anterior
                      </Button>

                      {currentQuestionIndex < 4 ? (
                        <Button
                          onClick={handleNextQuestion}
                        >
                          Siguiente
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={questions.some(q => !q)}
                        >
                          Evaluar
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <h3 className="text-xl font-bold">Puntuación: {score} / 5</h3>
                    <Alert className={`mt-4 ${score === 5 ? 'bg-green-50' :
                      score >= 3 ? 'bg-blue-50' :
                        'bg-amber-50'
                      }`}>
                      <AlertTitle>Resultado</AlertTitle>
                      <AlertDescription>{feedback}</AlertDescription>
                    </Alert>
                  </div>

                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div key={index} className={`p-3 rounded-md ${result.isValid ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                        <div className="flex items-center mb-1">
                          <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${result.isValid ? 'bg-green-500' : 'bg-red-500'
                            } text-white`}>
                            {result.isValid ? '✓' : '✗'}
                          </div>
                          <span className="flex-1 font-medium">{result.question}</span>
                        </div>

                        {result.isValid && result.rule && (
                          <div className="ml-8 text-sm text-gray-600">
                            <p>Patrón: {result.rule.pattern}</p>
                          </div>
                        )}

                        {!result.isValid && (
                          <div className="ml-8 text-sm text-red-600">
                            <p>La pregunta no cumple con ningún patrón de pregunta WH válido.</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="reference">
              <div className="space-y-4">
                <Alert>
                  <AlertTitle>Información</AlertTitle>
                  <AlertDescription>
                    Las preguntas WH en inglés son aquellas que comienzan con palabras como What, Where, When, Why, Who, How, etc.
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="text-lg font-medium mb-2">Patrones de Preguntas WH:</h3>
                  <div className="grid gap-2">
                    {grammarRules.map((rule) => (
                      <TooltipProvider key={rule.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="p-2 bg-gray-50 rounded-md border hover:bg-gray-100 cursor-help">
                              <div className="flex items-center">
                                <Badge variant="outline" className="mr-2">{rule.id}</Badge>
                                <span>{rule.description}</span>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-mono text-sm">{rule.pattern}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Ejemplos:</h3>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded-md border">
                      <p><strong>What can you do?</strong> - Verbo modal "can"</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md border">
                      <p><strong>Where should we go?</strong> - Verbo modal "should"</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md border">
                      <p><strong>When will they arrive?</strong> - Verbo modal "will"</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md border">
                      <p><strong>Why would she leave?</strong> - Verbo modal "would"</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md border">
                      <p><strong>How might he react?</strong> - Verbo modal "might"</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter>
          {submitted && (
            <Button onClick={handleReset} className="w-full">
              Intentar de nuevo
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="sm:max-w-2xl">
          <Instructions onClose={() => setShowInstructions(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
