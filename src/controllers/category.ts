import { Request, Response } from "express";
import slug from "slug";

import { Category, CategoryInput } from "../models/category";
import categoryFunc from "../helpers/category";
import { Product } from "../models/product";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;
    if (!name) return res.status(400).json({ name: "name is required" });

    if (name.length < 2)
      return res
        .status(400)
        .json({ name: "name most be greater than 2 character" });

    const checkname = await Category.findOne({ name });

    if (checkname) return res.status(400).json({ name: "name already exist" });

    const categoryObj: any = {
      name,
      slug: slug(req.body.name),
    };

    if (req.file) {
      categoryObj.image = `${process.env.API}${
        req.file.path.split("uploads")[1]
      }`;
    }

    if (req.body.parentId) {
      categoryObj.parentId = parentId;
    }

    const category = new Category(categoryObj);
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchCategory = async (req: Request, res: Response) => {
  try {
    const data = await Category.find();
    if (data.length < 1)
      return res.status(401).json({ error: "nothing found in database" });
    const response = await categoryFunc(data);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const checkProduct = await Product.find({ category: req.params.id });

    if (checkProduct.length > 0)
      return res.status(400).json({
        error: "can't delete a category that have product attached to it",
      });

    const checkSubCategory = await Category.find({ parentId: req.params.id });

    if (checkSubCategory.length > 0) {
      checkSubCategory.map(async (category: CategoryInput) => {
        category.parentId = undefined;
        await category.save();
      });
    }
    // return res.status(400).json({
    //   error: "can't delete a category that have subCategory attached to it",
    // });

    const data = await Category.findByIdAndDelete(req.params.id);
    if (!data)
      return res.status(404).json({ error: "no such a category in database" });

    res.json({ msg: "category deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editCategory = async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;

    if (!name) return res.status(400).json({ name: "name is required" });

    if (name.length < 2)
      return res
        .status(400)
        .json({ name: "name most be greater than 2 character" });

    const data = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        slug: slug(name),
        parentId: parentId ? parentId : undefined,
      },
      { new: true }
    );
    if (!data)
      return res
        .status(401)
        .json({ error: "category doesn't exist in database" });

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
