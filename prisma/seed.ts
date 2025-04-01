import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 既存のレコードをクリア
  await prisma.records.deleteMany({});

  // テストデータの投入
  const records = [
    { title: 'test1', time: 10 },
    { title: 'test2', time: 20 },
    { title: 'test3', time: 30 },
    { title: 'test4', time: 40 },
    { title: 'test5', time: 50 },
  ];

  for (const record of records) {
    await prisma.records.create({
      data: record,
    });
  }

  console.log('シードデータが正常に投入されました');
}

main()
  .catch((e) => {
    console.error('シード処理中にエラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
