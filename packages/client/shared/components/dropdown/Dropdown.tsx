import {
  FC,
  Children,
  cloneElement,
  isValidElement,
  useState,
  useRef,
  useEffect,
  RefObject,
} from 'react'
import { Popup } from '@yandex/ui/Popup/desktop/bundle'

interface DropdownProps {
  useLegacyRef?: boolean
  onChangeVisible?: (isVisible: boolean) => void
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const { children, useLegacyRef, onChangeVisible } = props

  const [isVisible, setVisible] = useState(false)
  const triggerRef = useRef<HTMLElement>(null)
  const [scopeRef, setScopeRef] = useState<RefObject<HTMLElement>>({ current: null })

  let [trigger, menu] = Children.toArray(children)

  useEffect(() => {
    setScopeRef({ current: document.querySelector('.Theme') })
  }, [])

  useEffect(() => {
    const onDocumentClick = () => {
      setVisible(false)
      onChangeVisible?.(false)
    }

    document.addEventListener('click', onDocumentClick, true)

    return () => {
      document.removeEventListener('click', onDocumentClick, true)
    }
  }, [])

  const onClick = () => {
    setVisible(!isVisible)
    onChangeVisible?.(!isVisible)
  }

  const onClose = () => {
    setVisible(false)
    onChangeVisible?.(false)
  }

  if (isValidElement(trigger)) {
    const ref = useLegacyRef ? 'innerRef' : 'ref'
    trigger = cloneElement(trigger, { onClick, [ref]: triggerRef })
  }

  return (
    <>
      {trigger}
      <Popup
        target="anchor"
        view="default"
        direction="bottom"
        scope={scopeRef}
        visible={isVisible}
        anchor={triggerRef}
        onClose={onClose}
      >
        {menu}
      </Popup>
    </>
  )
}
