import { Header } from "../../components/Header/Header";
import { JoinButton } from "../../components/JoinButton/JoinButton";
import { Search } from "../../components/Search/Search";
import { Featured } from "../../components/Featured/Featured";
import { WhyUs } from "../../components/WhyUs/WhyUs";
import "./home.scss";
import { JoinUs } from "../../components/JoinUs/JoinUs";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="home">
      <Header />
      <Search />
      <JoinButton />
      <WhyUs />
      <Featured />
      <JoinUs />
    </div>
  );
};

export default Home;
