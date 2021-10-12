import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { useBirthdayInfoContext } from "../contexts/birthdayInfoContext"

export default function BirthdayList() {
  const { birthdays, setBirthdays } = useBirthdayInfoContext()

  return (
    <Flex>
      {birthdays.map((birthday, index) => {
        const handleRemoveItem = () => {
          setBirthdays(birthdays.filter((item) => item.id !== item.id));
        }
        
        return (
          <VStack key={index} p='7'>
            <Text>
              ID: {birthday.id}
            </Text>
            <Text>
              Name: {birthday.name}
            </Text>
            <Text>
              Month: {birthday.month}
            </Text>
            <Text>
              Day: {birthday.day}
            </Text>
            <Text>
              Year: {birthday.year}
            </Text>
            <Button colorScheme='red' onClick={handleRemoveItem}>Delete</Button>
          </VStack>
        )
      })}
    </Flex>
  )
}
