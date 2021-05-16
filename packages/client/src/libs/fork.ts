import { ComponentType } from 'react'

export function fork<T>(component: ComponentType<T>, defaultProps: Partial<T>): ComponentType {
  // @ts-expect-error
  const forkedComponent = component.bind({})

  if (defaultProps) {
    forkedComponent.defaultProps = defaultProps
  }

  return forkedComponent
}
