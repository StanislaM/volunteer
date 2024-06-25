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
    headerTitle: "Потужні Волонтери",
    headerText:
        "Volunteer: Налагоджуйте зв'язки, робіть внесок та змінюйте громади за допомогою нашої волонтерської логістичної платформи",
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
        "Особливості які роблять Volunteer потужною волонтерською платформою",
    advantages: [
        {
            icon: "clock",
            title: "Сповіщення",
            descr: "Отримуй повідомлення про нові місії прямо на сайті",
        },
        {
            icon: "box",
            title: "Логістичні ланцюжки",
            descr: "Створюй посилання на попередні місії для налагодження поставок",
        },
        {
            icon: "document",
            title: "Телеграм бот",
            descr: "Підписуйся, щоб отримувати сповіщення через телеграм",
        },
    ],
};

const answersSection = {
    sectionTitle: "Виникли запитання?",
    articles: [
        {
            question: "Як зареєструваись?",
            answer: "Тисни приєднатись та заповнюй форму реєстрації",
        },
        {
            question: "Як стати волонетером?",
            answer: "В особистому кабінеті при створенні місії, буде запропоновано форма. Після заповнення, зачекай валідації і починай створювати місії",
        },
        {
            question: "Як підписатись на розсилку?",
            answer: "В особистому кабінеті заповнюй форму підрядника й отримуй сповіщення",
        },
        {
            question: "Як створити ланцюжок?",
            answer: "У власних місій наявна кнопка + для створення ланюжка",
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

export const regions = <const>[
    "Вінницька область",
    "Волинська область",
    "Дніпропетровська область",
    "Донецька область",
    "Житомирська область",
    "Закарпатьска область",
    "Запорізька область",
    "Івано-Франківська область",
    "Київська область",
    "Кіровоградська область",
    "Луганська область",
    "Миколаївська область",
    "Одеська область",
    "Полтавська область",
    "Рівненська область",
    "Сумська область",
    "Тернопілська область",
    "Харківська область",
    "Херсонська область",
    "Хмельницька область",
    "Черкаська область",
    "Чернівецька область",
    "Чернігівська область",
];

export type TRegions = (typeof regions)[number];

export const missionStatuses = <const>["В процесі", "Завершено"];

export type TMissionStatuses = (typeof missionStatuses)[number];
