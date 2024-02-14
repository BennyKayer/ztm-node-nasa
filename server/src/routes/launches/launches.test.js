const request = require("supertest")
const app = require("../../app")
const { mongoConnect, mongoDisconnect } = require("../../utils/mongo")

describe("Launches tests", () => {
    beforeAll(async () => {
        await mongoConnect()
    })
    afterAll(async () => {
        await mongoDisconnect()
    })

    describe("Test GET /launches", () => {
        it("should respond with 200 success", async () => {
            const response = await request(app).get("/launches");
            expect(response.statusCode).toBe(200);
        })
    })
    
    describe("Test POST /launch", () => {
        const completeLaunchData = {
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            destination: "Kepler-62 f",
            launchDate: "04.01.2028"
        }
    
        it("should respond with 201 created", async () => {
        
            const response = await request(app)
                .post("/launches")
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201)
    
            // const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            // const responseDate = new Date(response.body.launchDate).valueOf();
            // expect(requestDate).toBe(responseDate)
    
            // const {launchDate, ...rest} = completeLaunchData
            // const launchNoDate = rest
            // expect(response.body).toMatchObject(launchNoDate)
        })
    
        it("should catch missing required properties", async () => {
            const { launchDate, mission, destination, rocket} = completeLaunchData;
    
            // No mission
            await request(app)
                .post("/launches")
                .send({
                    launchDate,
                    destination,
                    rocket
                })
                .expect("Content-Type", /json/)
                .expect(400)
            
            // No destination
            await request(app)
                .post("/launches")
                .send({
                    launchDate,
                    rocket,
                    mission,
                })
                .expect("Content-Type", /json/)
                .expect(400)
    
            // No rocket
            await request(app)
                .post("/launches")
                .send({
                    launchDate,
                    mission,
                    destination
                })
                .expect("Content-Type", /json/)
                .expect(400)
    
            // No launch date
            await request(app)
                .post("/launches")
                .send({
                    rocket,
                    mission,
                    destination
                })
                .expect("Content-Type", /json/)
                .expect(400)
        })
    
        it("should catch invalid dates", async () => {
            const { launchDate, ...rest} = completeLaunchData;
    
            const resNoLaunchDate = await request(app)
                .post("/launches")
                .send({
                    ...rest,
                    launchDate: "Wrong date"
                })
                .expect("Content-Type", /json/)
                .expect(400)
        })
    })
})
