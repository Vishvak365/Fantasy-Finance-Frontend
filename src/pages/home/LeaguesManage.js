import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import history from "../../history";
import { Modal } from "@mui/material";
import CreateLeagueModal from "./CreateLeagueModal";
import JoinLeagueModal from "./JoinLeagueModal";
import client from "../../util/Client";

function LeagueInfo(props) {
  return (
    <div
      onClick={() => {
        history.push(`/league/${props.league.leagueID}`);
      }}
      style={{
        background: "lightblue",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        cursor: "pointer",
      }}
    >
      {props.league.leagueName}
    </div>
  );
}
export default function LeaguesManage(props) {
  const handleJoinLeagueOpen = () => setJoinLeague(true);
  const handleJoinLeagueClose = () => setJoinLeague(false);
  const [joinLeague, setJoinLeague] = React.useState(false);

  const handleCreateLeagueOpen = () => setCreateLeague(true);
  const handleCreateLeagueClose = () => setCreateLeague(false);
  const [createLeague, setCreateLeague] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [leagues, setLeagues] = React.useState([]);
  //Call backend to get leagues that a user is a part of and display them
  React.useEffect(() => {
    async function fetchUserLeagues() {
      const userLeagues = await client.get("/leagues/getUserLeagues");
      setLeagues(userLeagues.data);
    }
    fetchUserLeagues()
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err);
      });
  }, []);
  return (
    <Paper>
      <h3>Leagues</h3>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 3fr)",
          marginRight: 3,
          marginLeft: 3,
        }}
      >
        <Button
          variant="contained"
          style={{ marginRight: 10 }}
          onClick={handleJoinLeagueOpen}
        >
          Join
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={handleCreateLeagueOpen}
        >
          Create
        </Button>
        <Modal open={joinLeague} onClose={handleJoinLeagueClose}>
          <JoinLeagueModal />
        </Modal>
        <Modal open={createLeague} onClose={handleCreateLeagueClose}>
          <CreateLeagueModal />
        </Modal>
      </Box>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : leagues.length === 0 ? (
        <LeagueInfo
          league={{ leagueName: "You haven't joined any leagues yet" }}
        />
      ) : (
        leagues.map((data) => {
          return <LeagueInfo league={data} />;
        })
      )}
    </Paper>
  );
}
