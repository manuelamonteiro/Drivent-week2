import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsType, getTicketsByUser, postTicketsType } from "@/controllers/tickets-controller";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/types", getTicketsType)
    .get("/", getTicketsByUser)
    .post("/", validateBody(createTicketSchema), postTicketsType);

export { ticketsRouter };
