import { Redirect } from 'expo-router'

export default function Root() {
  const isLoggedIn = false  // TODO: read from auth store
  return <Redirect href={isLoggedIn ? '/(tabs)' : '/(auth)/login'} />
}
