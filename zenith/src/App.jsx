import Header from "./components/ui/Header"
import NewsCard from "./components/widgets/NewsCard"
import TimeCard from "./components/widgets/TimeCard"
import TodoList from "./components/widgets/TodoList"
import WeatherCard from "./components/widgets/WeatherCard"
import './index.css'

function App() {
  

  return (
    <>
      <Header />
      <div className="flex flex-row items-start justify-center gap-6 w-full px-10 pt-10">
        <TimeCard />
        <WeatherCard />
        <TodoList />
        <NewsCard />
      </div>
        
      
    </>
  )
}

export default App
