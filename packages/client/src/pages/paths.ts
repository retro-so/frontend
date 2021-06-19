export const paths = {
  board: (link = ':link') => `/${link}`,
  boards: () => '/boards',
  login: () => '/login',
}

export type BoardRouteParams = { link: string }
