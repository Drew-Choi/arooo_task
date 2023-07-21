// 파람스 아이디와 일치하는 아티클 정보 불러오기

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getArticleDetail = async (id: any) => {
  try {
    const response = await prisma.articles.findUnique({
      where: {
        id: Number(id),
      },
    });

    // 데이터 잘 들어오면 아래 작업 시작
    if (response) {
      console.log(response);
      return response;
    } else {
      console.log('데이터없음');
    }
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};
