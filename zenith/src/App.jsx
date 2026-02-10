import Header from "./components/ui/Header"
import NewsCard from "./components/widgets/NewsCard"
import TimeCard from "./components/widgets/TimeCard"
import TodoList from "./components/widgets/TodoList"
import WeatherCard from "./components/widgets/WeatherCard"
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Header />
     
      {/* LAYOUT FIX: 
          flex-row: Aligns children horizontally
          items-start: Keeps them aligned at the top
          gap-6: Adds space between the cards
      */}
      <div className="flex flex-row items-start justify-start gap-6 px-10 pt-8 w-full">
        <TimeCard />
        <WeatherCard />
        <TodoList />
      </div>

      {/* News stays below the main widget row */}
      <div className="px-10 mt-8">
        <NewsCard />
      </div>
    </div>
  )
}

export default App