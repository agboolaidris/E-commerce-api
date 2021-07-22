import { Request, Response } from "express";
import fs from "fs";

import { Product, productInput } from "../models/product";
import slug from "slug";

//create product controller
export const createProduct = async (req: Request, res: Response) => {
  try {
    req.body.files = req.files; //attached files to the body

    const { price, description, category, name, quantity, offer, files } =
      req.body;

    let images = [];

    //attached files pathname with the url
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

    const response = await product.save(); //save product

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//edit product controller
export const editProduct = async (req: Request, res: Response) => {
  try {
    req.body.files = req.files ? req.files : undefined; //checked if images exist then attached to request body

    const { price, description, category, name, quantity, offer, files } =
      req.body;

    let images = [];
    //if files exist,then attache files pathname with the url
    if (files) {
      images = files.map((file: any) => {
        return `${process.env.BASE_URL}${file.path.split("uploads")[1]}`;
      });
    }
    //find the product in the database
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
    //delete the previous images, if new images attache
    if (images.length > 0) {
      edit.images = images;

      data.images.map((image: string) => {
        fs.unlinkSync(
          `uploads/-${image.split("-")[image.split("-").length - 1]}`
        );
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

//fetch all products controller
export const fetchProducts = async (req: Request, res: Response) => {
  try {
    const response = await Product.find();

    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//fetch single product controller
export const fetchProduct = async (req: Request, res: Response) => {
  try {
    const response = await Product.findById(req.params.id);

    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//fetch product by category
export const fetchProductsByCategory = async (req: Request, res: Response) => {
  try {
    const response = await Product.find({ category: req.params.id });

    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    //find product by category
    const data: productInput | null = await Product.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "product not found" });

    //delete the images of the product
    data.images.map((image: string) => {
      fs.unlinkSync(
        `uploads/-${image.split("-")[image.split("-").length - 1]}`
      );
    });

    //delete product
    const response = await Product.findByIdAndDelete(req.params.id);

    if (!response) return res.status(404).json({ error: "product not found" });

    return res.json({ msg: "product deleted!!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
