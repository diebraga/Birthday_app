import { createContext, ReactNode, useContext } from 'react'
import { BirthdayData } from '../interfaces/birthdays'
import { useLocalStorage } from '../utils/useLocalstorage'

interface BirthdayInfoProviderProp {
  children: ReactNode
}

interface BirthdayInfoContextProps {
  setBirthdays: (value: any[] | ((val: any[]) => any[])) => void
  birthdays: BirthdayData[]
}

export const BirthdayInfoContext = createContext({} as BirthdayInfoContextProps)

export function BirthdayInfoProvider({ children }: BirthdayInfoProviderProp) {
  const [birthdays, setBirthdays] = useLocalStorage<BirthdayData[]>('birthdays', [])

  return(
    <BirthdayInfoContext.Provider value={{
      setBirthdays,
      birthdays
    }}>
      {children}
    </BirthdayInfoContext.Provider>
  )
}

export function useBirthdayInfoContext() {
  const context = useContext(BirthdayInfoContext)

  return context
}
