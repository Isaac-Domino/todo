import { Todo, getXataClient } from "@/lib/xata";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = getXataClient();
  const body: {
    id: string;
    todo: Todo;
  } = JSON.parse(req.body);

  try {
    await client.db.todo.update(body.id, body.todo);
    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    res.status(500).json({ messsage: "Todo failed to update" });
  }
};

export default handler;
