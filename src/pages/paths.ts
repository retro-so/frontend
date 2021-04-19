export const paths = {
  board: (id = ':id') => `/${id}`,
  boards: () => '/boards',
  login: () => '/login',
}

export type BoardRouteParams = { id: string }
