# NameSpark Backend API

A RESTful API backend for searching, filtering, and managing baby names.

---

## Prerequisites

- **Node.js** LTS (v20+)
- **npm**

---

## Getting Started

```bash
cd backend
npm install
npm run start:dev
```

The server runs at: `http://localhost:3000`

Verify it's working: `http://localhost:3000/v1/health`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/health` | Health check |
| `POST` | `/v1/name-spark/search` | Search and filter names |
| `GET` | `/v1/names/:id` | Get name detail |
| `PATCH` | `/v1/names/:id/favorite` | Toggle favorite |

---

## Usage Examples

### Search / Filter Names

**`POST /v1/name-spark/search`**

```json
{
  "gender": "Girl",
  "origins": ["Arabic"],
  "startingLetter": "A"
}
```

### Get Name Detail

**`GET /v1/names/:id`**

Replace `:id` with the name's ID.

### Toggle Favorite

**`PATCH /v1/names/:id/favorite`**

Replace `:id` with the name's ID. Toggles the favorite status of the name.

---

## Project Structure

```
backend/
├── src/
│   └── ...         # Source files
├── package.json
└── ...
```
