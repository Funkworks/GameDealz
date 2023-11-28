import "./globals.css";
import SideNav from './components/SideNav'; 


//  export const metadata = {
//    title: "Game Hunt",
//    description: "hunt the game find the deal",
//  };

const Layout = ({ children }) => {
  return (
    <div>
      <SideNav />
      <div>{children}</div>
      {/* You can add a footer or other common elements here */}
    </div>
  );
};

export default Layout;