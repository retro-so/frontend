import { FC, useRef, ComponentProps, MouseEventHandler, forwardRef } from 'react'
import { css, component } from '@steely/react'
import { useButton, useHover, mergeProps, useForkRef } from 'web-platform-alpha'

interface ButtonProps extends ComponentProps<typeof Container> {
  disabled?: boolean
  // TODO: Fix type issue for steely case.
  as?: any

  onClick?: MouseEventHandler

  wide?: boolean
  addonBefore?: any
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, innerRef) => {
  const { children, shape, size, kind, wide, addonBefore, ...otherProps } = props
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { buttonProps, isPressed } = useButton(otherProps, buttonRef)
  const { hoverProps, isHovered } = useHover(otherProps)
  const ref = useForkRef(buttonRef, innerRef)

  return (
    <Container
      {...mergeProps(buttonProps, hoverProps)}
      ref={ref}
      data-hovered={isHovered || undefined}
      data-pressed={isPressed || undefined}
      data-wide={wide}
      shape={shape}
      size={size}
      kind={kind}
    >
      {addonBefore}
      {children}
    </Container>
  )
})

const Container = component('button', {
  styles: css`
    border: 0;
    cursor: pointer;
    background: 0;
    padding: 0;
    outline: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;

    gap: var(--button-content-gap);

    min-height: var(--button-height);
    min-width: var(--button-height);

    &[data-wide='true'] {
      width: 100%;
    }

    color: var(--button-text);
    background-color: var(--button-fill);
    padding: 0 var(--button-vert-padding);
    border-radius: var(--button-border-radius);

    &[data-hovered='true'] {
      --button-text: var(--button-text-hovered);
      --button-fill: var(--button-fill-hovered);
    }

    &[data-pressed='true'] {
      --button-text: var(--button-text-pressed);
      --button-fill: var(--button-fill-pressed);
    }
  `,
  variants: {
    size: {
      xs: css`
        --button-height: 24px;
        --button-vert-padding: 0;
        --button-border-radius: 0;
        --button-content-gap: 0;
      `,
      s: css`
        --button-height: 32px;
        --button-vert-padding: 12px;
        --button-border-radius: 8px;
        --button-content-gap: 0;
      `,
      l: css`
        --button-height: 40px;
        --button-vert-padding: 0;
        --button-border-radius: 0;
        --button-content-gap: 12px;
      `,
    },
    kind: {
      default: css`
        --button-text: #85889e;
        --button-text-hovered: #777a8f;
        --button-text-pressed: #696b80;
      `,
      action: css`
        --button-text: #f7f8fa;
        /* TODO: Remove this tokens. */
        --button-text-hovered: #f7f8fa;
        --button-text-pressed: #f7f8fa;
        --button-fill: #272733;
        --button-fill-hovered: #333342;
        --button-fill-pressed: #404152;
      `,
    },
    shape: {
      text: css``,
      fill: css``,
    },
  },
})
