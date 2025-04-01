import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "テストデータ表示" },
    { name: "description", content: "Prismaで投入したテストデータを表示" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const records = await prisma.records.findMany({
    orderBy: { time: 'asc' }
  });
  return json({ records });
}

// recordsの型を定義
type Record = {
  id: string;
  title: string;
  time: number;
  created_at: Date;
};

export default function Index() {
  const { records } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-3xl font-bold">テストデータ一覧</h1>
        <div className="w-full max-w-2xl">
          <table className="text-black min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden w-[40vw]">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left border-b">ID</th>
                <th className="py-3 px-4 text-left border-b">タイトル</th>
                <th className="py-3 px-4 text-left border-b">時間</th>
                <th className="py-3 px-4 text-left border-b">作成日時</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record: Record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b truncate max-w-[100px]">{record.id}</td>
                  <td className="py-2 px-4 border-b">{record.title}</td>
                  <td className="py-2 px-4 border-b">{record.time}</td>
                  <td className="py-2 px-4 border-b">{new Date(record.created_at).toLocaleString('ja-JP')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}