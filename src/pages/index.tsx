import { NavBar } from "../components/NavBar";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClients";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery()
  return (
    <>
      <NavBar />
      <div> Hello Worlds</div>
      <br></br>
      {!data ? null : data.posts.map(p => <div key={p.id}>{p.title}</div>)}
    </>
  )
}
export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
