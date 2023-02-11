import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient<any>({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  res.status(200).json(user);
};
