import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import { SearchType } from "../../types"
import { Alert } from "../Alert/Alert"

type FormProps={
    fetchWeather:(search:SearchType)=>Promise<void>
}

export const Form = ({fetchWeather}:FormProps) => {

    const [search, setSearch] = useState<SearchType>({
        country: '',
        city: ''
    })

    const [alert,setAlert]=useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({ ...search, [e.target.name]: e.target.value })
    }

    const handleSubmit  =(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }
        fetchWeather(search)
    }

    return (

        <form action="" className={styles.form} onSubmit={handleSubmit}>
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select id="country" name="country" value={search.country} onChange={handleChange}>
                    <option value="">-- Seleccione un país --</option>
                    {countries.map(country => (
                        <option
                            value={country.code}
                            key={country.code}>{country.name}</option>
                    ))}
                </select>
            </div>
            <input type="submit" className={styles.submit} value='Consultar Clima' />
        </form>
    )
}
