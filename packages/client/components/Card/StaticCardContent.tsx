import { FC } from 'react'
import styled from '@emotion/styled'
import { Text } from '@yandex/ui/Text/bundle'
import { Button } from '@yandex/ui/Button/desktop/bundle'

import { LikeOutlineIcon } from '../Icons/LikeOutlineIcon'
import { LikeFillIcon } from '../Icons/LikeFillIcon'

type CardType = any
type StaticCardContentProps = Pick<CardType, 'author' | 'content'> & {
  isLiked: boolean
  totalLikes: number
  onToggleLike: () => void
}

export const StaticCardContent: FC<StaticCardContentProps> = (props) => {
  const { content, author, totalLikes, isLiked, onToggleLike } = props

  return (
    <Container>
      <Text typography="body-long-m" className="Content">
        {content}
      </Text>
      <Footer>
        <Text typography="caption-l" color="link">
          {author.displayName}
        </Text>
        <Button view="clear" size="s" onClick={onToggleLike}>
          {isLiked ? <LikeFillIcon /> : <LikeOutlineIcon />}
          {totalLikes || ''}
        </Button>
      </Footer>
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

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
