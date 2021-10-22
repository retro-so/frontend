import { FC } from 'react'
import styled from '@emotion/styled'
import { Button } from '@yandex/ui/Button/desktop/bundle'

import { MoreIcon } from '../Icons/MoreIcon'
import { TrashIcon } from '../Icons/TrashIcon'
import { Dropdown } from '../Dropdown'
import { Menu, Item } from '../Menu'

interface DropdownMenuProps {
  onDeleteAction: () => void
}

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const { onDeleteAction } = props

  return (
    <Dropdown useLegacyRef>
      <MoreButton size="s" view="clear">
        <MoreIcon />
      </MoreButton>
      <Menu>
        <Item onClick={onDeleteAction} color="red">
          <TrashIcon />
          Delete
        </Item>
      </Menu>
    </Dropdown>
  )
}

const MoreButton = styled(Button)`
  /* FIXME: Apply without important. */
  position: absolute !important;
  right: 0;
  top: 8px;
`
