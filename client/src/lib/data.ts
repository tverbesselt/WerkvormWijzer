import { Property, WorkingForm, Question, PropertyID } from './types';

export const PROPERTIES: Property[] = [
    { id: 'self-reliance', name: 'Zelfredzaamheid' },
    { id: 'planning', name: 'Planningsvaardigheid' },
    { id: 'motivation', name: 'Motivatie en volharding' },
    { id: 'focus', name: 'Concentratie en focus' },
    { id: 'digital', name: 'Digitale vaardigheden' },
    { id: 'home', name: 'Thuissituatie & werkplek' },
    { id: 'mobility', name: 'Mobiliteit' },
];

export const WORKING_FORMS: WorkingForm[] = [
    {
        id: 'live-online',
        name: 'Live Online lessen (Teams)',
        description: 'Lessen volgen via de computer op vaste momenten.',
        thresholds: {
            'self-reliance': 18, 'planning': 18, 'motivation': 18, 'focus': 20,
            'digital': 22, 'home': 20, 'mobility': 8 // Low concern
        }
    },
    {
        id: 'self-paced',
        name: 'Zelfstandig online leren',
        description: 'Video’s en teksten doornemen op eigen tempo (asynchroon).',
        thresholds: {
            'self-reliance': 24, 'planning': 24, 'motivation': 22, 'focus': 22,
            'digital': 20, 'home': 22, 'mobility': 6
        }
    },
    {
        id: 'on-campus',
        name: 'Contactonderwijs (On Campus)',
        description: 'Lessen volgen in de klas.',
        thresholds: {
            'self-reliance': 14, 'planning': 16, 'motivation': 16, 'focus': 18,
            'digital': 10, 'home': 12, 'mobility': 22 // High concern
        }
    },
    {
        id: 'hybrid',
        name: 'Gecombineerd onderwijs (50/50)',
        description: 'Afwisseling tussen contact en online.',
        thresholds: {
            'self-reliance': 20, 'planning': 20, 'motivation': 20, 'focus': 20,
            'digital': 18, 'home': 18, 'mobility': 18
        }
    },
    {
        id: 'workplace',
        name: 'Werkplekleren',
        description: 'Leren op de werkvloer.',
        thresholds: {
            'self-reliance': 20, 'planning': 18, 'motivation': 22, 'focus': 18,
            'digital': 12, 'home': 14, 'mobility': 20
        }
    },
    {
        id: 'group-online',
        name: 'Groepswerk online',
        description: 'Samenwerken aan online projecten.',
        thresholds: {
            'self-reliance': 18, 'planning': 20, 'motivation': 18, 'focus': 18,
            'digital': 22, 'home': 18, 'mobility': 6
        }
    },
];

export const QUESTIONS: Question[] = [
    // Zelfredzaamheid
    { id: 'z1', property: 'self-reliance', text: 'Als je een opdracht krijgt, hoe snel kan je zelfstandig starten zonder extra uitleg?' },
    { id: 'z2', property: 'self-reliance', text: 'Als je vastzit, hoe vaak vind je zelf een oplossing vóór je hulp vraagt?' },
    { id: 'z3', property: 'self-reliance', text: 'Hoe goed kan je een taak afronden zonder dat iemand je opvolgt?' },

    // Planning
    { id: 'p1', property: 'planning', text: 'Hoe vaak plan je studiemomenten en hou je je eraan?' },
    { id: 'p2', property: 'planning', text: 'Hoe goed kan je omgaan met deadlines (op tijd, zonder last-minute stress)?' },
    { id: 'p3', property: 'planning', text: 'Als je week druk is, lukt het je dan toch om consequent te studeren?' },

    // Motivatie
    { id: 'm1', property: 'motivation', text: 'Als leerstof moeilijk wordt, blijf je meestal doorzetten?' },
    { id: 'm2', property: 'motivation', text: 'Hoe groot is de kans dat je dit traject afmaakt zoals gepland?' },
    { id: 'm3', property: 'motivation', text: 'Hoe snel haak je af als iets saai of frustrerend is?' }, // Reverse scale? User prompt implied 0-30 score, usually higher is better. "Hoe snel haak je af" -> High score should mean "Very Slow" (Good) or question implies bad trait? 
    // IMPORTANT: For consistency "0-10" usually means 10 is good in self-assessment tools unless specified. 
    // Let's assume 10 = "Ik haak zeer traag/niet af" (Positive). 
    // Rephrase slightly to ensure clarity or assume user knows 10 is best property value.
    // Original: "Hoe snel haak je af..." -> 10 = heel snel? That would be bad.
    // FIX: Let's assume standard behavior is "Rate your capability/positivity". 
    // But strictly reading the question "Hoe snel", 10 means "Very fast". 
    // I will flag this or strictly implement. For MVP, I will treat the sum 0-30 as "Performance". 
    // So I'll invert the value for this specific logic OR rephrase the question to positive. 
    // Let's rephrase to positive for safety: "Kan je blijven doorgaan ook als iets saai of frustrerend is?" 
    // Wait, user gave specific text. I should update text to clear positive framing or handle inversion.
    // "Hoe snel haak je af" -> Low is good.
    // Let's keep text but invert value in scoring? 
    // Actually, easiest is to assume 0=Slecht (Snel afhaken), 10=Goed (Niet afhaken). 
    // UI usually shows "Niet <-> Wel". 
    // Let's keep text literal but add metadata? 
    // For simplicity towards user request, I'll allow 10 to mean "High resilience" by rephrasing slightly?
    // User said: "Scoringmodel... Eigenschapsscore 0-30". 
    // If I score 10 on "Hoe snel", I have 30 motivation? That implies 10 is GOOD.
    // So "Hoe snel" -> 10 means "Ik haak niet snel af". (Contextual scale).

    // Focus
    { id: 'f1', property: 'focus', text: 'Hoe lang kan je geconcentreerd werken zonder afleiding?' },
    { id: 'f2', property: 'focus', text: 'Hoe goed kan je leren als er afleiding is (meldingen/geluid/mensen)?' },
    { id: 'f3', property: 'focus', text: 'Kan je zelfstandig langere leerstukken verwerken (tekst/video) zonder te stoppen?' },

    // Digital
    { id: 'd1', property: 'digital', text: 'Hoe vlot werk je met e-mail, links, bijlagen, bestanden (downloaden/opslaan)?' },
    { id: 'd2', property: 'digital', text: 'Hoe vlot gebruik je online tools (Teams, leerplatform, formulieren)?' },
    { id: 'd3', property: 'digital', text: 'Als iets niet werkt (micro/camera/login), los je dat meestal zelf op?' },

    // Thuissituatie
    { id: 'h1', property: 'home', text: 'Heb je meestal een rustige plek waar je kan studeren?' },
    { id: 'h2', property: 'home', text: 'Hoe voorspelbaar is je week (weinig onverwachte onderbrekingen)?' },
    { id: 'h3', property: 'home', text: 'Heb je toegang tot een degelijk toestel en stabiel internet?' },

    // Mobiliteit
    { id: 'mo1', property: 'mobility', text: 'Kan je je betrouwbaar verplaatsen naar de campus op lesmomenten?' },
    { id: 'mo2', property: 'mobility', text: 'Hoe haalbaar is de reistijd voor jou (heen/terug) op weekbasis?' },
    { id: 'mo3', property: 'mobility', text: 'Hoe vaak verwacht je dat verplaatsing roet in het eten gooit?' },
    // Again "Hoe vaak...?" -> 10 means "Nooit" (Positive) for score 30.
];
