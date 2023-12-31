const mongodb = require("mongodb");
const db = require("../data/databse");

class Order {
  constructor(cart, userData, status, date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }
  static transformOrderDocument(orderDoc) {
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }
  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformOrderDocument);
  }
  static async findAll() {
    const orders = await db.getDb().collection("orders").find().toArray();
    return this.transformOrderDocuments(orders);
  }

  static async findAllForUser(userId) {
    const uid = await new mongodb.ObjectId(userId);
    const orders = await db
      .getDb()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();
    return this.transformOrderDocuments(orders);
  }

  static async findById(orderId) {
    const order = await db
      .getDb()
      .collection("orders")
      .findOne({ _id: new mongodb.ObjectId(orderId) });
    console.log("id fetched successfuly");
    return this.transformOrderDocument(order);
  }

  save() {
    if (this.id) {
      const orderId = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("orders")
        .updateOne({ _id: orderId }, { $set: { status: this.status } })
        .then((result) => {
          console.log("Update result:", result);
        })
        .catch((error) => {
          console.error("Update error:", error);
        });
    } else {
      const orderDocument = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(),
        status: "pending",
      };
      return db.getDb().collection("orders").insertOne(orderDocument);
    }
  }
}

module.exports = Order;
