// src/components/BottomNav.jsx
import React from "react";
import { Home, Truck, ShoppingCart } from "lucide-react";

const navItems = [
  { label: "Каталог", icon: <Home size={24} />, path: "/catalog" },
  { label: "В дорозі", icon: <Truck size={24} />, path: "/in-transit" },
  { label: "Замовити", icon: <ShoppingCart size={24} />, path: "/order" },
];

export default function BottomNav({ current, onNavigate }) {
  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: 64,
      background: "rgba(30,30,40,0.92)",
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      boxShadow: "0 -2px 24px 0 rgba(0,0,0,0.3)",
      backdropFilter: "blur(8px)"
    }}>
      {navItems.map((item) => (
        <div
          key={item.label}
          onClick={() => onNavigate(item.path)}
          style={{
            color: current === item.path ? "#b286fd" : "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          {item.icon}
          <span style={{ marginTop: 2 }}>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}
