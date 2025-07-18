import React, { useState, useEffect } from 'react';

/**
 * CarnismWhyWeEatCertainAnimalsNotOthers Component
 *
 * This component explores the concept of Carnism, the invisible ideology that
 * influences which animals we deem acceptable to eat and which we don't.
 * It features an interactive drag-and-drop simulation where users categorize animals,
 * followed by a scientific explanation of Carnism and its mechanisms.
 */
const CarnismWhyWeEatCertainAnimalsNotOthers = () => {
    // Initial data for animals, including placeholder images for demonstration
    const initialAnimals = [
        { id: 'cow', name: 'פרה', image: 'https://via.placeholder.com/100/ADD8E6/000000?text=פרה', category: null },
        { id: 'dog', name: 'כלב', image: 'https://via.placeholder.com/100/F08080/000000?text=כלב', category: null },
        { id: 'pig', name: 'חזיר', image: 'https://via.placeholder.com/100/90EE90/000000?text=חזיר', category: null },
        { id: 'cat', name: 'חתול', image: 'https://via.placeholder.com/100/DDA0DD/000000?text=חתול', category: null },
        { id: 'chicken', name: 'תרנגולת', image: 'https://via.placeholder.com/100/FFD700/000000?text=תרנגולת', category: null },
        { id: 'horse', name: 'סוס', image: 'https://via.placeholder.com/100/B0C4DE/000000?text=סוס', category: null },
        { id: 'fish', name: 'דג', image: 'https://via.placeholder.com/100/87CEEB/000000?text=דג', category: null },
    ];

    // Common classifications for comparison with user's choices
    const commonClassifications = {
        'cow': 'מזון',
        'dog': 'חבר/חיית מחמד',
        'pig': 'מזון',
        'cat': 'חבר/חיית מחמד',
        'chicken': 'מזון',
        'horse': 'אחר',
        'fish': 'מזון',
    };

    // Hidden narratives/justifications associated with eating certain animals
    const hiddenNarratives = {
        'מזון': {
            'cow': 'פרות נתפסות כחיות משק שנועדו לייצור חלב ובשר. הן מופחתות תודעה ואינטליגנציה בתפיסה הרווחת.',
            'pig': 'חזירים מגדלים לבשר בקנה מידה תעשייתי. בתרבויות מסוימות נחשבים "לא נקיים", ובתרבויות אחרות אינטליגנציה ורגשותיהם מוכחשים.',
            'chicken': 'תרנגולות נתפסות כבעלות אינטליגנציה נמוכה ומיועדות לייצור בשר וביצים תעשייתי. סבלן אינו נלקח בחשבון.',
            'fish': 'דגים נחשבים כבעלי תודעה פחותה או ללא יכולת לחוש כאב באותה מידה כמו יונקים, ו"שייכים למים" ולכן נגישים לצריכה אנושית.',
        },
        'חבר/חיית מחמד': {
            'dog': 'כלבים הם חברים נאמנים ובעלי אישיות ורגשות מורכבים. הם נתפסים כחלק מהמשפחה, ולכן אכילתם בלתי נסבלת.',
            'cat': 'חתולים הם חיות מחמד עצמאיות, בעלות אישיות ייחודית וקשרים רגשיים עם בני אדם. מעמדם כ"בן משפחה" מגן עליהם מצריכה.',
        },
        'אחר': {
            'horse': 'סוסים נתפסים כחיות עבודה, ספורט, או חברים גדולים. אכילתם אינה מקובלת ונתפסת כטאבו בתרבויות רבות, לא בגלל הבדל ביולוגי מהותי.',
        },
    };

    const [animals, setAnimals] = useState(initialAnimals);
    const [draggedItemId, setDraggedItemId] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [resultsDisplayed, setResultsDisplayed] = useState(false);
    const [activeDropZone, setActiveDropZone] = useState(null); // State for visual feedback on drop zone
    const [dragging, setDragging] = useState(false); // State to indicate if a drag operation is active

    // Check if all animals have been categorized
    useEffect(() => {
        const allCategorized = animals.every(animal => animal.category !== null);
        if (allCategorized && animals.length > 0) {
            setResultsDisplayed(true);
        } else {
            setResultsDisplayed(false); // Hide results if not all are categorized yet
        }
    }, [animals]);

    /**
     * Handles the start of a drag operation.
     * @param {Object} e - The drag event.
     * @param {string} id - The ID of the animal being dragged.
     */
    const handleDragStart = (e, id) => {
        setDraggedItemId(id);
        setDragging(true);
        e.dataTransfer.effectAllowed = "move";
        // Optionally, set drag image (can be custom or the element itself)
        // e.dataTransfer.setDragImage(e.currentTarget, e.currentTarget.offsetWidth / 2, e.currentTarget.offsetHeight / 2);
    };

    /**
     * Prevents default behavior for drag over, allowing drops.
     * Also sets the active drop zone for visual feedback.
     * @param {Object} e - The drag event.
     * @param {string} zone - The name of the drop zone being dragged over.
     */
    const handleDragOver = (e, zone) => {
        e.preventDefault();
        setActiveDropZone(zone);
    };

    /**
     * Handles the drop of an item into a category.
     * Updates the animal's category in the state.
     * @param {Object} e - The drop event.
     * @param {string} category - The category to assign the animal to.
     */
    const handleDrop = (e, category) => {
        e.preventDefault();
        setActiveDropZone(null); // Reset active drop zone
        setDragging(false); // End dragging
        if (draggedItemId) {
            setAnimals(prevAnimals =>
                prevAnimals.map(animal =>
                    animal.id === draggedItemId ? { ...animal, category: category } : animal
                )
            );
            setDraggedItemId(null); // Clear dragged item
        }
    };

    /**
     * Handles the end of a drag operation. Clears active drop zone and dragging state.
     */
    const handleDragEnd = () => {
        setActiveDropZone(null);
        setDragging(false);
        setDraggedItemId(null);
    };

    /**
     * Toggles the visibility of the scientific explanation section.
     */
    const toggleExplanation = () => {
        setShowExplanation(!showExplanation);
    };

    // Filter animals for display in the initial pool and categorized sections
    const uncategorizedAnimals = animals.filter(animal => animal.category === null);

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                קרניזם: חשיפת האידיאולוגיה הבלתי נראית מאחורי מה שאנחנו אוכלים
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                נסו רגע לדמיין שאתם אוכלים בשר כלב או חתול. מה התחושה? סביר להניח שמשהו מתכווץ בבטן. אבל למה דווקא כלפי חיות אלו, כשאתם צורכים בשר פרות או עופות ללא היסוס? האם זה טבעי או נלמד?
            </p>

            <section className="flex flex-col items-center mb-12 p-6 bg-white shadow-xl rounded-2xl border border-indigo-100">
                <h2 className="text-3xl font-bold mb-4 text-violet-700 text-center">הסימולציה: איך המוח שלכם מסווג חיות?</h2>
                <p className="mb-6 text-gray-700 text-lg text-center max-w-2xl">
                    גררו ושחררו כל חיה לאחת הקטגוריות שמשקפות את תפיסתכם כרגע:
                </p>

                {/* Uncategorized Animals Pool */}
                {uncategorizedAnimals.length > 0 && (
                    <div className="w-full mb-10 pb-6 border-b-2 border-indigo-200">
                        <h3 className="text-2xl font-semibold mb-5 text-indigo-600 text-center">חיות להחלטה:</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {uncategorizedAnimals.map(animal => (
                                <div
                                    key={animal.id}
                                    draggable="true"
                                    onDragStart={(e) => handleDragStart(e, animal.id)}
                                    onDragEnd={handleDragEnd}
                                    className={`
                                        cursor-grab flex flex-col items-center bg-white p-4 rounded-xl shadow-md border border-gray-200
                                        hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out
                                        ${draggedItemId === animal.id ? 'opacity-50 scale-95' : ''}
                                        ${dragging ? 'active:cursor-grabbing' : ''}
                                    `}
                                >
                                    <img src={animal.image} alt={animal.name} className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-purple-400 hover:border-purple-600 transition-colors duration-200" />
                                    <span className="font-bold text-lg text-gray-800">{animal.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Drop Zones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-center">
                    {['מזון', 'חבר/חיית מחמד', 'אחר'].map(category => (
                        <div
                            key={category}
                            onDragOver={(e) => handleDragOver(e, category)}
                            onDrop={(e) => handleDrop(e, category)}
                            onDragLeave={() => setActiveDropZone(null)}
                            className={`
                                p-8 border-4 rounded-2xl shadow-xl flex flex-col items-center min-h-[200px] transition-all duration-300 ease-in-out
                                ${category === 'מזון' ? 'bg-red-50 border-red-300' : ''}
                                ${category === 'חבר/חיית מחמד' ? 'bg-blue-50 border-blue-300' : ''}
                                ${category === 'אחר' ? 'bg-emerald-50 border-emerald-300' : ''}
                                ${activeDropZone === category ? 'border-purple-600 ring-4 ring-purple-200 bg-purple-50 transform scale-102' : ''}
                            `}
                        >
                            <h3 className={`text-2xl font-bold mb-5 ${category === 'מזון' ? 'text-red-700' : category === 'חבר/חיית מחמד' ? 'text-blue-700' : 'text-emerald-700'}`}>
                                {category}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-4 min-h-[80px]">
                                {animals
                                    .filter(animal => animal.category === category)
                                    .map(animal => (
                                        <div key={animal.id} className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 transform scale-100 animate-fadeIn transition-transform hover:scale-105">
                                            <img src={animal.image} alt={animal.name} className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-gray-300" />
                                            <span className="text-sm font-medium text-gray-700">{animal.name}</span>
                                        </div>
                                    ))}
                            </div>
                            {animals.filter(animal => animal.category === category).length === 0 && (
                                <p className="text-gray-300 text-2xl font-bold mt-6 italic animate-pulse">גררו לכאן</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {resultsDisplayed && (
                <section className="mt-12 p-8 bg-amber-50 border border-amber-300 rounded-2xl shadow-2xl text-gray-800 animate-fadeInUp">
                    <h2 className="text-3xl font-bold text-center mb-8 text-amber-800">ההבחנות שלכם: חשיפת הנרטיבים הסמויים</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {animals.map(animal => (
                            <div key={animal.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                                    <img src={animal.image} alt={animal.name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-300" />
                                    {animal.name}
                                </h3>
                                <p className="mb-2 text-lg"><strong className="text-indigo-600">הסיווג שלכם:</strong> {animal.category}</p>
                                <p className="mb-4 text-lg"><strong className="text-emerald-600">סיווג נפוץ/חברתי:</strong> {commonClassifications[animal.id]}</p>
                                {animal.category && hiddenNarratives[animal.category] && hiddenNarratives[animal.category][animal.id] && (
                                    <div className={`p-4 rounded-lg mt-4 border-2 shadow-inner transition-all duration-500 ease-in-out animate-fadeIn ${
                                        animal.category === 'מזון' ? 'bg-red-100 border-red-200' :
                                        animal.category === 'חבר/חיית מחמד' ? 'bg-blue-100 border-blue-200' :
                                        'bg-emerald-100 border-emerald-200'
                                    }`}>
                                        <h4 className={`font-semibold mb-2 text-lg ${
                                            animal.category === 'מזון' ? 'text-red-700' :
                                            animal.category === 'חבר/חיית מחמד' ? 'text-blue-700' :
                                            'text-emerald-700'
                                        }`}>
                                            הנרטיב הסמוי (בקטגוריה זו):
                                        </h4>
                                        <p className={`text-md ${
                                            animal.category === 'מזון' ? 'text-red-800' :
                                            animal.category === 'חבר/חיית מחמד' ? 'text-blue-800' :
                                            'text-emerald-800'
                                        }`}>{hiddenNarratives[animal.category][animal.id]}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                     <p className="mt-8 text-center text-xl font-medium text-gray-700 italic">
                        כפי שראיתם, הסיווג לרוב אינו נובע מהבדלים ביולוגיים מהותיים, אלא מהבניות תרבותיות וחברתיות עמוקות.
                    </p>
                </section>
            )}

            <div className="text-center mt-12">
                <button
                    onClick={toggleExplanation}
                    className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-6 focus:ring-purple-300 focus:ring-opacity-75 text-lg"
                >
                    {showExplanation ? 'הסתירו את ההסבר המדעי' : 'למה זה קורה? חשפו את ההסבר המדעי'}
                </button>
            </div>

            {showExplanation && (
                <section className="mt-12 p-8 bg-white shadow-2xl rounded-2xl border border-purple-300 text-gray-800 animate-fadeInUp">
                    <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">הקרניזם נחשף: מסע אל תוך אידיאולוגיה בלתי נראית</h2>

                    <article className="mb-10">
                        <h3 className="text-2xl font-semibold mb-4 text-indigo-700">מבוא: מהו קרניזם?</h3>
                        <p className="mb-3 text-lg leading-relaxed text-gray-700">
                            המושג "קרניזם" (Carnism) נטבע על ידי הפסיכולוגית החברתית ד"ר מלאני ג'וי (Melanie Joy) בספרה פורץ הדרך "למה אנחנו אוהבים כלבים, אוכלים חזירים ולובשים פרות". הוא מתאר מערכת אמונות בלתי נראית המאפשרת לאנשים לאכול חיות מסוימות, תוך הכחשה או התעלמות מסבלן ומקיומן המודע.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700">
                            בניגוד לטבעונות או צמחונות, הנתפסות כ"בחירות מודעות", הקרניזם הוא ברירת המחדל התרבותית באזורים רבים בעולם. רובנו גדלים לתוכו מבלי לתהות על קיומו או על השלכותיו העמוקות.
                        </p>
                    </article>

                    <article className="mb-10">
                        <h3 className="text-2xl font-semibold mb-4 text-indigo-700">ה"בלתי נראה" של הקרניזם: המטריצה הסמויה</h3>
                        <p className="mb-3 text-lg leading-relaxed text-gray-700">
                            הקרניזם שונה מרוב האידיאולוגיות בכך שהוא "בלתי נראה". הוא אינו מציג את עצמו כבחירה מוסרית, פילוסופיה או שיטה, אלא כעובדה טבעית ומובנת מאליה. הוא פועל באמצעות מערכת עמוקה של אמונות ונורמות תרבותיות שיוצרות "מטריצה" של הנחות יסוד סמויות לגבי בעלי חיים ו"זכותנו" לצרוך אותם.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700">
                            מטריצה זו קובעת, למשל, אילו חיות "מיועדות" למאכל ואילו לא, וכיצד עלינו לתפוס את החיות שבצלחתנו – לא כיצורים חיים, בעלי רגשות ותחושה, אלא כאובייקטים, תוצרים חקלאיים או משאבים בלבד.
                        </p>
                    </article>

                    <article className="mb-10">
                        <h3 className="text-2xl font-semibold mb-4 text-indigo-700">מנגנוני ההצדקה המרכזיים: 4 ה-N's</h3>
                        <p className="mb-4 text-lg leading-relaxed text-gray-700">
                            כדי לבצר את המערכת ולהפחית דיסוננס קוגניטיבי (הפער המורגש בין הערכים שלנו לבין המעשים בפועל), הקרניזם מפעיל מנגנוני הצדקה נפוצים המכונים "4 ה-N's":
                        </p>
                        <ul className="list-disc list-inside space-y-3 ml-6 text-lg text-gray-700">
                            <li>
                                <strong className="text-blue-700">Natural (טבעי):</strong> הטענה ש"זה טבעי לאכול בשר, האדם אכל בשר מאז ומתמיד." הצדקה זו מתבססת על טיעונים אבולוציוניים או "סדר טבעי" שבו בני אדם נמצאים בראש שרשרת המזון.
                            </li>
                            <li>
                                <strong className="text-blue-700">Normal (נורמלי):</strong> "כולם עושים את זה, זה נורמלי לחלוטין." הצדקה זו מסתמכת על נורמות חברתיות וקונצנזוס רחב. אם כולם אוכלים בשר, זה כנראה בסדר גמור.
                            </li>
                            <li>
                                <strong className="text-blue-700">Necessary (הכרחי):</strong> "צריך בשר בשביל חלבון/ברזל/בריאות/הישרדות." הצדקה זו טוענת לחיוניות קיומית של בשר לתזונה ולבריאות האדם, למרות קיומם של מקורות חלופיים רבים.
                            </li>
                            <li>
                                <strong className="text-blue-700">Nice (טעים/נחמד):</strong> "בשר זה פשוט טעים מדי בשביל לוותר עליו." זוהי הצדקה רגשית וחווייתית, המדגישה את ההנאה הקולינרית כסיבה מספקת לצריכת בשר, על אף שיקולים אתיים או סביבתיים אחרים.
                            </li>
                        </ul>
                        <p className="mt-6 text-lg leading-relaxed text-gray-700">
                            מנגנונים אלו פועלים יחד כדי להפוך את אכילת בשר של חיות מסוימות למקובלת, לגיטימית ובלתי ניתנת לערעור בתודעה הציבורית.
                        </p>
                    </article>

                    <article className="mb-4">
                        <h3 className="text-2xl font-semibold mb-4 text-indigo-700">השלכות וביקורת: מעבר לצלחת</h3>
                        <p className="mb-3 text-lg leading-relaxed text-gray-700">
                            הקרניזם מעוות את תפיסתנו לגבי בעלי חיים. הוא מוביל ל"אובייקטיפיקציה" שלהם – הפיכתם לאובייקטים נטולי ערך עצמי, ובכך מאפשר התעלמות מסבלם ומזכויותיהם הבסיסיות. הוא מפריד בין ההכרה בחיות מסוימות כבעלות תחושה (כמו כלבים וחתולים) לבין הכחשת תחושה זו בחיות אחרות (כמו פרות ותרנגולות) – תופעה המכונה "דיסוננס מינים".
                        </p>
                        <p className="mb-3 text-lg leading-relaxed text-gray-700">
                            הבנה של הקרניזם מאפשרת לנו לבחון מחדש את ההנחות הסמויות שלנו לגבי מזון ובעלי חיים, ולהבין טוב יותר את הקשרים העמוקים בין צריכת בשר לשאלות אתיות, סביבתיות ובריאותיות רחבות יותר.
                        </p>
                        <p className="font-semibold text-xl text-center mt-8 text-indigo-800">
                            זוהי הזמנה לאפשר לעצמנו בחירה מודעת ומיודעת, במקום לפעול תחת השפעתה הבלתי נראית אך החזקה של אידיאולוגיה.
                        </p>
                    </article>
                </section>
            )}
        </div>
    );
};

export default CarnismWhyWeEatCertainAnimalsNotOthers;