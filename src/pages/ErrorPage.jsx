import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
    <div className='text-white bg-primary flex-c-c flex-col'>
      <h2>404</h2>
      <p>Page not found.</p>
    </div>
      <Link to={'/'} className='text-white underline mt-4 flex-c-c'>
        Home
      </Link>
    </>
  )
}
export default ErrorPage