import "./globals.css";
import FunkworksFooter from "./components/FunkworksFooter";
import Header from "./components/Header";

//  export const metadata = {
//    title: "Game Hunt",
//    description: "hunt the game find the deal",
//  };

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <div>
          <Header />
          {children}
          <FunkworksFooter />
        </div>
      </body>
    </html>
  );
};

export default Layout;