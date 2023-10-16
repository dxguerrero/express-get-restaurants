const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const allRestaurants = await Restaurant.findAll();
    res.send(allRestaurants);
})

app.get("/restaurants/:id", async(req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    res.json(restaurant);
})

app.post("/restaurants", async (req, res) => {
    const createdRestaurant = await Restaurant.create(req.body);
    res.json(createdRestaurant);
})

app.put("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const updatedRestaurant = await restaurant.update(req.body);
    res.json(updatedRestaurant);
})

app.delete("/restaurants/:id", async (req, res) => {
    const deleted = await Restaurant.destroy({
        where: {id: req.params.id}
    });
    res.sendStatus(200);
})


module.exports = app;