import "./globals.css";
import SideNav from './components/SideNav'; 


//  export const metadata = {
//    title: "Game Hunt",
//    description: "hunt the game find the deal",
//  };

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <div>
          <SideNav />
          {children}
          {/* You can add a footer or other common elements here */}
        </div>
      </body>
    </html>
  );
};

export default Layout;