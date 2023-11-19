import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <Text color="red">
        {children}
    </Text>
  )
}

export default ErrorMessage