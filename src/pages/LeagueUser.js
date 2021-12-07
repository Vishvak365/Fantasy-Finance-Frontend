import { useParams } from "react-router";
import React from "react";
import client from "../util/Client";

export default function LeagueUser() {
  const { leagueID, uid } = useParams();
  const HeaderStyle = {
    borderRadius: "25px",
    padding: 1,
    width: 500,
    margin: "auto",
    backgroundColor: "#5866d3",
    color: "white",
    marginBottom: "10px",
  };
  const [user, setUser] = React.useState("User's");
  const [totalStockPortfolio, setTotalStockPortfolio] = React.useState([]);
  React.useEffect(() => {
    async function getLeagueUserInfo() {
      const leagueUser = await client.get(
        "/leagues/userLeagueInfo?leagueId=" + leagueID + "&uid=" + uid
      );
      setUser(leagueUser.data.userName);
    }
    async function getUserPortfolio() {
      const portfolio = await client.get(
        `/leagues/portfolioValue/total?leagueId=${leagueID}&uid=${uid}`
      );
      setTotalStockPortfolio(portfolio.data);
    }
    getUserPortfolio();
    getLeagueUserInfo();
  }, [leagueID, uid]);
  return (
    <div>
      <div style={HeaderStyle}>
        {/* <h1>{leagueData.name}</h1> */}
        <h3>{user}'s League Portfolio</h3>
      </div>
      <div style={{ width: "60%", margin: "auto" }}>
        {totalStockPortfolio.map((stockPortfolio) => (
          <div
            style={{
              // maxHeight: "1vh",
              // overflow: "auto",
              backgroundColor:
                stockPortfolio.profit < 0 ? "#ffa7a7" : "#e0ffcd",
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <h3>{stockPortfolio.stock}</h3>
            Quantity : <b>{stockPortfolio.quantity}</b>
            <br />
            Total Value:{" "}
            <b>
              $
              {stockPortfolio.totalValue.toString().includes(".")
                ? stockPortfolio.totalValue.toFixed(2)
                : stockPortfolio.totalValue}
            </b>
            <br />
            Average Price:{" "}
            <b>
              $
              {stockPortfolio.averagePrice.toString().includes(".")
                ? stockPortfolio.averagePrice.toFixed(2)
                : stockPortfolio.averagePrice}
            </b>
            <br />
            <div>
              <h4>
                Profit:{" "}
                <b>
                  $
                  {stockPortfolio.profit.toString().includes(".")
                    ? stockPortfolio.profit.toFixed(2)
                    : stockPortfolio.profit}
                </b>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
