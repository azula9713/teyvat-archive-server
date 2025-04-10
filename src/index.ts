import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

import {
  artifactRoutes,
  characterRoutes,
  eventRoutes,
  materialRoutes,
  systemRoutes,
  weaponRoutes,
  calendarRoutes,
  codeRoutes,
  abyssRoutes,
  characterBuildRoutes
} from "./routes";
import {
  fetchAbyssBlessingInfo,
  fetchAbyssInfo,
  fetchAmberEvents,
  fetchHoyoCalendar,
  fetchHoyoGameRequest,
  fetchHoyoPlayRequest,
  fetchRedeemCodes
} from "./services/system.service";
import dbClient from "./db/dbClient";

const PORT = process.env.PORT ?? 5000;

const routes = [
  characterRoutes,
  materialRoutes,
  weaponRoutes,
  eventRoutes,
  artifactRoutes,
  systemRoutes,
  calendarRoutes,
  codeRoutes,
  abyssRoutes,
  characterBuildRoutes
];

const app = new Elysia();

app.use(
  cors({
    allowedHeaders: ["Content-Type"]
  })
);

app.use(
  swagger({
    documentation: {
      info: {
        title: "Teyvat Archive API",
        version: "1.0.0",
        description: "API for Genshin Impact data"
      },
      tags: [
        {
          name: "Characters",
          description: "Character endpoints"
        },
        {
          name: "Materials",
          description: "Material endpoints"
        },
        {
          name: "Weapons",
          description: "Weapon endpoints"
        },
        {
          name: "Events",
          description: "Event endpoints"
        },
        {
          name: "Calendar",
          description: "Calendar endpoints"
        },
        {
          name: "Artifacts",
          description: "Artifact endpoints"
        },
        {
          name: "Codes",
          description: "Redeem code endpoints"
        },
        {
          name: "System",
          description: "System endpoints"
        }
      ]
    },
    path: "/docs"
  })
);

routes.forEach(async (route) => {
  await route(app);
});

await Promise.all([
  fetchHoyoPlayRequest(),
  fetchHoyoGameRequest(),
  fetchHoyoCalendar(),
  fetchAmberEvents(),
  fetchRedeemCodes(),
  fetchAbyssInfo(),
  fetchAbyssBlessingInfo(),
  dbClient().catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  })
]);

app.listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
