import Header from "./components/ui/Header"
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
    </>
  )
}

export default App
