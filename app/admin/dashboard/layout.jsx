import Sidebar from "../../../components/Shared/Sidebar";
import Navbar from "../../../components/Shared/Navbar";
import Footer from "../../../components/Shared/Footer";


const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1 p-5 min-h-screen bg-[#182237]">
        <Sidebar />
      </div>
      <div className="p-5 flex-[4]">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
