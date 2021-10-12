import { Box, Button, Wrap, Text, VStack } from "@chakra-ui/react"
import { useBirthdayInfoContext } from "../contexts/birthdayInfoContext"

export default function BirthdayList() {
  const { birthdays, setBirthdays } = useBirthdayInfoContext()

  return (
    <Box p='7'>
      <Text color='blue.500' fontSize='3xl'>Family members</Text>
      <Wrap>
        {birthdays.map((birthday, index) => {
          const handleRemoveItem = (id: any) => {
            setBirthdays(birthdays.filter((item) => id !== item.id));
          }
          
          return (
            <VStack key={index} pl='7' pr='7' pt='2'>
              <Text>
                ID: {birthday.id}
              </Text>
              <Text>
                Name: {birthday.name}
              </Text>
              <Text>
                Email: {birthday.email}
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
              <Button colorScheme='red' onClick={()=>handleRemoveItem(birthday.id)}>Delete</Button>
            </VStack>
          )
        })}
      </Wrap>
    </Box>
  )
}
