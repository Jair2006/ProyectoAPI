import User from "../models/user.model.js";
import { Op } from "sequelize";

export const createUser = async (body) => {
  let data = await User.create(body);
  return data;
};

export const getUsers = async () => {
  let data = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  return data;
};

export const getUserById = async (id) => {
  let data = await User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
  return data;
};

export const getUserBySearch = async (filters) => {
  let whereFilters = {};

  if (filters.name) {
    Object.assign(whereFilters, {
      name: {
        [Op.iLike]: `%${filters.name}%`,
      },
    });
  }
  if (filters.lastname) {
    Object.assign(whereFilters, {
      lastname: {
        [Op.iLike]: `%${filters.lastname}%`,
      },
    });
  }
  if (filters.email) {
    Object.assign(whereFilters, {
      email: {
        [Op.iLike]: `%${filters.email}%`,
      },
    });
  }
  if (filters.birthdate) {
    Object.assign(whereFilters, {
      birthdate: {
        [Op.eq]: filters.birthdate,
      },
    });
  }
  let data = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    where: {
      [Op.and]: whereFilters,
    },
  });
  return data;
};

export const updateUser = async (id, body) => {
  let payload = {
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    birthdate: body.birthdate,
  };
  let data = await User.update(payload, {
    where: {
      id: id,
    },
  });
  return data[0];
};

export const patchUser = async (id, body) => {
  let fields = ["name", "lastname", "email", "birthdate"];
  let payload = {};

  fields.forEach((field) => {
    if (field in body) {
      payload[field] = body[field];
    }
  });

  let data = await User.update(payload, {
    where: {
      id: id,
    },
  });
  return data[0];
};

export const deleteUser = async (id) => {
  let data = await User.destroy({
    where: {
      id: id,
    },
  });
  return data;
};
