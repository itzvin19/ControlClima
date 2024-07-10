import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styles from "./App.module.css"
import { Form } from "./components/Form/Form"
import useWeather from "./components/hooks/useWeather"
import { Spinner } from "./components/Spinner/Spinner"
import { WeatherDetail } from "./components/WeatherDetail/WeatherDetail"

function App() {

    const {weather,fetchWeather,hasWeatherData,loading} =useWeather()

 return (
    <>
      <h1 className={styles.title}>Buscador Clima</h1>
      <div className={styles.container}>
          <Form fetchWeather={fetchWeather}/>
          {loading&&<Spinner/>}
          {hasWeatherData&&<WeatherDetail weather={weather}/>}
      </div>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
