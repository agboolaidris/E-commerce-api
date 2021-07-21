import { Request, Response } from "express";
import fs from "fs";

import { Product, productInput } from "../models/product";
import slug from "slug";

export const createProduct = async (req: Request, res: Response) => {
  try {
    req.body.files = req.files;

    const { price, description, category, name, quantity, offer, files } =
      req.body;

    let images = [];

    images = files.map((file: any) => {
      return `${process.env.BASE_URL}${file.path.split("uploads")[1]}`;
    });

    const product = new Product({
      name,
      slug: slug(name),
      price,
      createdBy: res.locals.user._id,
      description,
      images,
      quantity,
      category,
      offer: offer ? offer : undefined,
    });

    const response = await product.save();

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    req.body.files = req.files ? req.files : undefined;

    const { price, description, category, name, quantity, offer, files } =
      req.body;

    let images = [];
    if (files) {
      images = files.map((file: any) => {
        return `${process.env.BASE_URL}${file.path.split("uploads")[1]}`;
      });
    }

    const data: productInput | null = await Product.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "product not found" });

    const edit: any = {
      name,
      slug: slug(name),
      price,
      createdBy: res.locals.user._id,
      description,
      quantity,
      category,
      offer: offer ? offer : null,
    };

    if (images.length > 0) {
      edit.images = images;
      data.images.map((image: string) => {
        fs.unlinkSync(`uploads/-${image.split("-")[1]}`);
      });
    }

    const response = await Product.findByIdAndUpdate(req.params.id, edit, {
      new: true,
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchProducts = async (req: Request, res: Response) => {
  try {
    const response = await Product.find();

    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchProduct = async (req: Request, res: Response) => {
  try {
    const response = await Product.findById(req.params.id);

    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchProductsByCategory = async (req: Request, res: Response) => {
  try {
    const response = await Product.find({ category: req.params.id });

    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const data: productInput | null = await Product.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "product not found" });

    data.images.map((image: string) => {
      fs.unlinkSync(
        `uploads/-${image.split("-")[image.split("-").length - 1]}`
      );
    });

    const response = await Product.findByIdAndDelete(req.params.id);

    if (!response) return res.status(404).json({ error: "product not found" });

    return res.json({ msg: "product deleted!!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
