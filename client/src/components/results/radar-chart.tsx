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
} from "recharts";

interface RadarChartProps {
    scores: PropertyScore[];
}

export function ResultsRadarChart({ scores }: RadarChartProps) {
    // Transform data for Recharts
    // Map scores to include Property Name
    const data = scores.map((s) => {
        const prop = PROPERTIES.find(p => p.id === s.property);
        return {
            subject: prop ? prop.name : s.property,
            score: s.score,
            fullMark: 30, // Max score per property
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
                    <PolarRadiusAxis angle={30} domain={[0, 30]} tick={false} axisLine={false} />
                    <Radar
                        name="Jouw Profiel"
                        dataKey="score"
                        stroke="#00C2B8" // Primary Teal
                        strokeWidth={3}
                        fill="#00C2B8" // Primary Teal
                        fillOpacity={0.4}
                    />
                    <Tooltip
                        formatter={(value: any) => [`${value}/30`, 'Score']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
