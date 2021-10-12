import { Button, Flex, FormLabel, HStack, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function AddBirthdayForm({ handleSubmit, handlePost, register, hideAddNewBirthDay, setFormStep, formStep }) {

  function nextStep() {
    setFormStep(formStep + 1)
  }

  function prevStep() {
    setFormStep(formStep + 1)
  }

  return (
    <VStack as='form' onSubmit={handleSubmit(handlePost)}>
      <FormLabel display={formStep === 1 ? 'block' : 'none'}>
        What's your name?
        <Input placeholder="What's your name?" {...register('name')}/>      
      </FormLabel>
      <FormLabel display={formStep === 2 ? 'block' : 'none'}>
        What month where you born?
        <Input placeholder='What month where you born?' {...register('month')}/>
      </FormLabel>
      <FormLabel display={formStep === 3 ? 'block' : 'none'}>
        Your day of birth is?
        <Input placeholder="Whose birthday is It?" {...register('day')}/>
      </FormLabel>
      <FormLabel display={formStep === 4 ? 'block' : 'none'}>
        What year where you born?
        <Input placeholder='What year where you born?' {...register('year')}/>
      </FormLabel>
      <HStack spacing='2'>
        <Button display={formStep === 1 ? 'none' : 'block'} onClick={prevStep}>Prev</Button>
        <Button display={formStep === 4 ? 'none' : 'block'} onClick={nextStep}>Next</Button>
        <Button display={formStep === 4 ? 'block' : 'none'} type='submit' colorScheme='blue'>Submit</Button>
        <Button onClick={hideAddNewBirthDay} colorScheme='red'>Cancel</Button>
      </HStack>
    </VStack>
  )
}
