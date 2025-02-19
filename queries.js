import { HttpError } from 'wasp/server'

export const searchMovies = async ({ title }, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Movie.findMany({
    where: {
      title: {
        contains: title,
        mode: 'insensitive'
      }
    },
    select: {
      title: true,
      year: true,
      poster: true,
      plot: true
    }
  });
}
