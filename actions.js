import { HttpError } from 'wasp/server'

export const saveSearch = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newSearch = await context.entities.Search.create({
    data: {
      query: args.query,
      user: { connect: { id: context.user.id } }
    }
  });

  return newSearch;
}
