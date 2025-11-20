import React from "react";
import NavButton from "../common/NavButton";
import VendorDashboard from "../vendor/VendorDashboard";
import VendorContainers from "../vendor/VendorContainers";
import AddContainer from "../vendor/AddContainer";
import PendingReturns from "../vendor/PendingReturns";
import { TrendingUp, Package, Plus, Clock } from "lucide-react";

export default function VendorApp({
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
            icon={TrendingUp}
            label="Dashboard"
            active={currentPage === "vendor-dashboard"}
            onClick={() => setCurrentPage("vendor-dashboard")}
          />
          <NavButton
            icon={Package}
            label="Containers"
            active={currentPage === "vendor-containers"}
            onClick={() => setCurrentPage("vendor-containers")}
          />
          <NavButton
            icon={Plus}
            label="Add Container"
            active={currentPage === "add-container"}
            onClick={() => setCurrentPage("add-container")}
          />
          <NavButton
            icon={Clock}
            label="Pending Returns"
            active={currentPage === "pending-returns"}
            onClick={() => setCurrentPage("pending-returns")}
          />
        </div>
      </nav>

      {currentPage === "vendor-dashboard" && <VendorDashboard />}
      {currentPage === "vendor-containers" && (
        <VendorContainers showMessage={showMessage} />
      )}
      {currentPage === "add-container" && (
        <AddContainer
          showMessage={showMessage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "pending-returns" && (
        <PendingReturns showMessage={showMessage} />
      )}
    </div>
  );
}
