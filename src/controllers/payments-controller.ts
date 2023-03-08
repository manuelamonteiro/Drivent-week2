import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) {

    const ticketId = req.query.ticketId;
    const userId = req.userId;

    try {
        if (!ticketId) res.sendStatus(httpStatus.BAD_REQUEST);

        const payment = await paymentsService.getPaymentByIdService(Number(ticketId), userId);

        return res.status(httpStatus.OK).send(payment);
    } catch (error) {
        if (error.name === "BadRequest") {
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        }

        if (error.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(httpStatus.NOT_FOUND);
        }

        if (error.name === "UnauthorizedError") {
            return res.status(httpStatus.UNAUTHORIZED).send(error.message);
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }

}

export async function postPayment(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;
    const { ticketId, cardData } = req.body;

    try {
        if (!ticketId) res.sendStatus(httpStatus.BAD_REQUEST);
        if (!cardData) res.sendStatus(httpStatus.BAD_REQUEST);

        const payment = await paymentsService.postPaymentService(ticketId, userId, cardData);

        return res.status(httpStatus.OK).send(payment);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(httpStatus.NOT_FOUND);
        }

        if (error.name === "UnauthorizedError") {
            return res.status(httpStatus.UNAUTHORIZED).send(error.message);
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }

}