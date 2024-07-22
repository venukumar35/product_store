import { z } from "zod";
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const validate = z.object({
  price: z
    .string()
    .min(1, "Enter price")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  offerPercentage: z
    .string()
    .min(1, "Enter offer percentage")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  offerPrice: z
    .string()
    .min(1, "Enter offer price")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  quantity: z
    .string()
    .min(1, "Enter quantity")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  offerQuantity: z
    .string()
    .min(1, "Enter offer quantity")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Enter number",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  fromDate: z.date({ message: "Select fromDate" }),
  toDate: z.date({ message: "Select toDate" }),
  fromTime: z
    .string()
    .regex(timeRegex, { message: "Select a valid from time (HH:MM)" }),
  toTime: z
    .string()
    .regex(timeRegex, { message: "Select a valid to time (HH:MM)" }),

  offerPromotionPeriodId: z
    .string()
    .min(1, { message: "Select offer promotion type" }),
});

export const offerValidateSchema = (calculate: boolean) => {
  if (calculate) {
    return validate.pick({
      price: true,
      offerPercentage: true,
      quantity: true,
      offerQuantity: true,
    });
  } else {
    console.log("enetr");
    return validate;
  }
};
