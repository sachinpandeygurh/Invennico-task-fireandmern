

// eslint-disable-next-line react/prop-types
const Profile = ({ handleLogin }) => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  const handleLogout = () => {
    localStorage.removeItem("user");
    handleLogin(false);
  };
  return (
    <>
      <div className="text-center" style={{ height: "100vh" }}>
        <div className="row">
          <h4>
            <span>Name : </span>
            {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </h4>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Profile;
