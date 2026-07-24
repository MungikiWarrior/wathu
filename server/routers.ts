import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createSubmission, getSubmissionsByUserId, deleteSubmission } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  submissions: router({
    create: protectedProcedure
      .input(
        z.object({
          fullName: z.string().min(1, "Full name is required"),
          location: z.string().min(1, "Location is required"),
          description: z.string().min(10, "Description must be at least 10 characters"),
          serviceType: z.string().min(1, "Service type is required"),
          customServiceType: z.string().optional(),
          fileUrls: z.string().min(1, "At least one file is required"),
          fileNames: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const submission = await createSubmission({
          userId: ctx.user.id,
          fullName: input.fullName,
          location: input.location,
          description: input.description,
          serviceType: input.serviceType,
          customServiceType: input.customServiceType,
          fileUrls: input.fileUrls,
          fileNames: input.fileNames,
        });
        return submission;
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      const submissions = await getSubmissionsByUserId(ctx.user.id);
      return submissions.map(sub => ({
        ...sub,
        fileUrls: JSON.parse(sub.fileUrls),
        fileNames: sub.fileNames ? JSON.parse(sub.fileNames) : [],
      }));
    }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const success = await deleteSubmission(input.id, ctx.user.id);
        return { success };
      }),
  }),
});

export type AppRouter = typeof appRouter;
