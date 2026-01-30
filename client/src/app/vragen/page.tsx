import { Wizard } from "@/components/wizard/wizard";
import { QUESTIONS } from "@/lib/data";

export default function VragenPage() {
    return (
        <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
            <Wizard questions={QUESTIONS} />
        </div>
    );
}
