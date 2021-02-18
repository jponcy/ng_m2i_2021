const api = 'http://dev.company.com/:8080';

export const environment = {
  api: {
    urls: {
      games: `${api}/games`,
      categories: `${api}/games/categories`
    }
  },
  production: true
};
