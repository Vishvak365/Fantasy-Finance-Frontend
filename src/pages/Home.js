import React from "react";
import "firebase/auth";
import LeaguesManage from "./home/LeaguesManage";
import Box from "@mui/material/Box";
import LeagueHistory from "./home/LeagueHistory";
export default function Home() {
  return (
    <div>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 2fr)",
            p: 5,
            gap: 4,
          }}
        >
          <LeagueHistory />
          <LeaguesManage />
        </Box>
      </div>
    </div>
  );
}
