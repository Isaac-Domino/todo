import { Todo, getXataClient } from "@/lib/xata";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = getXataClient();
  const body: {
    target_email: string;
  } = JSON.parse(req.body);
  try {
    const todos = await client.db.todo
      .filter("email", body.target_email)
      .getAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ messsage: "Todo failed to fetch" });
  }

  return res.json({
    message: "Hello World",
  });
};

export default handler;
