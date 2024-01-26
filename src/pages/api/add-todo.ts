import { Todo, getXataClient } from "@/lib/xata";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = getXataClient();
  const body: Todo = JSON.parse(req.body);

  try {
    await client.db.todo.create(body);
    res.status(200).json({ message: "Todo Created" });
  } catch (error) {
    res.status(500).json({ messsage: "Todo failed to create" });
  }
};

export default handler;
