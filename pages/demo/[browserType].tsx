import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";




const Demo: NextPage = () => {
  const router = useRouter()

  const browserType = router.query.browserType
  return (
    <Layout title="Middleware">
      <p>{ `Hello ${browserType} User`}</p>
    </Layout>
  )
}
export default Demo