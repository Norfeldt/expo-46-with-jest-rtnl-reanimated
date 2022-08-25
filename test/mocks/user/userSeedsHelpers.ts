import users from './users'

export const userEmail = users.reduce((acc, user) => {
  acc[user.email] = user.email

  return acc
}, {} as Record<typeof users[number]['email'], string>)

export const userCredentials = users.reduce((acc, user) => {
  acc[user.email] = {
    email: user.email,
    password: user.email.includes('without_password') ? '' : 'password',
  }

  return acc
}, {} as Record<typeof users[number]['email'], { email: string; password: '' | 'password' }>)
