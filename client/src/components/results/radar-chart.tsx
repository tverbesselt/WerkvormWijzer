"use client";

import { PropertyScore } from "@/lib/types";
import { PROPERTIES } from "@/lib/data";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

interface RadarChartProps {
    scores: PropertyScore[];
    comparisonValues?: Record<string, number>;
    comparisonName?: string;
}

export function ResultsRadarChart({ scores, comparisonValues, comparisonName }: RadarChartProps) {
    // Transform data for Recharts
    // Map scores to include Property Name
    const data = scores.map((s) => {
        const prop = PROPERTIES.find(p => p.id === s.property);
        return {
            subject: prop ? prop.name : s.property,
            score: s.score,
            threshold: comparisonValues ? (comparisonValues[s.property] || 0) : 0,
            fullMark: 6, // Max score per property
        };
    });

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 6]} tick={false} axisLine={false} />

                    {/* User Score Radar */}
                    <Radar
                        name="Jouw Profiel"
                        dataKey="score"
                        stroke="#00C2B8" // Primary Teal
                        strokeWidth={3}
                        fill="#00C2B8" // Primary Teal
                        fillOpacity={0.4}
                    />

                    {/* Comparison Radar (if available) */}
                    {comparisonValues && (
                        <Radar
                            name={comparisonName || "Minimum"}
                            dataKey="threshold"
                            stroke="#64748b" // Slate 500
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            fill="#94a3b8"
                            fillOpacity={0.1}
                        />
                    )}

                    <Tooltip
                        formatter={(value: any, name: any) => [`${value}/6`, name]}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
