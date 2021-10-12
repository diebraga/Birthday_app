import { ChakraProvider } from "@chakra-ui/react"
import { BirthdayInfoProvider } from "../contexts/birthdayInfoContext"
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      {/* Make birthday info contex avalible globally throgh the app */}
      <BirthdayInfoProvider>
        <Component {...pageProps} />
      </BirthdayInfoProvider>
    </ChakraProvider>
  )
}

export default MyApp