# פרויקט השיעורים האינטרקטיביים שלי 🎓

## סקירה כללית
זהו פרויקט לפיתוח שיעורים אינטרקטיביים מבוססי React, המיועד ליצירת חוויות למידה מרתקות על נושאים שונים.

## הסטאק הטכנולוגי
- **React** - ספריית UI לבניית רכיבים אינטרקטיביים
- **Vite** - כלי פיתוח מהיר וחדיש
- **Tailwind CSS** - framework CSS ליצירת עיצובים מהירים ומותאמים
- **JavaScript/JSX** - שפת הפיתוח העיקרית

## התקנה והפעלה

### דרישות מקדימות
- Node.js (גרסה 16 ומעלה)
- npm או yarn

### הוראות התקנה
```bash
# התקנת התלויות
npm install

# הפעלת שרת הפיתוח
npm run dev

# בניית הפרויקט לייצור
npm run build

# תצוגה מקדימה של הבנייה
npm run preview

# עדכון אוטומטי של כל הקומפוננטות ב-App.jsx
npm run update-components
```

## מבנה הפרויקט
```
my-lessons-vite/
├── src/
│   ├── components/          # רכיבי השיעורים
│   │   └── CarnismWhyWeEatCertainAnimalsNotOthers.jsx
│   ├── App.jsx             # רכיב האפליקציה הראשי
│   ├── main.jsx           # נקודת הכניסה
│   └── index.css          # סגנונות גלובליים
├── public/                 # קבצים סטטיים
├── index.html             # קובץ HTML ראשי
├── package.json           # תלויות ויאיים
├── vite.config.js         # הגדרות Vite
└── tailwind.config.js     # הגדרות Tailwind CSS
```

## יצירת שיעור חדש

### תבנית בסיסית לרכיב שיעור
```jsx
import React, { useState, useEffect } from 'react';

/**
 * [שם השיעור] Component
 *
 * תיאור קצר של מה השיעור מלמד ואיך הוא עובד
 */
const [שם הרכיב] = () => {
    // State משתנים
    const [someState, setSomeState] = useState(initialValue);
    
    // פונקציות עזר
    const handleSomeAction = () => {
        // לוגיקה של השיעור
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-800 font-sans shadow-2xl rounded-3xl my-10 max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-violet-800 leading-tight">
                כותרת השיעור
            </h1>
            
            <p className="text-xl md:text-2xl font-light italic text-indigo-600 text-center mb-10 max-w-3xl mx-auto">
                תיאור מעורר עניין שיפתח את השיעור
            </p>

            {/* תוכן השיעור כאן */}
            
        </div>
    );
};

export default [שם הרכיב];
```

### עקרונות עיצוב
1. **נגישות** - שימוש בניגודיות טובה וטקסט ברור
2. **רספונסיביות** - התאמה למכשירים שונים
3. **אינטרקטיביות** - מעורבות משתמש פעילה
4. **חווית משתמש** - ניווט אינטואיטיבי ומשוב ויזואלי

### מאפיינים רצויים בשיעור
- **אינטרקטיביות** - גרירה ושחרור, לחיצות, הקלדות
- **משוב מידי** - תגובה לפעולות המשתמש
- **הסבר מדעי** - הצגת המידע בצורה מבוססת מחקר
- **חווייתיות** - עיצוב מעורר עניין ומשתף

## יעוד הפרויקט
הפרויקט נועד לפיתוח מגוון רחב של שיעורים:
- **מדעי הרגש והתנהגות**
- **פילוסופיה ואתיקה**
- **מדעי החברה**
- **סביבה וקיימות**
- **בריאות ותזונה**

## תרומה לפרויקט
1. צרו branch חדש לשיעור שלכם
2. פתחו קובץ רכיב חדש ב `src/components/`
3. עקבו אחר התבנית הבסיסית
4. הפעילו `npm run update-components` (במקום עדכון ידני)
5. בדקו שהכל עובד באמצעות `npm run dev`

## 🔄 עדכון אוטומטי של קומפוננטות
הפרויקט כולל סקריפט חכם שמעדכן אוטומטית את `App.jsx`:
```bash
npm run update-components
```
הסקריפט:
- סורק את כל הקבצים ב-`src/components/`
- יוצר imports אוטומטיים
- מעדכן את App.jsx עם כל הקומפוננטות
- יוצר גיבוי של הגרסה הקודמת

לפרטים נוספים: `SCRIPT-README.md`

## טיפים לפיתוח
- השתמשו ב **useState** לניהול מצב מקומי
- השתמשו ב **useEffect** לפעולות צד
- אפשרו ל **Tailwind CSS** לטפל בעיצוב
- הוסיפו **הערות קוד** לבהירות
- בדקו **נגישות** על מכשירים שונים

---

**מפותח עם ❤️ לקהילה הלומדת**
