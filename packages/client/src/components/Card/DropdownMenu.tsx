import { FC } from 'react'
import styled from '@emotion/styled'
import { Button } from '@yandex/ui/Button/desktop/bundle'

import { MoreIcon } from '../Icons/MoreIcon'
import { EditIcon } from '../Icons/EditIcon'
import { FireIcon } from '../Icons/FireIcon'
import { TrashIcon } from '../Icons/TrashIcon'
import { Dropdown } from '../Dropdown'
import { Menu, Item } from '../Menu'

interface DropdownMenuProps {
  solved: boolean
  onSolveAction: () => void
  onEditAction: () => void
  onDeleteAction: () => void
}

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
  const { solved, onSolveAction, onEditAction, onDeleteAction } = props

  return (
    <Dropdown useLegacyRef>
      <MoreButton size="s" view="clear">
        <MoreIcon />
      </MoreButton>
      <Menu>
        <Item onClick={onSolveAction}>
          <FireIcon />
          {solved ? 'Unsolve' : 'Solve'}
        </Item>
        <Item onClick={onEditAction}>
          <EditIcon />
          Edit
        </Item>
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
