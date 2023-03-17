import { useRouteLoaderData } from "react-router-dom";

import PageContent from "../components/Layouts/PageContent/PageContent";
import useUser from "../hooks/useUser";

const ProfilePage = (props) => {
  const user = useUser();
  const laoder = useRouteLoaderData("user-details");

  return (
    <>
      {!laoder ? (
        <PageContent title="Your Profile">
          <div>
            <div>
              <img src={user.avatar} alt="profile" />
            </div>
            <div>
              <h2>{`${user.firstName} ${user.lastName}`}</h2>
              <p>Followers: {user.followers}</p>
              <p>Following: {user.following}</p>
            </div>
          </div>
        </PageContent>
      ) : (
        <PageContent title="User Profile">
          <div>
            <div>
              <img src={laoder.user.avatar} alt="profile" />
            </div>
            <div>
              <h2>{`${laoder.user.firstName} ${laoder.user.lastName}`}</h2>
              <p>Followers: {laoder.user.followers}</p>
              <p>Following: {laoder.user.following}</p>
            </div>
          </div>
        </PageContent>
      )}
    </>
  );
};

export default ProfilePage;
