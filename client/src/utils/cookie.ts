import Cookies from 'js-cookie'

export const setSessionCookie = (token: string) => {
	removeSessionCookie()
	Cookies.set('sessionToken', token)
}

export const getSessionCookie = () => {
	return Cookies.get('sessionToken')
}

export const removeSessionCookie = () => {
	Cookies.remove('sessionToken')
}
