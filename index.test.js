const request = require("supertest");
const app = require("./src/app");
const Restaurant = require("./models");
const syncSeed = require("./seed")
let restQuantity


beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll();
    restQuantity = restaurants.length;
})

describe("/restaurant endpoint GET tests", () => {
    
    it("should return 200", async () => {
        const response = await request(app).get('/restaurants');
        expect(response.statusCode).toBe(200);
    })

    it("should return an array of restaurants", async () => {
        const response = await request(app).get('/restaurants');
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty("cuisine");
    })

    it("should return the correct number of restaurants", async () => {
        const response = await request(app).get('/restaurants');
        expect(response.body.length).toEqual(restQuantity);  
    })

    it("should return the correct restaurant data", async () => {
        const response = await request(app).get('/restaurants');
        expect(response.body[0].name).toBe("AppleBees");
        
    })
})

describe("/restaurant/:id endpoint GET tests", () => {
    it("should return the correct restaurant", async () => {
        const response = await request(app).get('/restaurants/1')
        expect(response.body.name).toBe("AppleBees");
    })
} )

describe("POST tests", () => {
    it("should have status 200", async () => {
        const response = await request(app)
            .post("/restaurants")
            .send({name: "qwe", location: "asd", cuisine: "zxc"});
        // console.log(response.body)
        expect(response.statusCode).toBe(200);
    })
})

describe('PUT test', () => {
    it('should update a restaurant by id', async () => {
        const response = await request(app)
        .put('/restaurants/2')
        .send({name: "Benihana"})
        .expect(200)
        expect(response.body.name).toBe("Benihana")
    })
})


describe('DELETE test', () => {
    it('should delete a restaurant by id', async () => {
        const restaurant = await Restaurant.findByPk(2)
        const response = await request(app)
        .delete('/restaurants/2')
        .expect(200)
    })
})