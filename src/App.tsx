import { useEffect, useState } from "react";
import styled from "styled-components";
import { GitHubUser } from "./types";

function App() {
  const [user, setUsername] = useState<GitHubUser>();
  const [userInput, setUserInput] = useState<string>("octocat");
  const [day, setDay] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async function () {
    try {
      const res = await fetch(`https://api.github.com/users/${userInput}`);
      const data = await res.json();
      setUsername(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const formattedDate = user?.created_at
    ? user.created_at.split("T")[0]
    : "N/A";

  return (
    <Container>
      <div className="header">
        <h1>devfinder</h1>
        <div className="mode">
          <h2>{day ? "DARK" : "LIGHT"}</h2>
          <button className="daymode" onClick={() => setDay(!day)}>
            <i className="fa-solid fa-sun"></i>
          </button>
        </div>
      </div>
      <InputContainer day={day}>
        <div className="inputDiv">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Search Github Username.."
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        <div>
          <button onClick={getUser}>Search</button>
        </div>
      </InputContainer>
      {user?.message && <p className="error">not Found</p>}
      <MainContent day={day}>
        <div className="content1">
          <div>
            {user?.avatar_url ? (
              <img src={user?.avatar_url} alt="User Avatar" />
            ) : (
              <span>Not a photo</span>
            )}
          </div>
          <div className="card1">
            <h1 className="username">{user?.name}</h1>
            <h2 className="login">{user?.login}</h2>
            <h2 className="bio">
              {user?.bio ? user.bio : "This profile has no bio"}
            </h2>
          </div>
          <h1 className="date">Joined {formattedDate}</h1>
        </div>
        <Content2>
          <div>
            <h3>Repos</h3>
            <h3>{user?.public_repos ? user.public_repos : "0"}</h3>
          </div>
          <div>
            <h3>Followers</h3>
            <h3>{user?.followers ? user.followers : "0"}</h3>
          </div>
          <div>
            <h3>Following</h3>
            <h3>{user?.following ? user.following : "0"}</h3>
          </div>
        </Content2>
        <Content3 day={day}>
          <div className="box1">
            <div>
              <i className="fa-solid fa-location-dot"></i>
              <span className="location">
                {user?.location ? user.location : "Not Available"}
              </span>
            </div>
            <div>
              <i className="fa-solid fa-link"></i>
              <span>{user?.blog ? user.blog : "Not Available "}</span>
            </div>
          </div>
          <div className="box2">
            <div>
              <i className="fa-brands fa-twitter"></i>
              <span>
                {user?.twitter_username
                  ? user.twitter_username
                  : "Not Available"}
              </span>
            </div>
            <div>
              <i className="fa-solid fa-building"></i>
              <span>{user?.company ? user.company : "Not Available"}</span>
            </div>
          </div>
        </Content3>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  .fa-solid {
    font-size: 20px;
  }
  width: 600px;
  .error {
    color: red;
    text-align: center;
    font-size: 20px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 10px;
    margin-bottom: 40px;
  }
  .mode {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .daymode {
    background-color: transparent;
  }
`;

const InputContainer = styled.div<{ day: boolean }>`
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px 5px 20px;
  background-color: ${(props) => (props.day ? "white" : "#1e2a47")};

  .fa-solid {
    font-size: 22px;
  }
  input {
    font-size: 15px;
    padding: 7px 200px 7px 5px;
    background-color: transparent;
    border: none;
  }
  input::placeholder {
  }
  button {
    background-color: blue;
    color: white;
  }

  .inputDiv {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const MainContent = styled.main<{ day: boolean }>`
  border-radius: 9px;
  padding-inline: 40px;
  padding-top: 40px;
  margin-top: 20px;
  padding-bottom: 30px;
  background-color: ${(props) => (props.day ? "white" : "#1e2a47")};
  color: ${(props) => (!props.day ? "white" : "#1e2a47")};
  img {
    width: 90px;
    border-radius: 50%;
  }
  .content1 {
    display: flex;
    justify-content: space-between;
  }
  .username {
    font-size: 25px;
  }
  .login {
    font-size: 15px;
    color: blue;
  }
  .bio {
    font-size: 18px;
    color: #b5b5b5;
  }
  .date {
    font-size: 17px;
    color: #b0b0b0;
    margin-top: 5px;
  }
  .card1 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 20px;
  }
`;

const Content2 = styled.div`
  background-color: #141d2f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-radius: 10px;
  padding: 8px 30px 8px 24px;
  margin-left: 123px;
  margin-top: 30px;

  div {
    text-align: center;
  }
`;

const Content3 = styled.div<{ day: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-left: 123px;
  margin-top: 30px;
  .box1,
  .box2 {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  span {
    margin-left: 10px;
  }
  .location {
    position: relative;
    left: 10px;
  }
`;

export default App;
