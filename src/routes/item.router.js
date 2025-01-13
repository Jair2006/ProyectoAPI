import express from "express";
import { getItemById, getItemsBySearch, getItems, createItem, updateItem, deleteItem } from '../controllers/item.controller.js';

const itemRouter = express.Router();

itemRouter.get('/search', getItemsBySearch);
itemRouter.get('/:id', getItemById);

itemRouter.get('/', (req, res) => {
    getItems().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.error("Error on GET / route:", err);
        res.status(500).json({message: err});
    });
});

itemRouter.post('/', (req, res) => {
    createItem(req.body).then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        console.error("Error on POST / route:", err);
        res.status(500).json({message: err});
    });
});

itemRouter.put('/:id', (req, res) => {
    updateItem(req.params.id, req.body).then((data) => {
        if (data) {
            res.status(201).json({message: "Item updated.", data: data});
        } else {
            res.status(400).json({message: "Item not updated.", data: data});
        }
    }).catch((err) => {
        console.error("Error on PUT / route:", err);
        res.status(500).json({message: err});
    });
});

itemRouter.delete('/:id', deleteItem);

export default itemRouter;