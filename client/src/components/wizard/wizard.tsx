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
        // Fallback options if none provided
        const options = currentQuestion.options || ['0', '1', '2', '3'];

        return (
            <div className="px-4 py-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {options.map((label, index) => {
                        const isSelected = currentAnswerValue === index;
                        return (
                            <div
                                key={index}
                                onClick={() => handleSelect(index)}
                                className={cn(
                                    "cursor-pointer relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200",
                                    isSelected
                                        ? "border-teal-500 bg-teal-50 shadow-md ring-2 ring-teal-500 ring-offset-2"
                                        : "border-slate-200 bg-white hover:border-teal-200 hover:bg-slate-50"
                                )}
                            >
                                <div className={cn(
                                    "text-3xl font-bold mb-2 transition-colors",
                                    isSelected ? "text-teal-700" : "text-slate-400"
                                )}>
                                    {index}
                                </div>
                                <div className={cn(
                                    "text-sm font-medium text-center transition-colors",
                                    isSelected ? "text-teal-900" : "text-slate-600"
                                )}>
                                    {label}
                                </div>
                                {isSelected && (
                                    <div className="absolute top-3 right-3 text-teal-600">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
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

            <Card className="min-h-[400px] flex flex-col glass-panel border-teal-100 shadow-xl">
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

                    <Button onClick={handleNext} className="ml-auto bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/30">
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
