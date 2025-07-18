import React, { useState, useEffect, useRef } from 'react';

/**
 * EvolutionTheAmazingStoryOfLife Component
 * A React component that explains the concept of evolution through text and a simplified interactive simulation.
 * It demonstrates natural selection based on environmental factors influencing a creature's trait (fur color).
 */
function EvolutionTheAmazingStoryOfLife() {
  const title = "האבולוציה: המסע המדהים של החיים";
  const category = "ביולוגיה";
  const tags = ["אבולוציה", "ברירה טבעית", "הסתגלות", "מינים", "ביולוגיה", "דארווין"];
  const hook = "הביטו סביבכם: כל יצור חי – מהפרפר הצבעוני ועד לעץ העתיק – הוא עדות מרהיבה לכוחה של ההסתגלות. אבל כיצד נוצרו מיליוני המינים המדהימים על פני כדור הארץ? האם הם תמיד היו כאן, או שמא השתנו באופן דרמטי לאורך מיליוני שנים?";

  // State for explanation visibility
  const [showExplanation, setShowExplanation] = useState(false);

  // Simulation constants
  const POPULATION_SIZE = 100;
  const MUTATION_RATE = 0.07; // Increased mutation rate slightly for more visible changes
  const BASE_SURVIVAL_RATE = 0.55; // Slightly reduced base survival rate
  const ADAPTATION_EFFECT = 0.35; // Increased adaptation effect for stronger selection

  // Simulation states
  const [population, setPopulation] = useState([]); // Array of { id: number, color: 'light' | 'dark' }
  const [generation, setGeneration] = useState(0);
  const [environmentFactor, setEnvironmentFactor] = useState('none'); // 'predator_light', 'food_dark', 'cold'
  const [traitDistribution, setTraitDistribution] = useState([]); // [{ gen: 0, light: 50, dark: 50 }, ...]
  const simulationRef = useRef(null); // Ref for scrolling to simulation

  /**
   * Initializes the population with an equal distribution of light and dark creatures.
   * Resets generation count and trait distribution history.
   */
  const initializePopulation = () => {
    const initialPop = [];
    for (let i = 0; i < POPULATION_SIZE / 2; i++) {
      initialPop.push({ id: i, color: 'light' });
    }
    for (let i = POPULATION_SIZE / 2; i < POPULATION_SIZE; i++) {
      initialPop.push({ id: i, color: 'dark' });
    }
    setPopulation(initialPop);
    setGeneration(0);
    const initialDistribution = { gen: 0, light: POPULATION_SIZE / 2, dark: POPULATION_SIZE / 2 };
    setTraitDistribution([initialDistribution]);
  };

  // Effect to initialize population on component mount
  useEffect(() => {
    initializePopulation();
  }, []);

  // Scroll to simulation when explanation is toggled or when simulation resets
  useEffect(() => {
    if (simulationRef.current) {
      simulationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showExplanation, generation === 0 && environmentFactor === 'none']); // Scroll on initial load, and when reset

  /**
   * Resets the simulation to its initial state, including environmental factor.
   */
  const resetSimulation = () => {
    setEnvironmentFactor('none');
    initializePopulation();
  };

  /**
   * Advances the simulation by one generation.
   * Applies survival based on environment, then reproduction with mutation.
   */
  const advanceGeneration = () => {
    if (environmentFactor === 'none') {
      // Improved UX: Instead of alert, make the button disabled until factor is chosen.
      // This case should ideally not be reachable if button is correctly disabled.
      return;
    }

    setGeneration(prevGen => prevGen + 1);

    let survivingPopulation = [];
    const lightCreatures = population.filter(p => p.color === 'light');
    const darkCreatures = population.filter(p => p.color === 'dark');

    // Determine survival probabilities based on environment factor
    let lightSurvivalProb = BASE_SURVIVAL_RATE;
    let darkSurvivalProb = BASE_SURVIVAL_RATE;

    // In this simulation, 'dark' fur is always advantageous for selected factors
    if (environmentFactor === 'predator_light' || environmentFactor === 'food_dark' || environmentFactor === 'cold') {
      lightSurvivalProb = Math.max(0, BASE_SURVIVAL_RATE - ADAPTATION_EFFECT); // Disadvantage for light
      darkSurvivalProb = Math.min(1, BASE_SURVIVAL_RATE + ADAPTATION_EFFECT);  // Advantage for dark
    }

    // Apply survival logic for each creature
    lightCreatures.forEach(creature => {
      if (Math.random() < lightSurvivalProb) {
        survivingPopulation.push(creature);
      }
    });
    darkCreatures.forEach(creature => {
      if (Math.random() < darkSurvivalProb) {
        survivingPopulation.push(creature);
      }
    });

    // Reproduction to replenish population to POPULATION_SIZE
    let newPopulation = [];
    let currentId = 0;
    while (newPopulation.length < POPULATION_SIZE) {
      if (survivingPopulation.length === 0) {
        // If all creatures died, the next generation will be empty. User must reset.
        break;
      }
      const parent = survivingPopulation[Math.floor(Math.random() * survivingPopulation.length)];
      let offspringColor = parent.color;

      // Apply mutation
      if (Math.random() < MUTATION_RATE) {
        offspringColor = offspringColor === 'light' ? 'dark' : 'light';
      }
      newPopulation.push({ id: currentId++, color: offspringColor });
    }

    setPopulation(newPopulation);

    // Update trait distribution for graph history
    const newLightCount = newPopulation.filter(p => p.color === 'light').length;
    const newDarkCount = newPopulation.filter(p => p.color === 'dark').length;
    setTraitDistribution(prevDist => [...prevDist, { gen: prevDist.length, light: newLightCount, dark: newDarkCount }]);
  };

  /**
   * Returns a human-readable description for the selected environmental factor.
   * @param {string} factor - The environmental factor key.
   * @returns {string} Description of the factor.
   */
  const getEnvironmentDescription = (factor) => {
    switch (factor) {
      case 'none': return 'בחרו אתגר סביבתי';
      case 'predator_light': return 'טורף העוקב אחר צבע בהיר';
      case 'food_dark': return 'מקור מזון נסתר';
      case 'cold': return 'אקלים קיצוני וקר';
      default: return '';
    }
  };

  /**
   * Renders a simple bar graph visualizing the current and historical trait distribution.
   * @returns {JSX.Element | null} The graph JSX or null if no data.
   */
  const renderGraph = () => {
    const lastGen = traitDistribution[traitDistribution.length - 1];
    if (!lastGen) return null;

    const total = lastGen.light + lastGen.dark;
    const lightPercentage = total > 0 ? (lastGen.light / total) * 100 : 0;
    const darkPercentage = total > 0 ? (lastGen.dark / total) * 100 : 0;

    return (
      <div className="flex flex-col items-center mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h4 className="text-2xl font-bold mb-4 text-violet-800">התפלגות אוכלוסייה לפי תכונת הפרווה (דור {generation})</h4>
        <div className="flex w-full max-w-lg h-12 rounded-xl overflow-hidden border border-gray-300 shadow-md transform transition-all duration-500 ease-out">
          <div
            className={`bg-amber-400 flex items-center justify-center text-gray-900 font-extrabold text-lg px-2 transition-all duration-500 ease-out`}
            style={{ width: `${lightPercentage}%` }}
          >
            {lightPercentage > 7 && `${lightPercentage.toFixed(0)}%`}
          </div>
          <div
            className={`bg-slate-800 flex items-center justify-center text-white font-extrabold text-lg px-2 transition-all duration-500 ease-out`}
            style={{ width: `${darkPercentage}%` }}
          >
            {darkPercentage > 7 && `${darkPercentage.toFixed(0)}%`}
          </div>
        </div>
        <div className="flex justify-between w-full max-w-lg text-md mt-2 font-semibold">
          <span className="text-amber-700">בהיר: {lastGen.light}</span>
          <span className="text-slate-900">כהה: {lastGen.dark}</span>
        </div>

        <div className="mt-8 w-full max-w-lg">
          <p className="text-lg font-bold mb-3 text-center text-violet-800">היסטוריית התפתחות האוכלוסייה לאורך דורות:</p>
          <div className="flex flex-wrap justify-center max-h-48 overflow-y-auto w-full p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-inner scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {traitDistribution.map((data, index) => (
              <div key={index} className="flex flex-col items-center w-[80px] mx-1 mb-3 transition-transform duration-300 hover:scale-105">
                <span className="text-sm font-semibold text-gray-700">דור {data.gen}</span>
                <div className="flex w-full h-4 rounded-md overflow-hidden text-xs shadow-sm mt-1">
                  <div
                    className={`bg-amber-400 rounded-l-md transition-all duration-500 ease-out`}
                    style={{ width: `${(data.light / (data.light + data.dark)) * 100}%` }}
                  ></div>
                  <div
                    className={`bg-slate-800 rounded-r-md transition-all duration-500 ease-out`}
                    style={{ width: `${(data.dark / (data.light + data.dark)) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 mt-1">ב: {data.light}, כ: {data.dark}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="container mx-auto p-4 max-w-5xl font-sans text-right bg-gray-50 rounded-lg shadow-lg my-8" dir="rtl">
      {/* Header Section */}
      <header className="mb-10 text-center md:text-right">
        <h1 className="text-5xl font-extrabold mb-4 text-violet-800 leading-tight">{title}</h1>
        <p className="text-gray-600 mb-2 text-lg">
          <span className="font-semibold text-violet-600">קטגוריה:</span> {category}
        </p>
        <div className="mb-6 flex flex-wrap gap-2 justify-center md:justify-end">
          <span className="font-semibold text-gray-600">תגיות:</span>
          {tags.map((tag, index) => (
            <span key={index} className="bg-violet-100 text-violet-800 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-violet-200 transition-all duration-200 hover:scale-105 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Hook Section */}
      <section className="bg-indigo-50 p-6 rounded-xl shadow-inner mb-12 border border-indigo-200">
        <p className="text-2xl italic mb-4 text-indigo-800 leading-relaxed font-medium">{hook}</p>
      </section>

      {/* Interactive Simulation Section */}
      <section ref={simulationRef} className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 rounded-2xl shadow-2xl mb-12 border border-indigo-200">
        <h2 className="text-4xl font-bold mb-6 text-center text-indigo-800">הברירה הטבעית בפעולה: סימולציה אינטראקטיבית</h2>
        <p className="text-xl mb-6 text-center text-gray-700 leading-relaxed">
          צאו למסע מרתק וצפו כיצד אוכלוסיית יצורים משתנה מדור לדור בהשפעת גורמים סביבתיים.
          התחילו עם אוכלוסייה מגוונת של יצורים בעלי פרווה בהירה וכהה.
          <span className="font-semibold text-indigo-700 block mt-2">בחרו 'אתגר סביבתי' והתחילו את הסימולציה כדי לגלות את סודות ההסתגלות!</span>
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          <label htmlFor="environment" className="font-semibold text-xl text-gray-700 whitespace-nowrap">בחרו אתגר סביבתי:</label>
          <select
            id="environment"
            className="p-4 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400 text-lg w-full md:w-auto transition-all duration-300 ease-in-out bg-white text-gray-800"
            value={environmentFactor}
            onChange={(e) => {
              setEnvironmentFactor(e.target.value);
              initializePopulation(); // Reset population when environment changes to reflect new conditions
            }}
          >
            <option value="none">-- בחרו אתגר --</option>
            <option value="predator_light">טורף העוקב אחר צבע בהיר (יתרון להישרדות לכהים)</option>
            <option value="food_dark">מזון נסתר בצמחייה (קל יותר לכהים למצוא)</option>
            <option value="cold">אקלים קיצוני וקר (עדיפות לפרווה כהה)</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={advanceGeneration}
            disabled={environmentFactor === 'none' || population.length === 0}
            className={`px-8 py-4 rounded-xl shadow-lg text-white font-bold text-xl transition-all duration-300 ease-out transform ${
              environmentFactor === 'none' || population.length === 0
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400 hover:-translate-y-1 hover:shadow-xl'
            }`}
          >
            התקדם לדור הבא ({generation})
          </button>
          <button
            onClick={resetSimulation}
            className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xl rounded-xl shadow-lg transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-400"
          >
            התחל מחדש את הסימולציה
          </button>
        </div>

        {environmentFactor !== 'none' && (
          <p className="text-center text-xl text-gray-700 mb-6 font-semibold animate-pulse-once">
            האתגר הסביבתי הפעיל: <span className="text-indigo-600 font-bold">{getEnvironmentDescription(environmentFactor)}</span>
          </p>
        )}

        {/* Population Visualization */}
        <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 gap-2 bg-white p-6 rounded-xl shadow-inner border border-gray-200 min-h-[140px] items-center justify-center">
          {population.length > 0 ? (
            population.map((creature) => (
              <div
                key={creature.id}
                className={`w-7 h-7 rounded-full flex-shrink-0
                ${creature.color === 'light' ? 'bg-amber-300' : 'bg-slate-800'}
                shadow-md transition-transform duration-300 ease-out hover:scale-110 cursor-help`}
                title={`צבע: ${creature.color === 'light' ? 'בהיר' : 'כהה'}`}
              ></div>
            ))
          ) : (
            <p className="col-span-full text-center text-2xl text-rose-600 font-extrabold animate-bounce-in">
              אוי! האוכלוסייה נכחדה. נסו שוב על ידי הפעלת הסימולציה מחדש...
            </p>
          )}
        </div>

        {/* Graph showing trait distribution */}
        {renderGraph()}

        <p className="text-lg mt-8 text-center text-gray-800 border-t border-gray-200 pt-6 font-medium leading-relaxed">
          <span className="font-bold text-indigo-700">תובנת מפתח:</span> גורמי לחץ סביבתיים מפעילים 'ברירה טבעית' עוצמתית, המעדיפה פרטים בעלי תכונות ספציפיות המותאמות לסביבה. בכך, הם מניעים שינוי הדרגתי ובלתי פוסק באוכלוסייה כולה, ומוכיחים כיצד הצטברות אינסופית של שינויים זעירים יכולה להוביל להיווצרות תכונות חדשות לגמרי ואף למינים חדשים.
        </p>
      </section>

      {/* Toggle Button for Explanation */}
      <div className="flex justify-center mb-12">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="px-10 py-5 bg-violet-700 hover:bg-violet-800 text-white font-bold text-2xl rounded-full shadow-xl transform transition-all duration-500 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-400 focus:ring-offset-2"
        >
          {showExplanation ? 'לצמצם: הסתר את ההסבר המדעי' : 'לצלול לעומק: הצג את ההסבר המדעי'}
        </button>
      </div>

      {/* Scientific Explanation Section (Conditional Rendering) */}
      {showExplanation && (
        <section className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-200 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-8 text-center text-violet-800">האבולוציה בפוקוס: עקרונות המפתח</h2>

          <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
            <div>
              <h3 className="text-3xl font-semibold mb-3 text-violet-700">מהי אבולוציה?</h3>
              <p>
                אבולוציה היא תהליך טבעי ומתמשך של שינוי בתכונות תורשתיות של אוכלוסיות ביולוגיות לאורך דורות.
                היא הגורם המרכזי למגוון העצום והמרהיב של החיים על פני כדור הארץ, ומתרחשת באמצעות מנגנונים רבי עוצמה.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold mb-3 text-violet-700">מנגנוני המפתח של האבולוציה:</h3>
              <ul className="list-disc pr-6 space-y-4 marker:text-violet-500">
                <li>
                  <span className="font-bold text-gray-900">שונות (וריאציה):</span> בכל אוכלוסייה קיימים הבדלים אינדיבידואליים בין הפרטים.
                  מאיפה היא נובעת? בעיקר ממוטציות אקראיות (שינויים בקוד הגנטי) ומשילוב מחדש של גנים בהתרבות מינית.
                  שונות זו היא "חומר הגלם" הבלתי נדלה שעליו פועלת האבולוציה.
                </li>
                <li>
                  <span className="font-bold text-gray-900">תורשה:</span> תכונות מסוימות עוברות מהורים לצאצאים באמצעות גנים.
                  רק תכונות בעלות בסיס תורשתי יכולות להיות מושפעות מתהליכים אבולוציוניים.
                </li>
                <li>
                  <span className="font-bold text-gray-900">ברירה טבעית:</span> זהו המנגנון המפורסם והחזק ביותר, שפורסם על ידי צ'ארלס דארווין. הוא פועל על בסיס העקרונות הבאים:
                  <ul className="list-circle pr-6 mt-3 space-y-2 marker:text-emerald-500">
                    <li><span className="font-semibold text-gray-800">ריבוי יתר:</span> יצורים נוטים לייצר יותר צאצאים ממה שהסביבה יכולה לתמוך בהם.</li>
                    <li><span className="font-semibold text-gray-800">שונות:</span> קיימת שונות טבעית בין הפרטים באוכלוסייה.</li>
                    <li><span className="font-semibold text-gray-800">תורשה:</span> חלק מהשונות הזו היא תורשתית ועוברת לדור הבא.</li>
                    <li><span className="font-semibold text-gray-800">הישרדות והתרבות דיפרנציאלית:</span> פרטים בעלי תכונות המותאמות טוב יותר לתנאי הסביבה הספציפיים נוטים לשרוד ולהתרבות בהצלחה רבה יותר מאחרים.
                      <p className="mt-1 text-base italic">דוגמאות מובהקות: פרפרים בהירים בסביבה כהה ייתפסו בקלות על ידי טורפים, בעוד פרפרים כהים יתמזגו ויתרבו ביתר קלות.</p>
                    </li>
                  </ul>
                  כתוצאה מכך, תכונות המעניקות יתרון הישרדותי או רבייתי הופכות נפוצות יותר באוכלוסייה מדור לדור.
                </li>
                <li>
                  <span className="font-bold text-gray-900">הסתגלות:</span> תכונות מסוימות "נבחרות" ומשתפרות בהתאמה לתנאי הסביבה לאורך זמן.
                  תהליך זה הופך את הפרטים למותאמים יותר ויותר לסביבתם, והתכונות המיטיבות הופכות לנפוצות בקרב האוכלוסייה.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-semibold mb-3 text-violet-700">האם זה תמיד 'החזק ששורד'?</h3>
              <p>
                זוהי הנחה שגויה נפוצה. המושג המדויק יותר הוא <span className="font-bold text-indigo-700">'המתאים ביותר ששורד'</span>. התאמה אינה בהכרח כוח פיזי או אגרסיביות, אלא היכולת לשרוד, להתרבות ולהעביר גנים בהצלחה המרבית בתנאים הסביבתיים הנתונים.
                לדוגמה, בסביבה עם מעט מזון, יצור קטן וחסכוני באנרגיה עשוי להיות "מתאים" יותר מיצור גדול וחזק.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold mb-3 text-violet-700">הצטברות שינויים: ממינים קיימים למינים חדשים</h3>
              <p>
                האבולוציה פועלת בהדרגה בלתי נתפסת. שינויים קטנים ומצטברים לאורך אלפי ומיליוני דורות יכולים להוביל לשינויים דרמטיים ביותר,
                כולל היווצרות מינים חדשים לגמרי (תהליך הנקרא <span className="font-semibold text-indigo-700">ספציאציה</span>), שאינם יכולים עוד להתרבות זה עם זה.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold mb-3 text-violet-700">ראיות מדעיות חותכות לאבולוציה:</h3>
              <ul className="list-disc pr-6 space-y-4 marker:text-violet-500">
                <li><span className="font-bold text-gray-900">מאובנים:</span> תיעוד עשיר של צורות חיים קדומות המציגות רצפים של שינויים הדרגתיים לאורך מיליוני שנים.</li>
                <li><span className="font-bold text-gray-900">דמיון גנטי (DNA):</span> ככל שמינים קרובים יותר מבחינה אבולוציונית, כך רצפי ה-DNA שלהם דומים יותר – עדות לאב קדמון משותף.</li>
                <li><span className="font-bold text-gray-900">אנטומיה השוואתית:</span> מבנים דומים באורגניזמים שונים (כמו מבנה עצמות הגפיים אצל יונקים שונים) המצביעים על מקור התפתחותי משותף.</li>
                <li><span className="font-bold text-gray-900">אמבריולוגיה:</span> דמיון מפתיע בין עוברים של מינים שונים בשלבים מוקדמים של התפתחותם.</li>
                <li><span className="font-bold text-gray-900">אבולוציה נצפית:</span> דוגמאות כמו התפתחות עמידות לאנטיביוטיקה בבקטריות, או שינויים באוכלוסיות חרקים המפתחים עמידות לחומרי הדברה – תהליכים אבולוציוניים המתרחשים לנגד עינינו.</li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default EvolutionTheAmazingStoryOfLife;