import { prisma } from "@/config";
import { Enrollment, TicketType, Ticket, TicketStatus } from "@prisma/client";

async function findManyTicketsTypes() {
    return prisma.ticketType.findMany();
}

async function getTicketByUserId(userId: number) {
    return prisma.ticket.findFirst({
        where: {
            Enrollment: {
                userId
            }
        },
        include: {
            TicketType: true
        }
    });
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
    return prisma.ticket.create({
        data: {
            ticketTypeId,
            enrollmentId,
            status: TicketStatus.RESERVED
        },
        include: {
            TicketType: true
        }
    });
}

async function getTicketById(id: number) {
    return prisma.ticket.findFirst({
        where: {
            id: id
        }
    });
}

async function updateTicketPayment(ticketId: number) {
    return prisma.ticket.update({
        where: {
            id: ticketId,
        },
        data: {
            status: TicketStatus.PAID,
        },
        include: {
            TicketType: true
        },
    });
}

const ticketsRepository = {
    findManyTicketsTypes,
    getTicketByUserId,
    createTicket,
    getTicketById,
    updateTicketPayment
};

export default ticketsRepository;