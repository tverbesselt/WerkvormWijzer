"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { getAnswers, clearSession } from "@/lib/storage";
import { calculateScores } from "@/lib/scoring";
import { Answer, FormResult, PropertyScore } from "@/lib/types";
import { PROPERTIES, WORKING_FORMS } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResultsRadarChart } from "@/components/results/radar-chart";
import { PDFExportButton } from "@/components/results/pdf-export";
import { cn } from "@/lib/utils";

export default function ResultatenPage() {
    const router = useRouter();
    const reportRef = useRef<HTMLDivElement>(null);
    // State
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [formResults, setFormResults] = useState<FormResult[]>([]);
    const [propertyScores, setPropertyScores] = useState<PropertyScore[]>([]);
    const [loading, setLoading] = useState(true);
    // New state for chart comparison
    const [compareFormId, setCompareFormId] = useState<string | null>(null);

    useEffect(() => {
        const storedAnswers = getAnswers();
        if (!storedAnswers || storedAnswers.length === 0) {
            // No answers found, redirect to start
            router.replace("/");
            return;
        }
        setAnswers(storedAnswers);

        const { propertyScores, formResults } = calculateScores(storedAnswers);

        setFormResults(formResults);
        setPropertyScores(propertyScores);
        setLoading(false);
    }, [router]);

    const handleRestart = () => {
        clearSession();
        router.replace("/");
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Laden...</div>;
    }

    // Sort order: Green first, then Orange, then Red
    const statusOrder = { 'Groen': 0, 'Oranje': 1, 'Rood': 2 };
    const sortedResults = [...formResults].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

    const selectedComparable = compareFormId ? WORKING_FORMS.find(f => f.id === compareFormId) : null;
    const comparisonValues = selectedComparable?.thresholds;

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-slate-900">Jouw Werkvorm Advies</h1>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleRestart}>Opnieuw beginnen</Button>
                    <PDFExportButton targetRef={reportRef} />
                </div>
            </div>

            {/* Main Report Area - Wrapped for PDF */}
            <div ref={reportRef} className="bg-slate-50 p-4 sm:p-8 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-none">

                {/* Intro / Disclaimer */}
                <div className="mb-8 p-4 bg-teal-50 border-l-4 border-teal-500 rounded text-sm text-teal-900 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-teal-600" />
                    <div>
                        <p className="font-semibold mb-1">Belangrijk: Dit is een zelfinschatting.</p>
                        <p>
                            Deze resultaten geven een indicatie op basis van jouw antwoorden op 7 eigenschappen.
                            Het is een advies, geen garantie. Bespreek dit rapport met je trajectbegeleider.
                        </p>
                    </div>
                </div>

                {/* Visual & Summary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Radar Chart */}
                    <Card className="min-h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Jouw Profiel</CardTitle>
                            <CardDescription>Jouw scores op de 7 eigenschappen (0-6)</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-[300px] flex flex-col">
                            <ResultsRadarChart
                                scores={propertyScores}
                                comparisonValues={comparisonValues}
                                comparisonName={selectedComparable?.name}
                            />

                            {/* Comparison Buttons */}
                            <div className="mt-6">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">Vergelijk met vereisten voor:</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {WORKING_FORMS.map(form => (
                                        <Button
                                            key={form.id}
                                            variant={compareFormId === form.id ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCompareFormId(compareFormId === form.id ? null : form.id)}
                                            className={cn(
                                                "text-xs h-8",
                                                compareFormId === form.id ? "bg-slate-700 hover:bg-slate-800 text-white border-slate-700" : "text-slate-600 border-slate-200"
                                            )}
                                        >
                                            {form.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Recommendation Logic */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <h3 className="text-xl font-bold mb-2">Advies Samenvatting</h3>
                            {sortedResults.length > 0 && sortedResults[0].status === 'Groen' ? (
                                <>
                                    <div className="text-3xl font-bold text-emerald-600 mb-2">{sortedResults[0].form.name}</div>
                                    <p className="text-slate-600">
                                        Deze werkvorm lijkt zeer goed aan te sluiten bij jouw profiel. Je haalt alle vooropgestelde drempels.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="text-xl font-semibold text-slate-700 mb-2">Geen perfecte match</div>
                                    <p className="text-slate-600">
                                        Er is geen werkvorm waarvoor je alle drempels haalt ("Groen").
                                        Kijk hieronder welke werkvormen "Oranje" scoren en bespreek de aandachtspunten.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <h3 className="font-bold mb-2 text-slate-900">Legende</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                    <span className="font-semibold text-slate-700">Groen:</span> Alle drempels gehaald.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                    <span className="font-semibold text-slate-700">Oranje:</span>
                                    1 of 2 kleine aandachtspunten.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                                    <span className="font-semibold text-slate-700">Rood:</span>
                                    Meerdere tekorten of groot risico op kerneigenschap.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Detail Overzicht per Werkvorm</h2>
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Werkvorm</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Aandachtspunten</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {sortedResults.map((item) => (
                                        <tr key={item.form.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900 align-top w-1/3">
                                                {item.form.name}
                                                <div className="text-xs font-normal text-slate-500 mt-1">{item.form.description}</div>
                                            </td>
                                            <td className="px-6 py-4 align-top w-1/6">
                                                <div className={cn(
                                                    "inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold w-24",
                                                    item.status === 'Groen' && "bg-emerald-100 text-emerald-800",
                                                    item.status === 'Oranje' && "bg-amber-100 text-amber-800",
                                                    item.status === 'Rood' && "bg-rose-100 text-rose-800"
                                                )}>
                                                    {item.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 align-top">
                                                {item.status === 'Groen' ? (
                                                    <div className="flex items-center gap-2 text-emerald-700">
                                                        <span>Geen specifieke aandachtspunten. Je voldoet aan de richtwaarden.</span>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {item.criticalFailures.length > 0 && (
                                                            <div className="text-rose-700 font-semibold">
                                                                ! Groot risico op: {item.criticalFailures.map(id => PROPERTIES.find(p => p.id === id)?.name).join(", ")}
                                                            </div>
                                                        )}
                                                        {item.missedThresholds.length > 0 && (
                                                            <div className="text-slate-600">
                                                                Onder drempel voor: {item.missedThresholds.filter(id => !item.criticalFailures.includes(id)).map(id => PROPERTIES.find(p => p.id === id)?.name).join(", ")}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Timestamp Footer for PDF */}
                <div className="text-center text-xs text-slate-400 mt-8 pt-4 border-t border-slate-100 hidden print:block">
                    Gegenereerd op {new Date().toLocaleDateString('nl-BE')} om {new Date().toLocaleTimeString('nl-BE')}
                </div>
            </div>

        </div>

    );
}
