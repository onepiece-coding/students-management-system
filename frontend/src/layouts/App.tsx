import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { Footer, Header } from "@/components/shared";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
