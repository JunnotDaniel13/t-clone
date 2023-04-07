import { Input } from "postcss";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  info: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        bio: true,
        email: true,
        emailVerified: true,
        id: true,
        image: true,
        join_date: true,
        location: true,
        name: true,
        followers: true,
        following: true,
        username: true,
        website: true,
        tweets: true,
      },
    });
  }),
  userinfo: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
        include: {
          tweets: true,
          followers: true,
          following: true,
        },
        // select: {
        //   bio: true,
        //   email: true,
        //   emailVerified: true,
        //   id: true,
        //   image: true,
        //   join_date: true,
        //   location: true,
        //   name: true,
        //   followers: true,
        //   following: true,
        //   username: true,
        //   website: true,
        //   tweets: true,
        // },
      });
    }),
  update: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(({ ctx, input }) => {
      console.log(input.username);
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          username: input.username,
        },
      });
    }),
});
