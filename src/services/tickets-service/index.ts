import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";

export async function getTicketsTypeService() {

    const ticketsType = await ticketsRepository.findManyTicketsTypes();

    if(ticketsType){
        return ticketsType;
    } else {
        return [];
    }

}

export async function getTicketsByUserService(userId: number) {

    const ticketByUser = await ticketsRepository.getTicketByUserId(userId);

    const enrollmentUser = await enrollmentRepository.findEnrollmentByUserId(userId);

    if (!ticketByUser || !enrollmentUser) throw notFoundError();

    return ticketByUser;

}

export async function postTicketsTypeService(ticketTypeId: number, userId: number) {

    if(!ticketTypeId) throw {type: "BadRequest", message: "Invalid body!"};

    const enrollmentId = await enrollmentRepository.findEnrollmentByUserId(userId);

    if (!enrollmentId) throw notFoundError();

    const ticket = await ticketsRepository.createTicket(ticketTypeId, enrollmentId.id);

    return ticket;

}

const ticketsService = {
    getTicketsTypeService,
    getTicketsByUserService,
    postTicketsTypeService
};

export default ticketsService;