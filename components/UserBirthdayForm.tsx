import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useBirthdayInfoContext } from "../contexts/birthdayInfoContext";
import { BirthdayData } from "../interfaces/birthdays";
import { Button, FormLabel, HStack, Input, VStack } from "@chakra-ui/react";

export default function UserBirthdayForm({ setIsEdittingUser }) {
  const { register, handleSubmit, reset } = useForm();
  const { setUserBirthday, birthdays } = useBirthdayInfoContext()
  const [formStep, setFormStep] = useState(1)

  const toast = useToast()

  const handlePost: SubmitHandler<BirthdayData> = async (formData) => {
    const data = {
      ...formData,
      month: formData.month.toLocaleLowerCase(),
      id: Math.random().toString(36).substr(2, 9),
      birthdays: birthdays
    }
    if (formData.name === '' || formData.month === '' || formData.day === '' || formData.year === '' || formData.email === '') {
      toast({
        title: "Error.",
        description: "One or more fields are inconplete!.",
        status: "error",
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } else {
      setUserBirthday(data)
      setFormStep(1)
      setIsEdittingUser(false)
      reset()
    }
  }

  function nextStep() {
    setFormStep(formStep + 1)
  }

  function prevStep() {
    setFormStep(formStep - 1)
  }

  return (
    <VStack as='form' onSubmit={handleSubmit(handlePost)}>
      <FormLabel display={formStep === 1 ? 'block' : 'none'}>
        What's your name?
        <Input placeholder="What's your name?" {...register('name')}/>      
      </FormLabel>
      <FormLabel display={formStep === 2 ? 'block' : 'none'}>
        What month where you born?
        <Input placeholder='Ex: 01, 02, to... 12' {...register('month')}/>
      </FormLabel>
      <FormLabel display={formStep === 3 ? 'block' : 'none'}>
        Your day of birth is?
        <Input placeholder="Ex: 01, 02, 03, 25" {...register('day')}/>
      </FormLabel>
      <FormLabel display={formStep === 4 ? 'block' : 'none'}>
        What year where you born?
        <Input placeholder='Ex: 1980, 1990, 2010' {...register('year')}/>
      </FormLabel>
      <FormLabel display={formStep === 5 ? 'block' : 'none'}>
        What's your email?
        <Input placeholder="What's your email?" {...register('email')}/>
      </FormLabel>
      <HStack spacing='2'>
        <Button display={formStep === 1 ? 'none' : 'block'} onClick={prevStep}>Prev</Button>
        <Button display={formStep === 5 ? 'none' : 'block'} onClick={nextStep}>Next</Button>
        <Button display={formStep === 5 ? 'block' : 'none'} type='submit' colorScheme='blue'>Submit</Button>
        <Button colorScheme='red' onClick={() => setIsEdittingUser(false)}>Cancel</Button>
      </HStack>
    </VStack>
  )
}
