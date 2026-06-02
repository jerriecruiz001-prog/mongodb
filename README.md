# MongoDB CRUD Checkpoint

A hands-on exercise demonstrating core MongoDB CRUD operations using the `mongosh` shell.

## Database Structure

| Database | Collection |
|----------|------------|
| `contact` | `contactlist` |

### Sample Documents

| Last Name | First Name | Email | Age |
|-----------|------------|-------|-----|
| Ben | Moris | ben@gmail.com | 26 |
| Kefi | Seif | kefi@gmail.com | 15 |
| Emilie | brouge | emilie.b@gmail.com | 40 |
| Alex | brown | — | 4 |
| Denzel | Washington | — | 3 |

## Operations Covered

| # | Operation | Description |
|---|-----------|-------------|
| 1 | `find()` | Display all contacts |
| 2 | `findOne({ _id })` | Display one contact by ID |
| 3 | `find({ age: { $gt: 18 } })` | Contacts older than 18 |
| 4 | `find({ age: { $gt: 18 }, $or: [/ah/i] })` | Age > 18 AND name contains "ah" |
| 5 | `updateOne()` | Rename Kefi Seif → Kefi Anis |
| 6 | `deleteMany({ age: { $lt: 5 } })` | Remove contacts under age 5 |
| 7 | `find()` | Display final contact list |

## Screenshots

All operation outputs are saved in the [`screenshots/`](screenshots/) folder.

| File | Operation |
|------|-----------|
| [01_setup_insert.png](screenshots/01_setup_insert.png) | Insert 5 documents |
| [02_query1_all_contacts.png](screenshots/02_query1_all_contacts.png) | All contacts |
| [03_query2_by_id.png](screenshots/03_query2_by_id.png) | Find by ID |
| [04_query3_age_gt18.png](screenshots/04_query3_age_gt18.png) | Age > 18 |
| [05_query4_age_gt18_name_ah.png](screenshots/05_query4_age_gt18_name_ah.png) | Age > 18 & name contains "ah" |
| [06_update_kefi.png](screenshots/06_update_kefi.png) | Update first name |
| [07_delete_age_lt5.png](screenshots/07_delete_age_lt5.png) | Delete by age |
| [08_query7_final_list.png](screenshots/08_query7_final_list.png) | Final contact list |
| [mongodb_crud_all.png](screenshots/mongodb_crud_all.png) | Full-page composite |

## How to Run

**Prerequisites:** MongoDB running locally, `mongosh` installed.

```bash
mongosh --quiet checkpoint.js
```

The script is idempotent — it drops and recreates the collection on each run.
