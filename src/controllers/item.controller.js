import Item from "../models/item.model.js";
import { Op } from "sequelize";
let id = 0;

export const getItems = async () => {
  let data = await Item.findAll();
  return data;
};

export const getItemById = async (id) => {
  let data = await Item.findByPk(id);
  return data;
};

export const getItemsBySearch = async (filters) => {
  let whereFilters = {};

  if (filters.name) {
    Object.assign(whereFilters, {
      name: {
        [Op.iLike]: `%${filters.name}%`,
      },
    });
  }
  if (filters.category) {
    Object.assign(whereFilters, { category: filters.category });
  }
  if (filters.maxPrice || filters.minPrice) {
    Object.assign(whereFilters, {
      price: {
        [Op.lte]: filters.maxPrice ?? 9999999,
        [Op.gte]: filters.minPrice ?? 0,
      },
    });
  }

  let data = await Item.findAll({
    where: {
      [Op.and]: whereFilters,
    },
  });
  return data;
};

export const createItem = async (body) => {
  let data = await Item.create(body);
  return data;
};

export const updateItem = async (id, body) => {
  let data = await Item.update(body, {
    where: {
      id: id,
    },
  });
  // let item = await Item.findByPk(id);
  // let data = await item.update("name", body.name);
  return data[0];
};

export const deleteItem = async (id) => {
  let data = await Item.destroy({
    where: {
      id: id,
    },
  });
  return data;
};
