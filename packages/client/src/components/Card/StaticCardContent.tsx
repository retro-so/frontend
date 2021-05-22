import { FC } from 'react'
import styled from '@emotion/styled'
import { Text } from '@yandex/ui/Text/bundle'

import { Card as CardType } from '../../api/graphql'

type StaticCardContentProps = Pick<CardType, 'author' | 'content'>

export const StaticCardContent: FC<StaticCardContentProps> = (props) => {
  const { content, author } = props

  return (
    <Container>
      <Text typography="body-long-m" className="Content">
        {content}
      </Text>
      <Text typography="caption-l" color="link">
        {author.displayName}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .Content {
    margin-bottom: 8px;
    white-space: pre;
  }
`
