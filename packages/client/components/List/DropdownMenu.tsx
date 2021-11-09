import { FC } from 'react'
import styled from '@emotion/styled'
import { Button } from '@yandex/ui/Button/desktop/bundle'

import { More, Trash } from '../../shared/icons'
import { Dropdown, Menu, Item } from '../../shared/components'

interface DropdownMenuProps {
  onDeleteAction: () => void
}

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const { onDeleteAction } = props

  return (
    <Dropdown useLegacyRef>
      <MoreButton size="s" view="clear">
        <More />
      </MoreButton>
      <Menu>
        <Item onClick={onDeleteAction} color="red">
          <Trash />
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
