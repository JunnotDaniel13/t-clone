import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  getAllTweet: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tweet.findMany({
      orderBy: [{ tweet_date: "desc" }],
      include: {
        likes: { select: { like_id: true, userId: true, user: true } },
        user: {
          select: {
            emailVerified: true,
            image: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }),
  getTweetsByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.tweet.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: [{ tweet_date: "desc" }],
        include: {
          likes: { select: { like_id: true, userId: true, user: true } },
          user: {
            select: {
              emailVerified: true,
              image: true,
              name: true,
              username: true,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(z.object({ tweet_text: z.string().max(500), userId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tweet.create({
        data: {
          tweet_text: input.tweet_text,
          userId: input.userId,
        },
      });
    }),
  like: publicProcedure
    .input(z.object({ userId: z.string(), tweet_id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.like.create({
        data: {
          userId: input.userId,
          tweet_id: input.tweet_id,
        },
      });
    }),
});
