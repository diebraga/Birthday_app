import { Button, FormLabel, HStack, Input, VStack } from "@chakra-ui/react";

export default function AddBirthdayForm({ handleSubmit, handlePost, register, hideAddNewBirthDay, setFormStep, formStep }) {

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
        <Input placeholder="Person's name?" {...register('name')}/>      
      </FormLabel>
      <FormLabel display={formStep === 2 ? 'block' : 'none'}>
        Month of birth?
        <Input placeholder='Ex: 01, 02, to... 12' {...register('month')}/>
      </FormLabel>
      <FormLabel display={formStep === 3 ? 'block' : 'none'}>
        Day of birth?
        <Input placeholder="Ex: 01, 02, 03, 25" {...register('day')}/>
      </FormLabel>
      <FormLabel display={formStep === 4 ? 'block' : 'none'}>
        Year of birth?
        <Input placeholder='Ex: 1980, 1990, 2010' {...register('year')}/>
      </FormLabel>
      <FormLabel display={formStep === 5 ? 'block' : 'none'}>
        Email?
        <Input placeholder="Email?" {...register('email')}/>
      </FormLabel>
      <HStack spacing='2'>
        <Button display={formStep === 1 ? 'none' : 'block'} onClick={prevStep}>Prev</Button>
        <Button display={formStep === 5 ? 'none' : 'block'} onClick={nextStep}>Next</Button>
        <Button display={formStep === 5 ? 'block' : 'none'} type='submit' colorScheme='blue'>Submit</Button>
        <Button onClick={hideAddNewBirthDay} colorScheme='red'>Cancel</Button>
      </HStack>
    </VStack>
  )
}
