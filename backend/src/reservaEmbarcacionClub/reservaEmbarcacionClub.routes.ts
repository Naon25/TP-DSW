import { Router} from "express";
import {
  sanitizeReservaEmbarcacionClubInput,
  findAll, findOne, update, remove, add,
  getReservasPorSocio,
  getReservasPorEmbarcacion,
  cancel,
  finalizar
} from "./reservaEmbarcacionClub.controller.js";

export const reservaEmbarcacionClubRouter = Router();

reservaEmbarcacionClubRouter.get("/", findAll);
reservaEmbarcacionClubRouter.get("/socio/:idSocio", getReservasPorSocio);
reservaEmbarcacionClubRouter.get("/embarcacion/:idEmbarcacion", getReservasPorEmbarcacion);
reservaEmbarcacionClubRouter.post("/:id/cancelar", cancel);
reservaEmbarcacionClubRouter.post("/:id/finalizar", finalizar);
reservaEmbarcacionClubRouter.get("/:id", findOne);
reservaEmbarcacionClubRouter.post("/", sanitizeReservaEmbarcacionClubInput, add);
reservaEmbarcacionClubRouter.put("/:id", sanitizeReservaEmbarcacionClubInput, update);
reservaEmbarcacionClubRouter.delete("/:id", remove);

