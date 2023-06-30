import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { organizationValidationSchema } from 'validationSchema/organizations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOrganizations();
    case 'POST':
      return createOrganization();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganizations() {
    const data = await prisma.organization
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'organization'));
    return res.status(200).json(data);
  }

  async function createOrganization() {
    await organizationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.asset?.length > 0) {
      const create_asset = body.asset;
      body.asset = {
        create: create_asset,
      };
    } else {
      delete body.asset;
    }
    if (body?.financial_data?.length > 0) {
      const create_financial_data = body.financial_data;
      body.financial_data = {
        create: create_financial_data,
      };
    } else {
      delete body.financial_data;
    }
    if (body?.wealth_management_strategy?.length > 0) {
      const create_wealth_management_strategy = body.wealth_management_strategy;
      body.wealth_management_strategy = {
        create: create_wealth_management_strategy,
      };
    } else {
      delete body.wealth_management_strategy;
    }
    const data = await prisma.organization.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
