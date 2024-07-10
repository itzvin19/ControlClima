import axios from "axios"
import { SearchType } from "../../types"
import z from "zod"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"


const WeatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})


export type Weather = z.infer<typeof WeatherSchema>

export default function useWeather() {

    const initialState:Weather={
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    }

    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        const appID = import.meta.env.VITE_API_KEY
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`
        setLoading(true)
        setWeather(initialState)
        try {
            const { data } = await axios(geoUrl)

            if(!data[0]){
                toast("No se encontró la ciudad",{
                    type:'error',
                    autoClose:1500
                })
                return
            }

            const lat = data[0].lat
            const lon = data[0].lon

            

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`
            const { data: weatherResult } = await axios(weatherUrl)
            const result = WeatherSchema.safeParse(weatherResult)
            if (result.success) {
                setWeather(result.data)
            } else {
                console.log(result.error)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather.name])

    return {
        weather,
        fetchWeather,
        hasWeatherData,
        loading
    }
}