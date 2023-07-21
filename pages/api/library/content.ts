import { PrismaClient } from '@prisma/client';
import { EditorState, convertFromRaw } from 'draft-js';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const getArticleAll = async (skip: number, take: number) => {
  try {
    const response = await prisma.articles.findMany({
      skip: skip,
      take: take,
    });
    return response;
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};

type Data = {
  items?: any;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { skip, take } = req.query;
  if (!skip || !take) {
    res.status(400).json({ message: 'No Request Information' });
    return;
  }
  try {
    const response = await getArticleAll(Number(skip), Number(take));
    console.log(response);

    // fliter로 필요한 것만

    res.status(200).json({
      items: response,
      message: `success skip: ${skip}~ take ${take}`,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
