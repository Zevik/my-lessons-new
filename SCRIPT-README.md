# 🔄 סקריפט עדכון קומפוננטות

סקריפט אוטומטי לעדכון `App.jsx` עם כל הקומפוננטות שנמצאות בתיקיית `components`.

## 🎯 מטרה
כל פעם שמוסיפים קומפוננטה חדשה לתיקיית `src/components/`, הסקריפט יעדכן אוטומטית את `App.jsx` להציג את כל הקומפוננטות.

## 🚀 הפעלה

### דרך npm (מומלץ):
```bash
npm run update-components
```

### הפעלה ישירה:
```bash
node update-components.js
```

## 📋 מה הסקריפט עושה

1. **סורק את תיקיית `src/components/`** - מחפש קבצי `.jsx`
2. **מסנן קבצים** - מתעלם מ-`template.jsx` וקבצים מוסתרים
3. **יוצר גיבוי** - שומר את `App.jsx` הישן עם timestamp
4. **יוצר App.jsx חדש** - עם imports וקריאות לכל הקומפוננטות
5. **מספק משוב** - מראה כמה קומפוננטות נוספו

## 📁 מבנה הקובץ שנוצר

```jsx
// Imports אוטומטיים
import Component1 from './components/Component1'
import Component2 from './components/Component2'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header קבוע */}
      <header>...</header>
      
      {/* כל הקומפוננטות */}
      <main className="space-y-12">
        <Component1 key="0" />
        <Component2 key="1" />
      </main>
      
      {/* Footer */}
      <footer>...</footer>
    </div>
  )
}
```

## ⚙️ הגדרות

- **תיקיית קומפוננטות:** `src/components/`
- **קובץ יעד:** `src/App.jsx`
- **סוג קבצים:** `.jsx` בלבד
- **קבצים נתעלמים:** `template.jsx`, קבצים מוסתרים

## 🔧 פתרון בעיות

### הסקריפט לא מוצא קומפוננטות:
- ודא שהקבצים נמצאים ב-`src/components/`
- ודא שהקבצים מסתיימים ב-`.jsx`
- ודא שאין שגיאות בנתיבים

### שגיאת הרשאות:
- ודא שיש הרשאות כתיבה לקובץ `App.jsx`
- בדוק שהקובץ לא פתוח בעורך אחר

### הקומפוננטות לא מופיעות:
- הפעל את השרת: `npm run dev`
- בדוק שאין שגיאות JavaScript בקונסול

## 📝 דוגמת שימוש

```bash
# הוסף קומפוננטה חדשה
# src/components/NewLesson.jsx

# הפעל עדכון
npm run update-components

# הקומפוננטה תופיע אוטומטית באפליקציה
```

## 🎉 יתרונות

- **חסכון זמן** - לא צריך לערוך App.jsx ידנית
- **מניעת שגיאות** - imports אוטומטיים נכונים
- **גיבוי אוטומטי** - שמירת גרסאות קודמות
- **עיצוב עקבי** - layout אחיד לכל הקומפוננטות

---
**שימוש מהיר:** `npm run update-components` 🚀
