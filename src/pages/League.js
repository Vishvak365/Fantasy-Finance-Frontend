import React from "react";
import { useParams } from "react-router-dom";

function League() {
  const { leagueID } = useParams();
  return <div>League page - League ID = {leagueID}</div>;
}
export default League;
