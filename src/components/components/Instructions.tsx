import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface InstructionsProps {
    onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => {
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Instrucciones - Validación de Preguntas WH</CardTitle>
                <CardDescription>
                    Aprende cómo utilizar la aplicación para validar preguntas WH en inglés
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>¿Qué son las preguntas WH?</AccordionTrigger>
                        <AccordionContent>
                            <p>Las preguntas WH son aquellas que comienzan con palabras interrogativas en inglés como:</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>What (Qué)</li>
                                <li>Where (Dónde)</li>
                                <li>When (Cuándo)</li>
                                <li>Why (Por qué)</li>
                                <li>Who (Quién)</li>
                                <li>How (Cómo)</li>
                                <li>Which (Cuál)</li>
                                <li>Whose (De quién)</li>
                                <li>Whom (A quién)</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>¿Cómo usar la aplicación?</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal pl-5">
                                <li>Escribe 5 preguntas WH en inglés en los campos de texto.</li>
                                <li>Navega entre las preguntas usando los botones "Anterior" y "Siguiente".</li>
                                <li>Una vez hayas completado las 5 preguntas, haz clic en "Evaluar".</li>
                                <li>Verás los resultados y una calificación de 0 a 5.</li>
                                <li>Para intentarlo de nuevo, haz clic en "Intentar de nuevo".</li>
                            </ol>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Ejemplos de preguntas WH correctas</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2">
                                <li><strong>What can you do?</strong> - Verbo modal "can"</li>
                                <li><strong>Where should we go?</strong> - Verbo modal "should"</li>
                                <li><strong>When will they arrive?</strong> - Verbo modal "will"</li>
                                <li><strong>Why would she leave?</strong> - Verbo modal "would"</li>
                                <li><strong>How might he react?</strong> - Verbo modal "might"</li>
                                <li><strong>Which could we choose?</strong> - Verbo modal "could"</li>
                                <li><strong>Whom should I call?</strong> - Verbo modal "should"</li>
                                <li><strong>When can we start?</strong> - Verbo modal "can"</li>
                                <li><strong>Why must they follow?</strong> - Verbo modal "must"</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>Patrones gramaticales aceptados</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2 text-sm">
                                <li>WH QUESTION + modal (can/will/should) + sujeto + verbo ?</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>

            <CardFooter className="flex justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                    Cerrar
                </button>
            </CardFooter>
        </Card>
    );
};

export default Instructions;