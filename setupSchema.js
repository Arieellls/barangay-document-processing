const { XataClient } = require("@xata.io/client");

const xata = new XataClient();

async function setupSchema() {
  await xata.schema.createTable("customers", [
    { name: "id", type: "integer", primaryKey: true },
    { name: "name", type: "varchar", length: 255, unique: true },
    { name: "credit_card", type: "text", nullable: true }
  ]);

  await xata.schema.createTable("bills", [
    { name: "id", type: "integer", primaryKey: true },
    { name: "date", type: "timestamp" },
    { name: "quantity", type: "integer" }
  ]);
}

setupSchema()
  .then(() => {
    console.log("Schema setup complete");
  })
  .catch((err) => {
    console.error("Error setting up schema:", err);
  });
