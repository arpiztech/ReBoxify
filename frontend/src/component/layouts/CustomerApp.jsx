import React from "react";
import NavButton from "../common/NavButton";
import BrowseContainers from "../customer/BrowseContainers";
import MyRentals from "../customer/MyRentals";
import WalletPage from "../customer/WalletPage";
import CO2Stats from "../customer/CO2Stats";
import { Package, History, Wallet, Leaf } from "lucide-react";

export default function CustomerApp({
  user,
  currentPage,
  setCurrentPage,
  showMessage,
}) {
  return (
    <div>
      <nav className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <NavButton
            icon={Package}
            label="Browse"
            active={currentPage === "customer-dashboard"}
            onClick={() => setCurrentPage("customer-dashboard")}
          />
          <NavButton
            icon={History}
            label="My Rentals"
            active={currentPage === "my-rentals"}
            onClick={() => setCurrentPage("my-rentals")}
          />
          <NavButton
            icon={Wallet}
            label="Wallet"
            active={currentPage === "wallet"}
            onClick={() => setCurrentPage("wallet")}
          />
          <NavButton
            icon={Leaf}
            label="CO₂ Stats"
            active={currentPage === "co2-stats"}
            onClick={() => setCurrentPage("co2-stats")}
          />
        </div>
      </nav>

      {currentPage === "customer-dashboard" && (
        <BrowseContainers
          showMessage={showMessage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "my-rentals" && <MyRentals showMessage={showMessage} />}
      {currentPage === "wallet" && <WalletPage showMessage={showMessage} />}
      {currentPage === "co2-stats" && <CO2Stats />}
    </div>
  );
}
