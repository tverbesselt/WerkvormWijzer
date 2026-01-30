"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Question, Answer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { saveAnswers } from "@/lib/storage";

interface WizardProps {
    questions: Question[];
}

export function Wizard({ questions }: WizardProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = React.useState(0);
    const [answers, setAnswers] = React.useState<Answer[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    // Load existing answer for current question if any (for back navigation)
    const currentAnswerValue = answers.find(a => a.questionId === currentQuestion.id)?.value;

    const handleSelect = (value: number) => {
        setError(null);
        setAnswers(prev => {
            const existing = prev.findIndex(a => a.questionId === currentQuestion.id);
            if (existing >= 0) {
                const newAnswers = [...prev];
                newAnswers[existing] = { questionId: currentQuestion.id, value };
                return newAnswers;
            }
            return [...prev, { questionId: currentQuestion.id, value }];
        });
    };

    const handleNext = () => {
        if (currentAnswerValue === undefined) {
            setError("Selecteer een antwoord om verder te gaan.");
            return;
        }

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            finishWizard();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setError(null);
        }
    };

    const finishWizard = () => {
        saveAnswers(answers);
        router.push("/resultaten");
    };

    // Render logic for different question types
    const renderInput = () => {
        // All questions are now 0-10 integer scales
        const value = typeof currentAnswerValue === 'number' ? currentAnswerValue : 5; // Default to mid-point if undefined

        return (
            <div className="px-8 py-10 space-y-12">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-6xl font-black text-indigo-600 tracking-tighter tabular-nums animate-in zoom-in slide-in-from-bottom-2 duration-300">
                        {currentAnswerValue !== undefined ? currentAnswerValue : "?"}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                        op een schaal van 0 tot 10
                    </span>
                </div>

                <div className="space-y-4">
                    <Slider
                        value={[value]}
                        min={0}
                        max={10}
                        step={1}
                        onValueChange={(vals) => handleSelect(vals[0])}
                        className="py-4"
                    />
                    <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <span>Helemaal niet</span>
                        <span>Helemaal wel</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mx-auto max-w-2xl w-full p-4 animate-slide-up">
            <div className="mb-8 space-y-2 text-center">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Zelfinschatting &mdash; Stap {currentStep + 1} van {questions.length}</p>
                <Progress value={progress} className="h-1.5" />
            </div>

            <Card className="min-h-[400px] flex flex-col glass-panel border-indigo-100 shadow-xl">
                <CardHeader className="text-center pb-2">
                    {/* Add category badge/icon later if needed */}
                    <CardTitle className="text-2xl md:text-3xl font-bold leading-tight text-slate-900 mt-4">
                        {currentQuestion.text}
                    </CardTitle>
                    <CardDescription>
                        Kies het antwoord dat het beste bij jou past.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-center">
                    {renderInput()}
                    {error && (
                        <div className="mt-4 text-center text-destructive font-medium animate-pulse">
                            {error}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between border-t bg-slate-50/50 p-6">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="text-slate-500 hover:text-slate-900"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Vorige
                    </Button>

                    <Button onClick={handleNext} className="ml-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30">
                        {currentStep === questions.length - 1 ? (
                            <>Bekijk Resultaten <CheckCircle2 className="ml-2 h-4 w-4" /></>
                        ) : (
                            <>Volgende <ArrowRight className="ml-2 h-4 w-4" /></>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <p className="text-center text-xs text-slate-400 mt-8">
                Resultaten zijn advies, geen garantie of officiële beslissing.
            </p>
        </div>
    );
}
