import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clock, ShieldCheck, UserCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 px-4 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white">

        <div className="space-y-6 max-w-3xl animate-slide-up">
          <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-800">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            Zelfinschattingstool CVO Antwerpen
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900">
            Welke <span className="text-indigo-600">onderwijs-werkvorm</span><br /> past bij jou?
          </h1>

          <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Ontdek in enkele minuten of online, hybride of on-campus les volgen het beste aansluit bij jouw vaardigheden en situatie.
          </p>

          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center pt-4">
            <Link href="/vragen">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all">
                Start de Check <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="container mx-auto py-12 md:py-20 px-4">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-panel border-indigo-50 relative overflow-hidden group hover:border-indigo-100 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <UserCheck className="h-24 w-24 text-indigo-600" />
            </div>
            <CardHeader>
              <UserCheck className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Voor wie is dit?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Voor cursisten die twijfelen tussen verschillende lesvormen.
                Of je nu begeleiding krijgt of zelf op zoek bent naar advies.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-panel border-indigo-50 relative overflow-hidden group hover:border-indigo-100 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="h-24 w-24 text-indigo-600" />
            </div>
            <CardHeader>
              <Clock className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Duur: 5-7 minuten</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Beantwoord een korte lijst vragen over zelfredzaamheid, motivatie, digitale skills en je praktische situatie.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-panel border-indigo-50 relative overflow-hidden group hover:border-indigo-100 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck className="h-24 w-24 text-indigo-600" />
            </div>
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Privacy & Advies</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Dit is een anonieme zelfinschatting. We vragen geen naam of adres.
                Het resultaat is een advies, geen bindende beslissing.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
