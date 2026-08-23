import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
    <div className='text-white bg-primary flex items-center justify-center flex-col'>
      <h2>404</h2>
      <p>Page not found.</p>
    </div>
      <Link to={'/movies'} className='text-white underline mt-4 flex items-center justify-center'>
        Home
      </Link>
    </>
  )
}
export default ErrorPage