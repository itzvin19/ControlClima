import { PropsWithChildren } from "react"
import styles from "./Alert.module.css"

export const Alert = ({children}:PropsWithChildren) => {
  return (
    <div className={styles.alert}>{children}</div>
  )
}
