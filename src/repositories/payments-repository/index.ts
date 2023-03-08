import { prisma } from "@/config";
import { paymentData } from "@/protocols";

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
    findPayment,
    createPayment
};

export default paymentsRepository;