// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated:boolean
}

type Msg = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log('Revalidatong notes page...')
  if (req.query.serect !== process.env.REVALIDATE_SELECT) {
    return res.status(401).json({message: "Upitr secret is invalid"})
  }
  let revalidated = false
  try {
    await res.unstable_revalidate('/notes')
  } catch (err) {
    console.log(err)
  }

  res.json({
    revalidated
  })
}