import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const tabs = [
    {
      id: "home",
      label: "Home",
      content: "Welcome to the Home Page.",
    },
    {
      id: "profile",
      label: "Profile",
      content: "Welcome to the Profile Page.",
    },
    {
      id: "settings",
      label: "Settings",
      content: "Manage your application settings.",
    },
  ];
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <>
      <div className="container">
        <h1>Tabs</h1>
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? "active" : ""}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="content">
          <h2>{activeTabData.label}</h2>
          <p>{activeTabData.content}</p>
        </div>
      </div>
    </>
  );
}

export default App;
