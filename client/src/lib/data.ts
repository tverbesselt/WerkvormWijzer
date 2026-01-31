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
            'self-reliance': 4, 'planning': 4, 'motivation': 4, 'focus': 4,
            'digital': 5, 'home': 4, 'mobility': 2
        }
    },
    {
        id: 'self-paced',
        name: 'Zelfstandig online leren',
        description: 'Video’s en teksten doornemen op eigen tempo (asynchroon).',
        thresholds: {
            'self-reliance': 5, 'planning': 5, 'motivation': 4, 'focus': 4,
            'digital': 4, 'home': 4, 'mobility': 1
        }
    },
    {
        id: 'on-campus',
        name: 'Contactonderwijs (On Campus)',
        description: 'Lessen volgen in de klas.',
        thresholds: {
            'self-reliance': 3, 'planning': 3, 'motivation': 3, 'focus': 3,
            'digital': 2, 'home': 2, 'mobility': 5
        }
    },
    {
        id: 'hybrid',
        name: 'Gecombineerd onderwijs (50/50)',
        description: 'Afwisseling tussen contact en online.',
        thresholds: {
            'self-reliance': 4, 'planning': 4, 'motivation': 4, 'focus': 4,
            'digital': 4, 'home': 4, 'mobility': 4
        }
    },
    {
        id: 'workplace',
        name: 'Werkplekleren',
        description: 'Leren op de werkvloer.',
        thresholds: {
            'self-reliance': 4, 'planning': 4, 'motivation': 4, 'focus': 4,
            'digital': 2, 'home': 3, 'mobility': 4
        }
    },
    {
        id: 'group-online',
        name: 'Groepswerk online',
        description: 'Samenwerken aan online projecten.',
        thresholds: {
            'self-reliance': 4, 'planning': 4, 'motivation': 4, 'focus': 4,
            'digital': 5, 'home': 4, 'mobility': 1
        }
    },
];

export const QUESTIONS: Question[] = [
    // 1) Zelfredzaamheid (0–6)
    {
        id: 'z1', property: 'self-reliance',
        text: 'Hoe vlot kan je starten met een opdracht zonder extra hulp?',
        options: ['Lukt bijna nooit', 'Soms', 'Meestal', 'Bijna altijd']
    },
    {
        id: 'z2', property: 'self-reliance',
        text: 'Als je vastzit, kan je meestal zelf een eerste oplossing vinden?',
        options: ['Bijna nooit', 'Soms', 'Meestal', 'Bijna altijd']
    },

    // 2) Planningsvaardigheid (0–6)
    {
        id: 'p1', property: 'planning',
        text: 'Plan je studietijd in en hou je je eraan?',
        options: ['Nooit', 'Soms', 'Meestal', 'Altijd']
    },
    {
        id: 'p2', property: 'planning',
        text: 'Lever je taken meestal op tijd in?',
        options: ['Zelden', 'Soms', 'Meestal', 'Bijna altijd']
    },

    // 3) Motivatie & volharding (0–6)
    {
        id: 'm1', property: 'motivation',
        text: 'Als het moeilijk wordt, blijf je doorgaans doorgaan?',
        options: ['Bijna nooit', 'Soms', 'Meestal', 'Bijna altijd']
    },
    {
        id: 'm2', property: 'motivation',
        text: 'Hoe zeker ben je dat je dit traject afmaakt?',
        options: ['Helemaal niet zeker', 'Eerder onzeker', 'Redelijk zeker', 'Heel zeker']
    },

    // 4) Concentratie & focus (0–6)
    {
        id: 'f1', property: 'focus',
        text: 'Kan je 20–30 minuten geconcentreerd werken zonder afleiding?',
        options: ['Bijna nooit', 'Soms', 'Meestal', 'Bijna altijd']
    },
    {
        id: 'f2', property: 'focus',
        text: 'Kan je tekst of video blijven volgen zonder snel af te haken?',
        options: ['Bijna nooit', 'Soms', 'Meestal', 'Bijna altijd']
    },

    // 5) Digitale basisvaardigheden (0–6)
    {
        id: 'd1', property: 'digital',
        text: 'Kan je vlot werken met e-mail, links en bijlagen (downloaden/opslaan/terugvinden)?',
        options: ['Lukt niet', 'Lukt met veel hulp', 'Lukt meestal', 'Lukt vlot']
    },
    {
        id: 'd2', property: 'digital',
        text: 'Kan je vlot deelnemen aan live online les (micro/camera/chat/Teams)?',
        options: ['Lukt niet', 'Lukt met veel hulp', 'Lukt meestal', 'Lukt vlot']
    },

    // 6) Thuissituatie & eigen werkplek (0–6)
    {
        id: 'h1', property: 'home',
        text: 'Heb je meestal een rustige plek waar je kan studeren?',
        options: ['Nooit', 'Soms', 'Meestal', 'Altijd']
    },
    {
        id: 'h2', property: 'home',
        text: 'Heb je meestal een toestel + stabiel internet als je wil studeren?',
        options: ['Bijna nooit', 'Soms', 'Meestal', 'Altijd']
    },

    // 7) Mobiliteit & bereikbaarheid (0–6)
    {
        id: 'mo1', property: 'mobility',
        text: 'Kan je je betrouwbaar verplaatsen naar de campus op lesmomenten?',
        options: ['Bijna nooit', 'Soms', 'Meestal', 'Altijd']
    },
    {
        id: 'mo2', property: 'mobility',
        text: 'Is de reistijd voor jou haalbaar op weekbasis?',
        options: ['Niet haalbaar', 'Soms haalbaar', 'Meestal haalbaar', 'Goed haalbaar']
    }
];
