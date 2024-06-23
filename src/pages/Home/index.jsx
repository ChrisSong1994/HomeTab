import React from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import Setting from "./components/Setting";
import Layout from "./components/Layout";
import ShortcutkLinks from "./components/ShortcutkLinks";

function Home() {
  return (
    <Layout>
      <Header />
      <Search />
      <ShortcutkLinks />
      <Setting />
    </Layout>
  );
}

export default Home;
