const platformName = "Volunteer";

const navLinks = [
    {
        title: "Наше завдання",
        href: "/our-task",
    },
    {
        title: "Як це працює?",
        href: "/how-it-works",
    },
    {
        title: "Місії",
        href: "/missions",
    },
];

const headerSection = {
    headerTitle: "Empowering Volunteers",
    headerText:
        "HelpMatch: Connect, Contribute, and Change Communities Through Our Volunteer Logistic Platform",
};

const missionsSection = {
    sectionTitle: "Наявні місії",
    sectionText:
        "Обери місію до якої бажаєш долучитися і ми допоможемо зв’язатись з її організторами",
};

const categoriesSection = {
    sectionSubtitle: "або",
    sectionTitle: "Обирай категорію",
};

const advantagesSection = {
    sectionTitle: "Відчуй переваги",
    sectionText:
        "Essential Tools that Make HelpMatch the Ultimate Volunteer Logistic Platform",
    advantages: [
        {
            icon: "clock",
            title: "Зв’язок в реальному часі",
            descr: "Essential Tools that Make HelpMatch the Ultimate Platform",
        },
        {
            icon: "box",
            title: "Логістика",
            descr: "Essential Tools that Make HelpMatch the Ultimate Platform",
        },
        {
            icon: "document",
            title: "Звітність",
            descr: "Essential Tools that Make HelpMatch the Ultimate Platform",
        },
    ],
};

const answersSection = {
    sectionTitle: "Виникли запитання?",
    articles: [
        {
            question: "Як зареєструваись?",
            answer: "Essential Tools that Make HelpMatch the Ultimate Platform",
        },
        {
            question: "Як зареєструваись?",
            answer: "Essential Tools that Make HelpMatch the Ultimate Platform",
        },
        {
            question: "Як зареєструваись?",
            answer: "Essential Tools that Make HelpMatch the Ultimate Platform",
        },
        {
            question: "Як зареєструваись?",
            answer: "Essential Tools that Make HelpMatch the Ultimate Platform",
        },
    ],
};

export const staticData = {
    platformName,
    navLinks,
    headerSection,
    missionsSection,
    categoriesSection,
    advantagesSection,
    answersSection,
};

export type TStatisData = typeof staticData;
