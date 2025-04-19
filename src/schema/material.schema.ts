import { object, number, type TypeOf } from "zod";

const params = object({
  id: number({
    required_error: "ID is required",
    invalid_type_error: "ID must be a number"
  })
});

const getMaterialByIdSchema = object({ params });

type GetMaterialByIdInput = TypeOf<typeof getMaterialByIdSchema>;

export { getMaterialByIdSchema, type GetMaterialByIdInput };
