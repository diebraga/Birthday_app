import Layout from '../components/Layout'
import { Button, Center, FormLabel, Heading, Input, useToast, VStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormEvent, useEffect, useState } from 'react'
import { useBirthdayInfoContext } from '../contexts/birthdayInfoContext'
import AddBirthdayForm from '../components/addBirthdayForm'
import BirthdayList from '../components/birthdayList'
import { BirthdayData } from '../interfaces/birthdays'

const IndexPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { setBirthdays } = useBirthdayInfoContext()
  const [addNewBirthday, setAddNewBirthday] = useState(false)
  const [formStep, setFormStep] = useState(1)

  const toast = useToast()

  const handlePost: SubmitHandler<BirthdayData> = async (formData) => {
    const data = {
      ...formData,
      month: formData.month.toLocaleLowerCase(),
      id: Math.random().toString(36).substr(2, 9)
    }
    if (formData.name === '' || formData.month === '' || formData.day === '' || formData.year === '') {
      toast({
        title: "Error.",
        description: "One or more fields are inconplete!.",
        status: "error",
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      setFormStep(1)
    } else {
      setBirthdays(curr => [...curr, data])
      setAddNewBirthday(false)
      setFormStep(1)
      reset()
    }
  }

  function showAddNewBirthDay() {
    setAddNewBirthday(true)
  }

  function hideAddNewBirthDay() {
    setAddNewBirthday(false)
  }

  return (
    <Layout title="Home">
      <Heading>Happy Birthday app!</Heading>
      <Center>
        {addNewBirthday && <AddBirthdayForm handlePost={handlePost} formStep={formStep} setFormStep={setFormStep} register={register} handleSubmit={handleSubmit} hideAddNewBirthDay={hideAddNewBirthDay}/>}
        {!addNewBirthday && (
          <>
          <BirthdayList/>
          <Button onClick={showAddNewBirthDay}>Add new birthday</Button>
          </>
        )}
      </Center>
    </Layout>
  )
}

export default IndexPage
