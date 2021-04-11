import { FC } from 'react'
import { Spin } from '@yandex/ui/Spin/bundle'

import { Flex } from './Flex'

export const PageLoading: FC = () => (
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Spin progress view="default" size="l" />
  </Flex>
)
