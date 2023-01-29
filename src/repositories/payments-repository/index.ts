import { prisma } from "@/config";
import { cardData, paymentData } from "@/protocols";
import { TicketStatus } from "@prisma/client";

async function getTicketById(id: number) {
    return prisma.ticket.findFirst({
        where: {
            id: id
        }
    });
}

async function findPayment(ticketId: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId
        }
    });
}

async function createPayment(paymentData: paymentData) {
    return prisma.payment.create({
        data: paymentData
    })
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


const paymentsRepository = {
    getTicketById,
    findPayment,
    createPayment,
    updateTicketPayment
};

export default paymentsRepository;