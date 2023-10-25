import { Cookies } from "react-cookie"

const cookies = new Cookies()




export const getAccessToken = () => {
    return cookies.get('accessJwtToken')
}
export const setAccessToken = (value) => {
    return cookies.set('accessJwtToken', value)
}
export const removeAccessToken = () => {
    cookies.remove('accessJwtToken')
}

export const getRefreshToken = () => {
    return cookies.get('refreshJwtToken')
}
export const setRefreshToken = (value) => {
    return cookies.set('refreshJwtToken', value)
}
export const removeRefreshToken = () => {
    cookies.remove('refreshJwtToken')
}