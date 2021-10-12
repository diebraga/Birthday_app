import Layout from '../components/Layout'
import { Button, Center, FormLabel, Heading, Input, useToast, VStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormEvent, useEffect, useState } from 'react'
import { useBirthdayInfoContext } from '../contexts/birthdayInfoContext'
import AddBirthdayForm from '../components/addBirthdayForm'
import BirthdayList from '../components/birthdayList'
import { BirthdayData } from '../interfaces/birthdays'
import UserBirthdayForm from '../components/UserBirthdayForm'
import UserBirthdayInfo from '../components/UserBirthdayInfo'
import moment from 'moment'

const IndexPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { setBirthdays, userBirthday, birthdays } = useBirthdayInfoContext()
  const [addNewBirthday, setAddNewBirthday] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [isEdittingUser, setIsEdittingUser] = useState(false)
  
  const toast = useToast()

  const getUserDateBirth = userBirthday.month + userBirthday.day + userBirthday.year

  const dieffBetweenNowAndYearOfBirth = moment().diff(moment(getUserDateBirth, 'MMDDYYYY'), 'years')

  const getFormatedDateNow = new Date(Date.now()).toLocaleDateString(
    'en-GB', {
      day: '2-digit',
      month: '2-digit',
      // year: 'numeric'
    }
  )

  const userFormatedDate = userBirthday.day + ' ' + userBirthday.month

  useEffect(() => {
    if (getFormatedDateNow.replace('/', ' ') ===  userFormatedDate) {
      alert(`Email sent to: ${userBirthday.email}, message: Congrats for you ${dieffBetweenNowAndYearOfBirth}th birthday!`)
    }
  }, [userBirthday])

  useEffect(() => {
    birthdays.map(item => {
      const getUserDateBirth = item.month + item.day + item.year

      const dieffBetweenNowAndYearOfBirth = moment().diff(moment(getUserDateBirth, 'MMDDYYYY'), 'years')   
      
      const userFormatedDate = item.day + ' ' + item.month

      if (getFormatedDateNow.replace('/', ' ') ===  userFormatedDate) {
        alert(`Email sent to: ${item.email}, message: Congrats for you ${dieffBetweenNowAndYearOfBirth}th birthday!`)
      }  
    })
  }, [birthdays])

  const handlePost: SubmitHandler<BirthdayData> = async (formData) => {
    const data = {
      ...formData,
      month: formData.month.toLocaleLowerCase(),
      id: Math.random().toString(36).substr(2, 9)
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

  const userIsNotFilled = userBirthday.id === undefined

  return (
    <Layout title="Home">
      <Heading>Happy Birthday app!</Heading>
      <Center>
        {!isEdittingUser && <UserBirthdayInfo setIsEdittingUser={setIsEdittingUser}/>}
        {isEdittingUser && <UserBirthdayForm setIsEdittingUser={setIsEdittingUser}/>}
        {addNewBirthday && <AddBirthdayForm handlePost={handlePost} formStep={formStep} setFormStep={setFormStep} register={register} handleSubmit={handleSubmit} hideAddNewBirthDay={hideAddNewBirthDay}/>}
        {!addNewBirthday && !userIsNotFilled && !isEdittingUser && (
          <>
          <BirthdayList/>
          <Button onClick={showAddNewBirthDay}>Would you like to add another person?</Button>
          </>
        )}
      </Center>
    </Layout>
  )
}

export default IndexPage
