// template.jsx - תבנית מהירה לשיעור חדש
import React, { useState, useEffect } from 'react';

/**
 * [שם השיעור] Component
 *
 * [תיאור קצר של מה השיעור מלמד ואיך הוא עובד]
 */
const TemplateLessonComponent = () => {
    // State משתנים
    const [currentStep, setCurrentStep] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);
    
    // Data for the lesson
    const lessonData = {
        title: "[כותרת השיעור]",
        subtitle: "[תיאור מעורר עניין שיפתח את השיעור]",
        steps: [
            {
                id: 1,
                title: "שלב ראשון",
                content: "תוכן השלב הראשון"
            },
            // הוסף שלבים נוספים...
        ]
    };
    
    // Event handlers
    const handleNextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, lessonData.steps.length - 1));
    };
    
    const handlePrevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };
    
    const toggleExplanation = () => {
        setShowExplanation(!showExplanation);
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl">
            {/* Header */}
            <header className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-violet-800 leading-tight">
                    {lessonData.title}
                </h1>
                <p className="text-xl md:text-2xl font-light italic text-indigo-600 max-w-3xl mx-auto">
                    {lessonData.subtitle}
                </p>
            </header>

            {/* Main Content */}
            <main className="space-y-8">
                {/* Interactive Section */}
                <section className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
                    <h2 className="text-3xl font-bold mb-6 text-violet-700 text-center">
                        [כותרת החלק האינטרקטיבי]
                    </h2>
                    
                    {/* כאן מגיע התוכן האינטרקטיבי */}
                    <div className="text-center">
                        <p className="text-lg text-gray-700 mb-4">
                            [הנחיות למשתמש]
                        </p>
                        
                        {/* Example interactive element */}
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <input 
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="[הכנס את התשובה שלך כאן]"
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Results/Feedback Section */}
                {userInput && (
                    <section className="bg-amber-50 p-8 rounded-2xl border border-amber-300 shadow-xl animate-fadeInUp">
                        <h3 className="text-2xl font-bold text-amber-800 mb-4 text-center">
                            [כותרת התוצאות/המשוב]
                        </h3>
                        <p className="text-lg text-gray-700 text-center">
                            [משוב על הקלט של המשתמש: {userInput}]
                        </p>
                    </section>
                )}

                {/* Navigation */}
                <nav className="flex justify-center gap-4">
                    <button
                        onClick={handlePrevStep}
                        disabled={currentStep === 0}
                        className="px-6 py-3 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
                    >
                        ← שלב קודם
                    </button>
                    <button
                        onClick={handleNextStep}
                        disabled={currentStep === lessonData.steps.length - 1}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        שלב הבא →
                    </button>
                </nav>

                {/* Scientific Explanation Toggle */}
                <div className="text-center">
                    <button
                        onClick={toggleExplanation}
                        className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-6 focus:ring-purple-300 focus:ring-opacity-75 text-lg"
                    >
                        {showExplanation ? 'הסתר הסבר מדעי' : 'הצג הסבר מדעי'}
                    </button>
                </div>

                {/* Scientific Explanation */}
                {showExplanation && (
                    <section className="bg-white p-8 rounded-2xl shadow-2xl border border-purple-300 animate-fadeInUp">
                        <h2 className="text-3xl font-bold mb-8 text-violet-800 text-center">
                            [כותרת ההסבר המדעי]
                        </h2>
                        
                        <article className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
                                    [כותרת משנה]
                                </h3>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    [תוכן ההסבר המדעי - פסקה ראשונה]
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
                                    [כותרת משנה נוספת]
                                </h3>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    [תוכן ההסבר המדעי - פסקה שנייה]
                                </p>
                            </div>
                            
                            {/* Key Points */}
                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                <h4 className="text-xl font-semibold mb-3 text-blue-700">
                                    נקודות מפתח:
                                </h4>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>[נקודה ראשונה]</li>
                                    <li>[נקודה שנייה]</li>
                                    <li>[נקודה שלישית]</li>
                                </ul>
                            </div>
                        </article>
                    </section>
                )}
            </main>
        </div>
    );
};

export default TemplateLessonComponent;
