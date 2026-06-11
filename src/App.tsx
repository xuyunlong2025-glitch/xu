import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { SimulatePage } from './pages/SimulatePage';
import { TeamsPage } from './pages/TeamsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'simulate':
        return <SimulatePage />;
      case 'teams':
        return <TeamsPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="py-8">
        {renderPage()}
      </main>
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 世界杯预测软件</p>
          <p className="text-gray-500 text-sm mt-1">模拟比赛仅供娱乐，实际比赛结果请以官方为准</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
