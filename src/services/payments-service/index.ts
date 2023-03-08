import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import { cardData, paymentData } from "@/protocols";

async function getPaymentByIdService(ticketId: number, userId: number) {

    if (!ticketId) throw { type: "BadRequest", message: "Invalid body!" };

    const ticket = await ticketsRepository.getTicketById(ticketId);
    if (!ticket) throw notFoundError();

    const enrollmentUser = await enrollmentRepository.findEnrollmentByUserId(userId);
    if (enrollmentUser.id !== ticket.enrollmentId) throw unauthorizedError();

    const payment = await paymentsRepository.findPayment(ticketId);

    return payment;
}

async function postPaymentService(ticketId: number, userId: number, cardData: cardData) {

    const ticket = await ticketsRepository.getTicketById(ticketId);
    if (!ticket) throw notFoundError();

    const enrollmentUser = await enrollmentRepository.findEnrollmentByUserId(userId);
    if (enrollmentUser.id !== ticket.enrollmentId) throw unauthorizedError();

    const ticketUpdate = await ticketsRepository.updateTicketPayment(ticketId);

    const paymentData: paymentData = {
        ticketId,
        value: ticketUpdate.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4)
    };

    const payment = await paymentsRepository.createPayment(paymentData);

    return payment;
}





const paymentsService = {
    getPaymentByIdService,
    postPaymentService
};

export default paymentsService;