import { cacheUser } from './auth-utils'
import consume from './consume'

jest.mock('./consume')

describe('verified email', () => {
  test('when a logged in user has no verified email, navigate should be called', () => {
    const useAuth0 = () => ({
      isAuthenticated: true,
      getAccessTokenSilently: () => Promise.resolve('token'),
      user: { email_verified: false }
    })

    const navigate = jest.fn()
    consume.mockImplementation(() => Promise.resolve({ body: { id: 1 } }))

    return cacheUser(useAuth0, navigate)
      .then(() => {
        expect(navigate).toHaveBeenCalledWith('/verification')
        return null
      })
  })

  test('when a logged in user has a verified email, navigate not should be called', () => {
    const useAuth0 = () => ({
      isAuthenticated: true,
      getAccessTokenSilently: () => Promise.resolve('token'),
      user: { email_verified: true }
    })

    const navigate = jest.fn()
    consume.mockImplementation(() => Promise.resolve({ body: { id: 1 } }))

    return cacheUser(useAuth0, navigate)
      .then(() => {
        expect(navigate).toHaveBeenCalledTimes(0)
        return null
      })
  })
})

describe('user registration', () => {
  test('if user is not registered navigate to profile', () => {
    const useAuth0 = () => ({
      isAuthenticated: true,
      getAccessTokenSilently: () => Promise.resolve('token'),
      user: { id: undefined }
    })

    const navigate = jest.fn()
    consume.mockImplementation(() => Promise.resolve({ body: { id: undefined } }))

    return cacheUser(useAuth0, navigate)
      .then(() => {
        expect(navigate).toHaveBeenCalledWith('/profile')
        return null
      })
  })

  test('if user is registered,navigate is not called', () => {
    const useAuth0 = () => ({
      isAuthenticated: true,
      getAccessTokenSilently: () => Promise.resolve('token'),
      user: { id: 1 }
    })

    const navigate = jest.fn()
    console.log(useAuth0)
    consume.mockImplementation(() => Promise.resolve({ body: { id: 1 } }))

    return cacheUser(useAuth0, navigate)
      .then(() => {
        expect(navigate).toHaveBeenCalledTimes(0)
        return null
      })
  })
})
