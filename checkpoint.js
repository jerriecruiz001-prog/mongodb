// ============================================================
// MongoDB Checkpoint — CRUD Operations on "contact" database
// Run with: mongosh checkpoint.js
// ============================================================

// 1. Switch to (or create) the "contact" database
use("contact");

// ============================================================
// SETUP — Create collection and insert documents
// ============================================================

// Drop existing collection to start fresh (idempotent runs)
db.contactlist.drop();

// Insert all 5 contacts into "contactlist"
const result = db.contactlist.insertMany([
  { lastName: "Ben",    firstName: "Moris",      email: "ben@gmail.com",      age: 26 },
  { lastName: "Kefi",   firstName: "Seif",       email: "kefi@gmail.com",     age: 15 },
  { lastName: "Emilie", firstName: "brouge",     email: "emilie.b@gmail.com", age: 40 },
  { lastName: "Alex",   firstName: "brown",                                    age: 4  },
  { lastName: "Denzel", firstName: "Washington",                               age: 3  },
]);

print("\n✅ Inserted", result.insertedIds ? Object.keys(result.insertedIds).length : 5, "documents");

// ============================================================
// QUERY 1 — Display ALL contacts
// ============================================================
print("\n─── 1. All contacts ───────────────────────────────────");
db.contactlist.find().forEach(doc => printjson(doc));

// ============================================================
// QUERY 2 — Display ONE contact by ID (using first inserted ID)
// ============================================================
print("\n─── 2. One contact by ID ──────────────────────────────");
const firstId = result.insertedIds[0];
const oneContact = db.contactlist.findOne({ _id: firstId });
printjson(oneContact);

// ============================================================
// QUERY 3 — Display contacts with age > 18
// ============================================================
print("\n─── 3. Contacts with age > 18 ─────────────────────────");
db.contactlist.find({ age: { $gt: 18 } }).forEach(doc => printjson(doc));

// ============================================================
// QUERY 4 — Contacts with age > 18 AND name containing "ah"
// ============================================================
print("\n─── 4. Age > 18 AND name containing 'ah' ──────────────");
db.contactlist.find({
  age: { $gt: 18 },
  $or: [
    { firstName: { $regex: "ah", $options: "i" } },
    { lastName:  { $regex: "ah", $options: "i" } },
  ]
}).forEach(doc => printjson(doc));

// ============================================================
// UPDATE — Change Kefi Seif's firstName to "Anis"
// ============================================================
print("\n─── 5. Update: Kefi Seif → Kefi Anis ─────────────────");
const updateResult = db.contactlist.updateOne(
  { lastName: "Kefi", firstName: "Seif" },
  { $set: { firstName: "Anis" } }
);
print("Matched:", updateResult.matchedCount, "| Modified:", updateResult.modifiedCount);
printjson(db.contactlist.findOne({ lastName: "Kefi" }));

// ============================================================
// DELETE — Remove contacts aged under 5
// ============================================================
print("\n─── 6. Delete contacts with age < 5 ───────────────────");
const deleteResult = db.contactlist.deleteMany({ age: { $lt: 5 } });
print("Deleted:", deleteResult.deletedCount, "document(s)");

// ============================================================
// QUERY 7 — Display ALL contacts after update & delete
// ============================================================
print("\n─── 7. All contacts after update & delete ─────────────");
db.contactlist.find().forEach(doc => printjson(doc));

print("\n✅ Checkpoint complete!\n");
