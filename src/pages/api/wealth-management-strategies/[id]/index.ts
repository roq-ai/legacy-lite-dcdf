import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { wealthManagementStrategyValidationSchema } from 'validationSchema/wealth-management-strategies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.wealth_management_strategy
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getWealthManagementStrategyById();
    case 'PUT':
      return updateWealthManagementStrategyById();
    case 'DELETE':
      return deleteWealthManagementStrategyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWealthManagementStrategyById() {
    const data = await prisma.wealth_management_strategy.findFirst(
      convertQueryToPrismaUtil(req.query, 'wealth_management_strategy'),
    );
    return res.status(200).json(data);
  }

  async function updateWealthManagementStrategyById() {
    await wealthManagementStrategyValidationSchema.validate(req.body);
    const data = await prisma.wealth_management_strategy.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteWealthManagementStrategyById() {
    const data = await prisma.wealth_management_strategy.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
