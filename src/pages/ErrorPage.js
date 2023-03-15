import PageContent from "../components/Layouts/PageContent/PageContent";
import MainHeader from "../components/MainHeader/MainHeader";
import useUser from "../hooks/useUser";

function ErrorPage() {
  const user = useUser();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  //   if (error.status === 500) {
  //     message = error.data.message;
  //   }

  //   if (error.status === 404) {
  //     title = 'Not found!';
  //     message = 'Could not find resource or page.';
  //   }

  return (
    <>
      {user && <MainHeader />}
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
