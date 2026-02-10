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
     
      <TimeCard />
      <WeatherCard />
      <TodoList />
      <NewsCard />
      
        
      
    </>
  )
}

export default App
