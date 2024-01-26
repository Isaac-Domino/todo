import { Todo, getXataClient } from "@/lib/xata";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = getXataClient();
  const body: {
    id: string;
  } = JSON.parse(req.body);

  try {
    await client.db.todo.delete(body.id);
    res.status(200).json({ message: "Todo Removed" });
  } catch (error) {
    res.status(500).json({ messsage: "Todo failed to Removed" });
  }

  return res.json({
    message: "Hello World",
  });
};

export default handler;
