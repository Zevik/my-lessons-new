import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// יצירת __dirname עבור ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// נתיבים
const componentsDir = path.join(__dirname, 'src', 'components');
const appJsxPath = path.join(__dirname, 'src', 'App.jsx');

/**
 * מקבל רשימת קבצי קומפוננטות ומחזיר את שמות הקומפוננטות
 */
function getComponentNames() {
    try {
        const files = fs.readdirSync(componentsDir);
        
        // מסנן רק קבצי .jsx (ולא template.jsx)
        const componentFiles = files.filter(file => 
            file.endsWith('.jsx') && 
            file !== 'template.jsx' && 
            !file.startsWith('.')
        );
        
        // מחזיר את שמות הקומפוננטות (ללא סיומת)
        const componentNames = componentFiles.map(file => 
            path.basename(file, '.jsx')
        );
        
        console.log(`נמצאו ${componentNames.length} קומפוננטות:`, componentNames);
        return componentNames;
        
    } catch (error) {
        console.error('שגיאה בקריאת תיקיית הקומפוננטות:', error);
        return [];
    }
}

/**
 * יוצר את תוכן App.jsx החדש עם כל הקומפוננטות
 */
function generateAppJsxContent(componentNames) {
    if (componentNames.length === 0) {
        return `import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        🧠 לומדות אינטראקטיביות
      </h1>
      <p className="text-center text-gray-600">
        לא נמצאו קומפוננטות זמינות. הוסף קבצי .jsx לתיקיית src/components/
      </p>
    </div>
  )
}

export default App
`;
    }

    // יצירת imports
    const imports = componentNames
        .map(name => `import ${name} from './components/${name}.jsx'`)
        .join('\n');

    // יצירת רשימת קומפוננטות להצגה
    const componentsList = componentNames
        .map((name, index) => `        <${name} key="${index}" />`)
        .join('\n');

    return `${imports}
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-violet-800">
            🧠 לומדות אינטראקטיביות
          </h1>
          <p className="text-xl text-center text-indigo-600 mt-2">
            פסיכולוגיה, חברה וקוגניציה
          </p>
        </div>
      </header>
      
      <main className="space-y-12">
${componentsList}
      </main>
      
      <footer className="text-center py-8 text-gray-500">
        <p>מפותח עם ❤️ לקהילה הלומדת</p>
      </footer>
    </div>
  )
}

export default App
`;
}

/**
 * עדכון App.jsx עם הקומפוננטות החדשות
 */
function updateAppJsx() {
    try {
        console.log('🔄 מתחיל עדכון App.jsx...');
        
        // קבלת רשימת הקומפוננטות
        const componentNames = getComponentNames();
        
        // יצירת תוכן חדש
        const newContent = generateAppJsxContent(componentNames);
        
        // גיבוי של הקובץ הישן
        if (fs.existsSync(appJsxPath)) {
            const backupPath = appJsxPath + '.backup.' + Date.now();
            fs.copyFileSync(appJsxPath, backupPath);
            console.log(`📋 נוצר גיבוי ב: ${backupPath}`);
        }
        
        // כתיבת הקובץ החדש
        fs.writeFileSync(appJsxPath, newContent, 'utf8');
        
        console.log('✅ App.jsx עודכן בהצלחה!');
        console.log(`📊 נוספו ${componentNames.length} קומפוננטות:`);
        componentNames.forEach((name, index) => {
            console.log(`   ${index + 1}. ${name}`);
        });
        
    } catch (error) {
        console.error('❌ שגיאה בעדכון App.jsx:', error);
        process.exit(1);
    }
}

/**
 * בדיקת תקינות הפרויקט
 */
function validateProject() {
    if (!fs.existsSync(componentsDir)) {
        console.error('❌ תיקיית components לא נמצאה:', componentsDir);
        return false;
    }
    
    if (!fs.existsSync(path.dirname(appJsxPath))) {
        console.error('❌ תיקיית src לא נמצאה:', path.dirname(appJsxPath));
        return false;
    }
    
    return true;
}

// הפעלת הסקריפט
function main() {
    console.log('🚀 מתחיל סקריפט עדכון קומפוננטות...');
    
    if (!validateProject()) {
        console.error('❌ בדיקת התקינות נכשלה');
        process.exit(1);
    }
    
    updateAppJsx();
    console.log('🎉 הסקריפט הושלם בהצלחה!');
}

// הפעלה רק אם הקובץ מופעל ישירות
main();

export {
    getComponentNames,
    generateAppJsxContent,
    updateAppJsx
};
