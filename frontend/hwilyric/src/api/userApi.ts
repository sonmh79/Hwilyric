import { ILoginTypes } from '../types/userType'
import { axios, fileAxios } from './https'

export async function checkEmail(email:string) {
  try{
    const res = await axios.get(`api/auth/guests/email/${email}`)
    const message = res.data.message
    return message
  } catch(err) {
    return err
  }
}

export async function checkNickname(nickname:string) {
  try{
    const res = await axios.get(`api/auth/guests/nickname/${nickname}`)
    const message = res.data.message
    return message
  } catch(err) {
    return err
  }
}

export async function verifyEmail(email:string) {
  try{
    const res = await axios.get(`api/auth/guests/check/${email}`)
    const code = res.data.code
    return code
  } catch(err) {
    return err
  }
}

export async function signup(formData:FormData) {
  try{
    const res = await fileAxios.post('api/auth/guests', formData)
    const message = res.data.message
    return message
  } catch(err) {
    return err
  }
}

export async function loginKakao(code: string) {
  try{
    const res = await axios.get(`api/auth/guests/kakao/${code}`);
    const data = res.data
    return data
  } catch(err) {
    return null
  }
  
}

export async function login(body: ILoginTypes) {
  try{
    const res = await axios.post('api/auth/guests/login', body)
    const data = res.data
    return data
  } catch(err) {
    return null
  }
}

export async function resetPassword(email: object) {
  try{
    const res = await axios.patch('api/auth/guests/password', email)
    const message = res.data.message
    return message
  } catch(err) {
    return err
  }
}

export async function checkPassword(password: object) {
  try{
    const res = await axios.post('api/auth/users/password', password)
    const message = res.data.message
    return message
  } catch(err) {
    return err
  }
}

export async function modifyPassword(password: object) {
  try{
    const res = await axios.patch('api/auth/users/password', password)
    const message = res.data.message
    return message
  } catch(err) {
    return err
  }
}

export async function modifyProfile(formData: FormData) {
  try{
    const res = await fileAxios.patch('api/auth/users/profile', formData)
    const data = res.data
    return data
  } catch(err) {
    return null
  }
}

export async function reissueToken() {
  try{
    const res = await axios.get('api/auth/users/access-token')
    const accessToken = res.data.accessToken 
    return accessToken
  } catch(err) {
    return null
  }
}

export async function logout() {
  try{
    const res = await axios.get('api/auth/users/logout')
    const message = res.data.message
    return message
  } catch(err) {
    return null
  }
}