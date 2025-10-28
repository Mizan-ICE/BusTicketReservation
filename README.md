# Bus Ticket Reservation — Setup Guide

A .NET 9 Web API + Angular application for searching buses, visual seat selection, and ticket booking.

## Prerequisites

- .NET SDK 9.0+
- Visual Studio 2022 (latest) with:
  - __ASP.NET and web development__ workload
- Node.js 18+ and npm 9+ (for Angular frontend)
- PostgreSQL 13+ (local install or Docker)

Optional:
- EF Core CLI: `dotnet tool install -g dotnet-ef`

## Solution Structure

- Backend API: `BusTicketReservation.WebApi`
- Data + EF Core + Repositories: `BusTicketReservation.Infrastructure`
- Domain + Entities: `BusTicketReservation.Domain`
- Application Services + Contracts: `BusTicketReservation.Application*`
- Tests: `BusTicketReservation.Tests`
- Angular Frontend: `Frontend/bus-ticket-reservation`

## 1) Database Setup (PostgreSQL)

Option A — Local PostgreSQL:
- Create a database
- Have a user with required privileges

Notes:
- The API reads `ConnectionStrings:DefaultConnection`.
- In production, prefer environment variables or user secrets.

## 2) Apply Migrations and Seed Data

Migrations are in `BusTicketReservation.Infrastructure`. The API applies migrations and seeds automatically at startup.

Manual (optional):
- Update `appsettings.json` with your database connection string
- Run `dotnet ef database update` in `BusTicketReservation.Infrastructure`

## 3) Running the Application

- Backend API:
  - Debug: `F5` in `BusTicketReservation.WebApi`
  - CLI: `dotnet run` in `BusTicketReservation.WebApi`
- Angular Frontend:
  - `npm start` in `Frontend/bus-ticket-reservation`

## 4) Testing

- Unit and Integration Tests: `dotnet test` in solution directory
- End-to-end tests: `npm run e2e` in `Frontend/bus-ticket-reservation`

## Environment Variables

**Development (`src/environments/environment.ts`):**
```typescript
export const environment = {
  production: false,
  apiBaseUrl: '/api'
};
```

**Production (`src/environments/environment.prod.ts`):**
```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://your-api-domain.com/api'
};
```

### Proxy Configuration

All `/api/*` requests are proxied to the backend server:

```json
{
  "/api": {
    "target": "https://localhost:44397",
    "secure": false,
    "changeOrigin": true
  }
}
