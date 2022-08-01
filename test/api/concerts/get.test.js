const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET /api/concerts", () => {
  before(async () => {
    const testConcOne = new Concert({
      _id: "5d9f1140f10a81216cfd4408",
      performer: "John Doe",
      genre: "Rock",
      price: 25,
      day: 1,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });
    await testConcOne.save();

    const testConcTwo = new Concert({
      _id: "5d9f1159f81ce8d1ef2bee48",
      performer: "Maybell Haley",
      genre: "Pop",
      price: 40,
      day: 1,
      image: "/img/uploads/hdfh42sd213.jpg",
    });
    await testConcTwo.save();
  });

  it("/performer/:performer should return all concerts by :performer", async () => {
    const res = await request(server).get("/api/concerts/performer/John Doe");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/genre/:genre should return all concerts by :genre", async () => {
    const res = await request(server).get("/api/concerts/genre/Rock");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(1);
    expect(res.body).to.not.be.null;
  });

  it("/price/:price_min/:price_max should return all concerts in range of price_min - price_max", async () => {
    const res = await request(server).get("/api/concerts/price/25/40");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
    expect(res.body).to.not.be.null;
  });

  it("/day/:day should return all concerts by :day", async () => {
    const res = await request(server).get("/api/concerts/day/1");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
    expect(res.body).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
