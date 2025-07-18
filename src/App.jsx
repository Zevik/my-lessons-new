import CarnismWhyWeEatCertainAnimalsNotOthers from './components/CarnismWhyWeEatCertainAnimalsNotOthers.jsx'
import EvolutionTheAmazingStoryOfLife from './components/EvolutionTheAmazingStoryOfLife.jsx'
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
        <CarnismWhyWeEatCertainAnimalsNotOthers key="0" />
        <EvolutionTheAmazingStoryOfLife key="1" />
      </main>
      
      <footer className="text-center py-8 text-gray-500">
        <p>מפותח עם ❤️ לקהילה הלומדת</p>
      </footer>
    </div>
  )
}

export default App
