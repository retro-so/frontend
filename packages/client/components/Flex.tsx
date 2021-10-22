import { ElementType, FC } from 'react'
import styled from '@emotion/styled'

type FlexProps = {
  direction?: string
  justifyContent?: string
  alignItems?: string
  gap?: string
  as?: ElementType
  height?: string
}

export const Flex: FC<FlexProps> = (props) => {
  const { children, gap, direction, justifyContent, alignItems, as, height } = props

  return (
    <Container
      as={as}
      gap={gap}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      height={height}
    >
      {children}
    </Container>
  )
}

const Container = styled.div<any>`
  display: flex;
  gap: ${(props) => props.gap};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => props.direction};
  height: ${(props) => props.height};
`
