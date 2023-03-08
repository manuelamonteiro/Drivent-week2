import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {

    try {
        const ticketsTypes = await ticketsService.getTicketsTypeService();
        return res.status(httpStatus.OK).send(ticketsTypes);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }

}

export async function getTicketsByUser(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;

    try {
        const ticket = await ticketsService.getTicketsByUserService(userId);
        return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(httpStatus.NOT_FOUND);
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }

}

export async function postTicketsType(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;
    const { ticketTypeId } = req.body;

    try {
        const ticket = await ticketsService.postTicketsTypeService(Number(ticketTypeId), userId);
        return res.status(httpStatus.CREATED).send(ticket);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(httpStatus.NOT_FOUND);
        }

        if (error.name === "BadRequest") {
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }

}
