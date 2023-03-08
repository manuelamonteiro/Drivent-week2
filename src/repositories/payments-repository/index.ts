import { prisma } from "@/config";
import { paymentData } from "@/protocols";

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


const paymentsRepository = {
    getTicketById,
    findPayment,
    createPayment
};

export default paymentsRepository;