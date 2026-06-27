import { z } from "zod";
import { VIN_LENGTH } from "../constants/global.constants";

export const vinSchema = z.object({
  vin: z.string().trim().min(1, "VIN code is required").max(VIN_LENGTH, `VIN must be at most ${VIN_LENGTH} characters`),
});

export type VinFormValues = z.infer<typeof vinSchema>;
