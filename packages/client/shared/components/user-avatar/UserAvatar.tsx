import { component, css } from '@steely/react'

interface UserAvatarProps {
  size: 's' | 'm'
  src: string
}

// FIXME: Fix generic type for component.
export const UserAvatar = component<UserAvatarProps>('img', {
  styles: css`
    border-radius: 50%;
    height: var(--avatar-size);
    width: var(--avatar-size);
  `,
  variants: {
    size: {
      s: css`
        --avatar-size: 30px;
      `,
      m: css`
        --avatar-size: 40px;
      `,
    },
  },
})
