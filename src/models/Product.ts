import { Schema, model, models, Types } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    images: [{ type: String }],
    pricePence: { type: Number, required: true },
    category: { type: Types.ObjectId, ref: "Category", required: false },
    inventory: { type: Number, default: 0 },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
