import { Button, Text, VStack } from "@chakra-ui/react";
import { Dispatch } from "react";
import { useBirthdayInfoContext } from "../contexts/birthdayInfoContext";

type UserBirthdayInfoProps = {
  setIsEdittingUser: Dispatch<boolean>
}

export default function UserBirthdayInfo({ setIsEdittingUser }: UserBirthdayInfoProps) {
  const { userBirthday } = useBirthdayInfoContext()

  return (
    <VStack p='7'>
      <Text color='blue.500' fontSize='3xl'>User data</Text>
      <Text>
        ID: {userBirthday.id}
      </Text>
      <Text>
        Name: {userBirthday.name}
      </Text>
      <Text>
        Email: {userBirthday.email}
      </Text>
      <Text>
        Month: {userBirthday.month}
      </Text>
      <Text>
        Day: {userBirthday.day}
      </Text>
      <Text>
        Year: {userBirthday.year}
      </Text>
      <Button colorScheme='blue' onClick={() => setIsEdittingUser(true)}>Edit data</Button>
    </VStack>
  )
}
