import { log } from "console";
import FoodModel from "../models/food.Model.js";
import fs from "fs";
import { mongo } from "mongoose";

//add fode item

const addFood = async (req, res) => {
  let image_fileName = `${req.file.filename}`;
  const food = new FoodModel({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: image_fileName,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Food not added" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "cannot get food" });
  }
};

const removeFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findById(id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await FoodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "food item deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "delete failed" });
  }
};

export { addFood, listFood, removeFoodItem };
